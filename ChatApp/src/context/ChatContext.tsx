import { FC, PropsWithChildren, createContext, useContext, useState } from "react";

export interface ChatContextProps {
    currentUser : string;
    setCurrentUser: (id: string) => void;
}

const ChatContext = createContext<ChatContextProps>({
    currentUser: '',
    setCurrentUser: () => null
});

const ChatProvider: FC<PropsWithChildren> = ({children}) => {
    const [currentUser, setCurrentUser] = useState<string>('');

    const handleCurrentUser = (id: string) => {
        setCurrentUser(id);
    }

    return (
        <ChatContext.Provider value={{
            currentUser, 
            setCurrentUser: handleCurrentUser
        }}>
            {children}
        </ChatContext.Provider>
    )
}



const useChats = () => {
    const context = useContext(ChatContext);
    if(context === undefined){
        throw new Error('useChats must be used within a ChatProvider')
    } 
    return context;
} 

export {ChatContext, ChatProvider, useChats}