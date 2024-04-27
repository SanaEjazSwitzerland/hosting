import { db } from "../../../config/firebase-config";
import { collection, doc, addDoc, getDocs, deleteDoc } from "firebase/firestore"; 
import { useState, useEffect } from "react";

const Docadd = async (prop) => {
    try {
        console.log('add called')
        console.log(prop)
        const docRef = await addDoc(collection(db, "users"), {
            email: prop.email,
            // Add other fields as needed
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

const Docread= ()=>{
    const [data,setData] = useState()
      
    useEffect(()=>{
        const read = async()=>{
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                setData(querySnapshot.docs)
            } 
            catch (e) {
                console.error("Error reading documents: ", e);
            } 
        }
        read()
    }, [data])

    const handleDelete = async (docId) => {
        try {
            await deleteDoc(doc(db, "users", docId));
            console.log("Document deleted successfully");
            // Refresh data after deletion
            const querySnapshot = await getDocs(collection(db, "users"));
            setData(querySnapshot.docs);
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item,i)=>{
                        return(
                            <tr key={i}>
                                <td>{item.id}</td>
                                <td>{item.data().email}</td>
                                <td>
                                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })} 
                </tbody>
            </table>
        </>
    )
}

const Docdelete = async (docId) => {
    try {
        await deleteDoc(doc(db, "users", docId));
        console.log("Document deleted successfully");
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};

export { Docadd, Docread, Docdelete };
