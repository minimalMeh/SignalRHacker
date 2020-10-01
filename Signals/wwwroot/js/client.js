const queryStringForInput = 'input[name="new_message"]';

document.querySelector("#reportUser").addEventListener("click", () => {
    document.querySelector('.bg-modal').style.display = "flex";
});

document.querySelector(".close").addEventListener("click", () => {
    document.querySelector('.bg-modal').style.display = "none";
});

const hubConnection = new signalR.HubConnectionBuilder().withUrl("/chat").withAutomaticReconnect().build();
const chatService = new ChatService(hubConnection);
const userService = new UserService(hubConnection);

document.querySelector(queryStringForInput).addEventListener("keyup", event => {
    const inputMessage = document.querySelector(queryStringForInput);
    if (inputMessage.value === null || inputMessage.value === undefined
        || inputMessage.value === "" || inputMessage.value === "хд"
        || !inputMessage.value.trim().length) {
        return;
    }

    if (event.keyCode === 13) {
        chatService.sendNewMessage();
        document.querySelector(queryStringForInput).value = "";
    }
});

hubConnection.on("Send", (data, userName) => chatService.addNewMessage(userName + " : " + data));

hubConnection.on("NewUser", userService.onUserEntered);

hubConnection.on("UserLeft", userService.onUserLeft);

hubConnection.on("GetConnectedUsers", userService.getConnectedUsers);

hubConnection.on("HubLoaded", () => hubConnection.invoke("GetConnectedUsers"));

hubConnection.start();