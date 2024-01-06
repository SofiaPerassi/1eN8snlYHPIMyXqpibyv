import { IUser } from "../interfaces/User"

interface User { 
  user: 
  { 
    chatData: 
    { userInfo: IUser } 
  } 
}

function Chat(user: User) {

    if(user.user.chatData.userInfo){
        const info = user.user.chatData.userInfo
        return (
            <div className="bg-orange-300 flex flex-col rounded-md p-2 w-full">
                <h2 className="text-lg text-orange-700 font-semibold">
                    {info.otherUser}
                </h2>
                {/* Esta linea imprime el ultimo mensaje enviado por el usuario del chat */}
                {/* <p>{info.text}</p> */}
            </div>
          )
    }

  return (
    <div></div>
  )
}

export default Chat