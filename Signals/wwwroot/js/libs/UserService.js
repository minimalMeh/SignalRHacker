import { HubService } from "./HubService";

export class UserService extends HubService {

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
    }
}