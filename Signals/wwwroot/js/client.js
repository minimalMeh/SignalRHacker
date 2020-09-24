const queryStringForInput = 'input[name="new_message"]';

const hubConnection = new signalR.HubConnectionBuilder().withUrl("/chat").build();
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

hubConnection.on("Send", (data, userName) => {
    chatService.addNewMessage(userName + " : " + data);
});

hubConnection.on("NewUser", userService.onUserEntered);

hubConnection.on("UserLeft", userService.onUserLeft);

userService.getConnectedUsers();

hubConnection.start();