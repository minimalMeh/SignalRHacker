class HubService {
    constructor (hub) {
        this.hub = hub;
    };
}; ;class ChatService extends HubService {
    queryStringForInput = 'input[name="new_message"]';

    addNewMessage = (messageContent) => {
        let messages = sessionStorage.getItem("messages");
        if (messages) {
            messages = Array.from(messages);
        }

        const message = document.createElement("p");
        message.classList.add("content_chat--content--message");
        const content = messageContent;
        message.appendChild(document.createTextNode(content));
        const firstElement = document.querySelector(".content_chat--content").firstChild;
        document.querySelector(".content_chat--content").insertBefore(message, firstElement);

        if (messages !== null && messages !== undefined) {
            messages.push(messageContent);
        } else {
            messages = [messageContent];
        }
        sessionStorage.setItem("messages", messages);
    };

    sendNewMessage = () => {
        let message = document.querySelector(queryStringForInput).value;
        this.hub.invoke("Send", message);
    };

    getSavedMessages = () => {
        if (sessionStorage.getItem("messages") !== null && sessionStorage.getItem("messages") !== undefined) {
            const messages = Array.from(sessionStorage.getItem("messages"));
            messages.forEach(m => addNewMessage(m));
        }        
    };
}

 ;class UserService extends HubService {
    onUserEntered = (userName) => {
        let users = sessionStorage.getItem("users");
        if (users) {
            users = Array.from(users);
            if (users.includes(userName)) {
                return;
            }
        }

        const userData = document.createElement("p");
        userData.classList.add("users_list--user");
        userData.appendChild(document.createTextNode(userName));
        const usersList = document.querySelector(".users_list");
        const lastElement = usersList.lastChild;
        usersList.insertBefore(userData, lastElement);
        
        if (users !== null && users !== undefined) {
            users.push(userName);
        } else {
            users = [userName];
        }
        sessionStorage.setItem("users", users);
    };

    onUserLeft = (userName) => {
        let users = sessionStorage.getItem("users");
        if (users) {
            users = Array.from(users);
            if (!users.includes(userName)) {
                return;
            }
        }
    
        const userListItem = document.querySelector(".users_list");
        const usersItem = Array.from(userListItem.querySelectorAll('.users_list--user'));
        const userItem = usersItem.filter(item => item.innerHTML.includes(userName))[0];
        userListItem.removeChild(userItem);
    
        users = users.filter(i => i === userName);
        sessionStorage.setItem("users", users);
    };

    getConnectedUsers = () => {
        if (sessionStorage.getItem("users") !== null && sessionStorage.getItem("users") !== undefined) {
            const users = Array.from(sessionStorage.getItem("users"));
            users.forEach(u => addNewUser(u));
        }
    };
};