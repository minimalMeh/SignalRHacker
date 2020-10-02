class HubService {
    constructor (hub) {
        this.hub = hub;
    };
}; ;class ChatService extends HubService {
    queryStringForInput = 'input[name="new_message"]';

    addNewMessage = (messageContent) => {
        const message = document.createElement("p");
        message.classList.add("content_chat--content--message");
        const content = messageContent;
        message.appendChild(document.createTextNode(content));
        const firstElement = document.querySelector(".content_chat--content").firstChild;
        document.querySelector(".content_chat--content").insertBefore(message, firstElement);
    };

    sendNewMessage = () => {
        let message = document.querySelector(queryStringForInput).value;
        this.hub.invoke("Send", message);
    };
}
 ;class UserService extends HubService {

    onUserEntered = (userName) => {
        const userData = document.createElement("p");
        userData.classList.add("users_list--user");
        userData.appendChild(document.createTextNode(userName));
        const usersList = document.querySelector(".users_list");
        const lastElement = usersList.lastChild;
        usersList.insertBefore(userData, lastElement);
    };

    onUserLeft = (userName) => {
        const userListItem = document.querySelector(".users_list");
        const usersItem = Array.from(userListItem.querySelectorAll('.users_list--user'));
        const userItem = usersItem.filter(item => item.innerHTML.includes(userName))[0];
        userListItem.removeChild(userItem);
    };

    getConnectedUsers = (users) => {
        users.forEach(u => this.onUserEntered(u));
    };

     onReportUserSelect = () => {
         const usersSelect = document.querySelector("#reportUserSelect");
         usersSelect.innerHTML = "";
         fetch("Home/UpdateUsers")
             .then(respose => respose.json())
             .then(data => {
                 const users = Array.from(data.users);
                 users.forEach(i => {
                     var opt = document.createElement("option");
                     opt.value = i.value;
                     opt.innerHTML = i.text;
                     usersSelect.appendChild(opt);
                 });
             });
     };
};