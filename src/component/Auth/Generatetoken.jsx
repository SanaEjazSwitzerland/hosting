
import { getToken } from "firebase/messaging";
import { messaging } from './../../config/firebase-config';

let GenerateToken = () => {

    const keypair = "BJwgqFSmIFXOr6uYBQwP3MVytDc23yhYAKfGfEqXEqid24yHnTQ5x5TiTUfvFHg82Wqzbh2PZ7UOwQqVKpyw1Xc"

    

  
    async function requestPermission() {
        const permission = await Notification.requestPermission()
        console.log(permission);

        if (permission ==="granted") {
            const token = await getToken(messaging, { vapidKey: keypair });
            console.log(token);

        }




    }

    requestPermission()

}

export default GenerateToken;
