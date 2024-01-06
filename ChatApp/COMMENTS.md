# FireMessage Chat App

This is an application where you can chat with your friends online in real time. You can access it with your google account and logout whenever you want. 

As soon as you open the app, you can login with your account. Once you're logged, you can filter all the available users within the app with the search bar, this will show you all the users that are already registered in the app. You will also be able to see your previous chats and select them to continue chatting with the chosen user.

Once you've chosen the user to chat with, you can start sending messages and they will receive them in real time. 

### Login and Logout:

For the login I used the firebase authentication for google accounts and once I acquired the user info, I saved it on my localstorage to maintain the session open. As soon as you click on the logout button, the localstorage is cleared which will lead you to the login page again as the Home route is protected and you need to be authenticated to be able to see the home page. 

### Search:

In the search component, I use a UseEffect for getting all the registered users but they are only shown once the search bar is used. Then I filter trough this array with the correct query and print the users that apply to this search. Once you click on one of the users, a new chat will be created only if you haven't chatted with the selected user previously. If the chat was already created, it will just open it and print the messages on the screen.

### ChatList:

In the ChatList, I fetch all the chats between the current user and other ones, and print them so the user can choose from the list instead of having to search through all the users. When selected, the chat would be open without creating a new one. 

### Messages:

The Messages component is in charge of showing all the messages between the current user and the chosen one to chat with. It fetches all the messages and prints them on the screen, being updated when a new message is sent. 

### CreateMessage:

When a new message is created, the component gets the chat id and uses it to locate it on the db. Then it adds the new message to a collection inside the chosen chat. 