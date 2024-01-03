import NavBar from '../components/NavBar';
import LiveChat from '../components/LiveChat';
import { useChats } from '../context/ChatContext';
import Title from '../components/Title';

function Home() {
  const {currentUser} = useChats()

  return (
    <div>
       <div className='fixed top-0 w-full z-10'>
        <Title/>
      </div>
      <div className='flex mt-16'>
        <div className='bg-orange-400 w-1/3 h-screen fixed'>
          <NavBar />
        </div>
        {currentUser && 
        <div className="p-2 w-2/3 h-screen fixed right-0">
          <LiveChat  />
        </div>
        }
      </div>
    </div>
  );
}

export default Home;