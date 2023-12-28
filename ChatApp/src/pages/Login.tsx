import { useNavigate } from 'react-router-dom';
import { auth, db, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function Login() {

  const navigate = useNavigate()

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result)
      if (result.user.displayName && result.user.email && result.user.uid) {
        localStorage.setItem('user', result.user.displayName);
        localStorage.setItem('email', result.user.email);
        localStorage.setItem('id', result.user.uid);
        if(result.user.photoURL){
          localStorage.setItem('photo', result.user.photoURL);
        }
      }
      await setDoc(doc(db, "users", result.user.uid), {
        name: result.user.displayName, 
        email: result.user.email,
        id: result.user.uid, 
        // photo: result.user.photoURL
      })
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-indigo-200 p-8 shadow-lg rounded-md justify-center">
        <h2 className="text-2xl font-semibold mb-6">Sign in with Google</h2>
        <button
          onClick={signInWithGoogle}
          className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition"
        >
          Sign In with Google
        </button>
      </div>
    </div>

  );
}

export default Login;