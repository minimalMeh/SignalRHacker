const hubConnection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

const queryStringForInput = 'input[name="new_message"]';

const addNewUser = (userName) => {
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
}

const removeUser = (userName) => {
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
}

const addNewMessage = (messageContent) => {
    let messages = sessionStorage.getItem("messages");
    if (messages) {
        users = Array.from(messages);
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
}

document.querySelector(queryStringForInput).addEventListener("keyup", event => {
    const inputMessage = document.querySelector(queryStringForInput);
    if (inputMessage.value === null || inputMessage.value === undefined
        || inputMessage.value === "" || inputMessage.value === "хд"
        || !inputMessage.value.trim().length) {
        return;
    }

    if (event.keyCode === 13) {
        sendNewMessage();
        document.querySelector(queryStringForInput).value = "";
    }
});

hubConnection.on("Send", (data, userName) => {
    addNewMessage(userName + " : " + data);
});

const sendNewMessage = () => {
    let message = document.querySelector(queryStringForInput).value;
    hubConnection.invoke("Send", message);
}

const newUserEntered = (userName) => {
    addNewUser(userName);
}

const userLeft = (userName) => {
    removeUser(userName);
}

hubConnection.on("NewUser", newUserEntered);

hubConnection.on("UserLeft", userLeft);

if (sessionStorage.getItem("users") !== null && sessionStorage.getItem("users") !== undefined) {
    const users = Array.from(sessionStorage.getItem("users"));
    users.forEach(u => addNewUser(u));
}

if (sessionStorage.getItem("messages") !== null && sessionStorage.getItem("messages") !== undefined) {
    const messages = Array.from(sessionStorage.getItem("messages"));
    users.forEach(m => addNewMessage(m));
}

//Before start checking initializaion of already existing messages and users.
hubConnection.start();