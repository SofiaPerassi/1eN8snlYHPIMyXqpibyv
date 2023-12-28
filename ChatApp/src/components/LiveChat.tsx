import CreateMessage from "./CreateMessage"
import Messages from "./Messages"

function LiveChat() {

  return (
    <div className="p-2">
      <Messages/>
      <div className="bottom-0 fixed w-2/3 flex align-middle justify-center pb-4">
        <CreateMessage/>
      </div>
    </div>
  )
}

export default LiveChat