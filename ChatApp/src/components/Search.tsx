import { useState, useEffect } from "react";
import { db, app as firebaseApp} from "../firebase";
import {  collection, getDocs, getFirestore, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import  {IUser}  from "../interfaces/User";
import { useChats } from "../context/ChatContext";

function Search() {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState<IUser[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

    const {
        setCurrentUser
    } = useChats()

    useEffect(() => {
    const fetchUsers = async () => {
      const db = getFirestore(firebaseApp);

      const usersCollection = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollection);

      const userList : IUser[] = [];

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        userList.push({ id: doc.id, ...userData });
      });

     setUsers(userList);
     console.log(userList)
    };

    fetchUsers();
    }, []);

    const currentUserEmail = localStorage.getItem("email")

    const filterUsers = (searchTerm:string, users:IUser[]) => {
        const filtered = users.filter(user =>
            user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered.filter(el  => el.email !== currentUserEmail ));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setUsername(searchTerm);
        filterUsers(searchTerm, users);
    };

    const currentId = localStorage.getItem('id');

    const handleSelect = async (user: IUser) => {
        if(currentId && user.id) {
          const bothIds = currentId > user.id ? currentId + user.id : user.id + currentId;

          localStorage.setItem('bothIds', bothIds);
          localStorage.setItem('otherUser', user.id);

          setCurrentUser(bothIds)
    
          const docRef = doc(db, 'chats', bothIds);
          const docSnap = await getDoc(docRef);
    
          if (!docSnap.exists()) {
    
            const currentUserName = localStorage.getItem('user') || '';
          
            try {
              await setDoc(doc(db, 'userChats', currentId || '0'), {
                ['userInfo']: {
                  uid: user.id,
                  displayName: user.name,
                  otherUser: currentUserName,
                  otherID: currentId
                },
                [bothIds + '.date']: serverTimestamp(),
              }, { merge: true });
          
              await setDoc(doc(db, 'userChats', user.id), {
                ['userInfo']: {
                  uid: currentId,
                  displayName: currentUserName,
                  otherUser: user.name, 
                  otherID: user.id
                },
                [bothIds + '.date']: serverTimestamp(),
              }, { merge: true });

              console.log('Chat created successfully!',bothIds);
            } catch (error) {
              console.error('Error creating chat:', error);
            }
          } 
        }
      };

   
    return (
        <div>
            <form className="flex border-2 border-orange-300 rounded-lg w-full justify-between bg-orange-200 mt-2">
                <input 
                    type="text"
                    name="title"
                    className="bg-orange-200 block my-2 w-full p-2 focus:outline-none"
                    placeholder="Search user"
                    value={username}
                    onChange={handleInputChange}
                />
            </form>
            <div className="py-2 flex gap-2 flex-col">
                {filteredUsers?.map((user) => (
                    <div key={user.id} className="bg-orange-300 p-2 cursor-pointer rounded-sm text-center">
                        <button onClick={() => {
                            handleSelect(user)
                        } }>{user.name}</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;