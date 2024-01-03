import { useState } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";

function CreateMessage() {

    const [message, setMessage] = useState('');

    const bothIds = localStorage.getItem('bothIds');
    const otherUser = localStorage.getItem('otherUser');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const user = auth.currentUser;

        if(user){
            const { uid, displayName } = user;

            const messagesCollection = collection(db, 'chats', bothIds as string, 'messages');
            
            try {
                await addDoc(messagesCollection, {
                    message: message,
                    user: displayName,
                    uid: uid,
                    createdAt: serverTimestamp(),
                    user2: otherUser
                });
        
                await setDoc(doc(db, 'userChats', uid), {
                    ['userInfo']: {
                        text: message
                    }
                }, { merge: true })

                setMessage('');
                
            } catch (error) {
                console.error('Error adding document to Firestore:', error);
            }
        }
    }    

  return (
    <div className="w-11/12">
        <form onSubmit={handleSubmit} className="flex border-2 border-orange-300 rounded-lg w-full justify-between bg-orange-200">
            <input type="text" value={message} 
            className="bg-orange-200 block my-2 w-full px-2 focus:outline-none" 
            onChange={(e) => setMessage(e.target.value)}
            placeholder="New message"/>
            <button type="submit" className="pr-2">
                <svg className="h-8 w-8 text-orange-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  
                    <circle cx="12" cy="12" r="10" />  
                    <polyline points="12 16 16 12 12 8" />  
                    <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
            </button>
        </form>
    </div>
  ) 
}

export default CreateMessage