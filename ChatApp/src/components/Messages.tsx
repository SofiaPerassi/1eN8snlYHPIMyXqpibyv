import { useState, useEffect, useRef } from "react";
import { getFirestore, collection, orderBy, query, onSnapshot, limit, DocumentData, FirestoreError } from 'firebase/firestore';

function Messages() {
    const [messages, setMessages] = useState<DocumentData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<FirestoreError | null>(null);

    const db = getFirestore();
    const bothIds = localStorage.getItem('bothIds');

    const currentUser = localStorage.getItem('user');

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!bothIds) {
                    console.error('No user ID found');
                    setMessages(null);
                    setLoading(false);
                    return;
                }

                const chatsCollection = collection(db, 'chats', bothIds, 'messages');
                const q = query(chatsCollection, orderBy('createdAt', 'asc'), limit(50));

                const unsubscribe = onSnapshot(q, (snapshot) => {
                    setMessages(snapshot.docs.map(doc => (doc.data())));
                    setLoading(false);
                }, (error) => {
                    console.error('Error fetching messages:', error);
                    setMessages(null);
                    setLoading(false);
                    setError(error);
                });

                return () => unsubscribe();
            } catch (error:unknown) {
                console.error('Error fetching messages:', error);
                setMessages([]);
                setLoading(false);
                setError(error as FirestoreError);
            }
        };

        const scrollContainer = scrollContainerRef.current;

        fetchData();

        const scrollToBottom = () => {
          if (scrollContainer) {
              scrollContainer.scrollTo(0, scrollContainer.scrollHeight);
          }
        };

        const scrollTimeout = setTimeout(scrollToBottom, 100);

        return () => clearTimeout(scrollTimeout);

    }, [bothIds, db]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching messages: {error.message}</p>;
    }

    const generateRandomString = (length: number) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
  
      for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
      }
  
      return result;
  };
    
    return (
        // <div> 
          <div className="grid gap-2 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300" ref={scrollContainerRef}>
            {messages?.map(({ message, user }) => (
                <div
                key={generateRandomString(8)}
                className={`flex ${user === currentUser ? 'justify-end' : 'justify-start'}`}
                >
                {user != currentUser && (<div className='flex items-center justify-center w-10 h-10 rounded-full bg-orange-300'>
                  <h1 className='text-orange-800 font-bold text-xl'>
                    {user ? user.charAt(0).toUpperCase() : ''}
                  </h1>
                </div>)}
                <div
                  className={`p-4 max-w-screen-sm w-screen sm:w-[33.333333%] mx-2 my-2 ${
                    user === currentUser ? 'bg-yellow-600 rounded-br-lg rounded-tl-lg rounded-bl-lg text-white' : 'bg-orange-300 rounded-bl-lg  rounded-br-lg rounded-tr-lg'
                  } relative`}
                >
                  <p>{message}</p>
                  {currentUser && (
                    <div
                      className={`absolute right-0 bottom-0 w-0 h-0 border-solid border-transparent border-b-4 border-r-4 ${
                        user === currentUser ? 'border-yellow-600 border-t' : 'border-orange-300 border-l'
                      }`}
                    ></div>
                  )}
                  {!currentUser && (
                    <div
                      className={`absolute left-0 bottom-0 w-0 h-0 border-solid border-transparent border-b-4 border-l-4 ${
                        user === currentUser ? 'border-orange-300 border-r' : 'border-yellow-600 border-t'
                      }`}
                    ></div>
                  )}
                </div>
                {user === currentUser && (<div className='flex items-center justify-center w-10 h-10 rounded-full bg-yellow-600 text-white'>
                  <h1 className='text-amber-800 font-bold text-xl'>
                    {user ? user.charAt(0).toUpperCase() : ''}
                  </h1>
                </div>)}
              </div>
            ))}
          </div>

    );
}

export default Messages;