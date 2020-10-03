class HubService {
    constructor (hub) {
        this.hub = hub;
    };
}; ;class ChatService extends HubService {
    queryStringForInput = 'input[name="new_message"]';

    addNewMessage = (messageContent) => {
        const elem = this.createMessageElement(messageContent);
        this.insertNewMessage(elem);
    };

    sendNewMessage = () => {
        const inputMessage = document.querySelector(this.queryStringForInput);
        if (inputMessage.value === null || inputMessage.value === undefined
            || inputMessage.value === "" || inputMessage.value === "õä"
            || !inputMessage.value.trim().length) {
            return;
        }

        if (event.keyCode === 13) {
            let message = document.querySelector(this.queryStringForInput).value;
            this.hub.invoke("Send", message);
            document.querySelector(this.queryStringForInput).value = "";
        }
    };

    addAlertMessage = (messageContent) => {
        const elem = this.createMessageElement(messageContent);
        elem.classList.add("reportText");
        this.insertNewMessage(elem);
    };

    createMessageElement = (message) => {
        const element = document.createElement("p");
        element.classList.add("content_chat--content--message");
        element.appendChild(document.createTextNode(message));
        return element;
    };

    insertNewMessage = (messageElement) => {
        const firstElement = document.querySelector(".content_chat--content").firstChild;
        document.querySelector(".content_chat--content").insertBefore(messageElement, firstElement);
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

     loadUsersForReport = () => {
         const usersSelect = document.querySelector("#standard-select");
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

     reportUser = () => {
         const form = document.querySelector('form[name="reportUserForm"]');
         const selectedUserHtmlSelect = form.querySelector('select[name="reportedUser"]');
         const user = selectedUserHtmlSelect.options[selectedUserHtmlSelect.selectedIndex].value;
         const description = form.querySelector('textarea[name="reportDescription"]').value;
         this.hub.invoke("ReportUser", [user, description]);
         document.querySelector('.bg-modal').style.display = "none";
         form.querySelector('textarea[name="reportDescription"]').value = "";
     };
};