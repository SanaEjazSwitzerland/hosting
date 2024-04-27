import { getDatabase, ref, child, get, update, remove } from "firebase/database";
import { useEffect, useState } from "react";

let List = () => {
    let [list, setList] = useState({});
    let [editStatus, setEditStatus] = useState({}); // Tracks editing status for each item
    let [editFormData, setEditFormData] = useState({}); // Form data during edits

    const dbRef = ref(getDatabase());

    useEffect(() => {
        get(child(dbRef, `users/`)).then((snapshot) => {
            if (snapshot.exists()) {
                setList(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    let onEdit = (key) => {
        setEditStatus(prev => ({ ...prev, [key]: true }));
        setEditFormData(list[key].formData);
    };

    let onSave = (key) => {
        const updatedData = { formData: editFormData };
        update(ref(getDatabase(), `users/${key}`), updatedData)
            .then(() => {
                console.log("Item updated successfully");
                setList(prev => ({ ...prev, [key]: updatedData }));
                setEditStatus(prev => ({ ...prev, [key]: false }));
            })
            .catch(error => console.error("Error updating item: ", error));
    };

    let onCancel = (key) => {
        setEditStatus(prev => ({ ...prev, [key]: false }));
    };

    let onDelete = (key) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            remove(ref(getDatabase(), `users/${key}`))
                .then(() => {
                    console.log("Item deleted successfully");
                    setList(prev => {
                        const updatedList = { ...prev };
                        delete updatedList[key];
                        return updatedList;
                    });
                })
                .catch(error => console.error("Error deleting item: ", error));
        }
    };

    let handleEditChange = (key, event) => {
        const { name, value } = event.target;
        setEditFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <h1>List of Books</h1>
            <ul>
                {Object.keys(list).map((key, index) => (
                    <li key={index}>
                        {editStatus[key] ? (
                            <div>
                                <input
                                    type="text"
                                    name="booktitle"
                                    value={editFormData.booktitle}
                                    onChange={e => handleEditChange(key, e)}
                                />
                                <input
                                    type="text"
                                    name="bookprice"
                                    value={editFormData.bookprice}
                                    onChange={e => handleEditChange(key, e)}
                                />
                                <button onClick={() => onSave(key)}>Save</button>
                                <button onClick={() => onCancel(key)}>Cancel</button>
                            </div>
                        ) : (
                            <table>
                                {Object.keys(list).map((key, index) => (
                                    <tr>
                                        <td>{list[key].formData.booktitle}</td>
                                        <td>{list[key].formData.bookprice}</td>
                                        <td>
                                            <button onClick={() => onEdit(key, list[key])}>Edit</button>
                                            <button onClick={() => onDelete(key)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default List;