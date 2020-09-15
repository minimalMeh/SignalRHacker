const hubConnection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

const queryStringForInput = 'input[name="new_message"]';

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

hubConnection.on("Send", data => {
    const message = document.createElement("p");
    message.classList.add("content_chat--content--message");
    message.appendChild(document.createTextNode(data));
    const firstElement = document.querySelector(".content_chat--content").firstChild;
    document.querySelector(".content_chat--content").insertBefore(message, firstElement);
});

const sendNewMessage = () => {
    let message = document.querySelector(queryStringForInput).value;
    hubConnection.invoke("Send", message);
}

const newUserEntered = (userName) => {
    const userData = document.createElement("p");
    userData.classList.add("users_list--user");
    userData.appendChild(document.createTextNode(userName));
    const usersList = document.querySelector(".users_list");
    const lastElement = usersList.lastChild;
    usersList.insertBefore(userData, lastElement);
}

const userLeft = (userName) => {
    const userList = document.querySelector(".users_list");
    const users = Array.from(userList.querySelectorAll('.users_list--user'));
    const user = users.filter(item => item.innerHTML.includes(userName))[0];
    userList.removeChild(user);
}

hubConnection.on("NewUser", newUserEntered);

hubConnection.on("UserLeft", userLeft);

hubConnection.start();