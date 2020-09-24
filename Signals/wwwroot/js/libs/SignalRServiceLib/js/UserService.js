class UserService extends HubService {

    static CurrenctUser = null;

    onUserEntered = (userName) => {
        if (CurrenctUser === null) {
            CurrenctUser = userName;
        }
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
        users.forEach(u => {
            if (u !== CurrenctUser) {
                onUserEntered(u)
            }
        });
    };
};