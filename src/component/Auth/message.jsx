
import { useEffect } from "react"
import  GenerateToken  from "../Auth/Generatetoken"
import { onMessage } from "firebase/messaging"
import { messaging } from './../../config/firebase-config';
let ViewMessage = () => {


    useEffect(() => {
        GenerateToken()
        onMessage(messaging, (payload) => {
            console.log(payload)
        })
    }, [])
    return (
        <div>
            <h1>View Message</h1>
    </div>
    )
}

export default ViewMessage
