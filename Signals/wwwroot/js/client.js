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
    let message = document.createElement("p");
    message.classList.add("content_chat--content--message");
    message.appendChild(document.createTextNode(data));
    let firstElement = document.querySelector(".content_chat--content").firstChild;
    document.querySelector(".content_chat--content").insertBefore(message, firstElement);
});

hubConnection.on("NewUser", data => {

})

hubConnection.on("UserLeft", data => {

})

const sendNewMessage = () => {
    let message = document.querySelector(queryStringForInput).value;
    hubConnection.invoke("Send", message);
}

const newUserEntered = (userName) => {
    let userData = document.createElement("p");
    userData.classList.add(/*"class"*/);
    userData.appendChild(document.createTextNode(data));
    let lastElement = document.querySelector(/*"class"*/).lastChild;
    document.querySelector(/*"class"*/).insertAfter(userData, lastElement);
}

const userLeft = (userName) => {
    let userList = document.querySelector(/*"class"*/);
    //userList.childNodes. found how to detect user
}

hubConnection.start();