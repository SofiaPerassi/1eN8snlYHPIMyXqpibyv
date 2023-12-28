import ChatList from "../components/ChatList"
import Search from "../components/Search"

function NavBar() {

  return (
    <div className="p-2">
        <Search />
        <ChatList />
    </div>
  )
}

export default NavBar