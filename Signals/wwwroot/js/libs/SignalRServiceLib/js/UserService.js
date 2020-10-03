class UserService extends HubService {

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
    };
};