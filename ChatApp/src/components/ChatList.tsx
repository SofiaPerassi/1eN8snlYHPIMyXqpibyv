import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { app as firebaseApp } from '../firebase';
import Chat from './Chat';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import { useChats } from '../context/ChatContext';
import { IUser } from '../interfaces/User';

function ChatList() {
  const {setCurrentUser} = useChats()
  const [chats, setChats] = useState<{ chatData: {userInfo: IUser} }[]>([]);

  const navigate = useNavigate();

  const currentId = localStorage.getItem('id');

  useEffect(() => {
    const fetchChats = async () => {
        try {
            const db = getFirestore(firebaseApp);

            const chatsCollection = collection(db, 'userChats');
            const querySnapshot = await getDocs(chatsCollection);

            const chatsData: { chatData: {userInfo: IUser} }[] = [];

            querySnapshot.forEach((doc) => {
                const chatData = doc.data();
                console.log(doc.data())
                // const otherUserId = chatData.userInfo.uid;

                if (currentId && (currentId === chatData.userInfo.uid)) {
                    chatsData.push({ chatData: {userInfo: chatData.userInfo} });
                }
            });

            setChats(chatsData);
        } catch (err) {
            console.error(err);
        }
    };

    fetchChats();
}, [currentId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSelect = async (id: string) => {
  if(currentId && id) {
    console.log('Entra en el if')
      const bothIds = currentId > id ? currentId + id : id + currentId;

      localStorage.setItem('bothIds', bothIds);

      setCurrentUser(bothIds)
    }
  };

  console.log(Object.entries(chats), 'estos son los chats')

  return (
    <div>
      <div className='flex gap-2 justify-center flex-col'>
        {Object.entries(chats).map((chat) => (
          <button className='cursor-pointer' onClick={() => {
            handleSelect(chat[1]?.chatData.userInfo.otherID || '')
          }} key={chat[0]}>
            <Chat key={chat[0]} user={chat[1]}/>
          </button>
        ))}
      </div>
      <div className='flex justify-center align-middle fixed bottom-0 p-2 flex-row w-1/3'>
        <button onClick={handleLogout} className='bg-orange-500 rounded-md p-2 mt-2 flex-row flex text-center gap-2 font-semibold text-orange-900 text-xl
        hover:bg-orange-600 hover:text-white'>
          Logout
            <svg className="h-8 w-8 "  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  
            <circle cx="12" cy="12" r="10" />  
            <line x1="15" y1="9" x2="9" y2="15" />  
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatList;

