const hubConnection = new signalR.HubConnectionBuilder().withUrl("/chat").withAutomaticReconnect().build();
const chatService = new ChatService(hubConnection);
const userService = new UserService(hubConnection);

document.querySelector("#reportUser").addEventListener("click", () => {
    userService.loadUsersForReport();
    document.querySelector('.bg-modal').style.display = "flex";
});

document.querySelector(".close").addEventListener("click", () => {
    document.querySelector('.bg-modal').style.display = "none";
});

document.querySelector('form[name="reportUserForm"]').addEventListener("submit", (e) => {
    e.preventDefault();
    userService.reportUser();
});

document.querySelector('input[name = "new_message"]').addEventListener("keyup", event => {
    chatService.sendNewMessage();
});

hubConnection.on("Send", (data, userName) => chatService.addNewMessage(userName + " : " + data));

hubConnection.on("NewUser", userService.onUserEntered);

hubConnection.on("UserLeft", userService.onUserLeft);

hubConnection.on("GetConnectedUsers", userService.getConnectedUsers);

hubConnection.on("ReportUser", message => chatService.addAlertMessage("You've been reported. Message: " + message));

hubConnection.on("HubLoaded", () => hubConnection.invoke("GetConnectedUsers"));

hubConnection.start();