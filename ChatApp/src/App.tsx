// App.js
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Router } from './Router/router';
import { ChatProvider } from './context/ChatContext';


function App() {


  return (
    <BrowserRouter>
       <ChatProvider>
    <Router />
       </ChatProvider>
    </BrowserRouter>
  );
}


export default App
