import { useState } from 'react';
import { getDatabase, ref, child, push, update } from "firebase/database";

let Add = () => {

    const [formData, setFormData] = useState({
        booktitle: '',
        bookprice: '',
    });

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    /*** 
     * Read Write Realtime DB
     * https://firebase.google.com/docs/database/web/read-and-write
    ***/

    let addDataIntoDB = (e) => {
        e.preventDefault();
        const db = getDatabase();
        // set(ref(db, 'users'), {
        //     formData
        // });

        const postData = {
            formData
        };

        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), 'users')).key;

        const updates = {};
        updates['/users/' + newPostKey] = postData;
        // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

        return update(ref(db), updates);

    }


    return (
        <>
            <h1>FireBase Real Time Book Addition</h1>
            <h2>Adding Books </h2>

            <form>
                <input type="text" name='booktitle' placeholder='Enter Book Title' onChange={handleChange} />
                <input type="text" name='bookprice' placeholder='Enter Book Price' onChange={handleChange} />
                <button onClick={addDataIntoDB}>Add Data</button>
            </form>

        </>
    )
}
export default Add