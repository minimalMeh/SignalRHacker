class ChatService extends HubService {
    queryStringForInput = 'input[name="new_message"]';
    addNewMessage = (messageContent) => {
        let messages = sessionStorage.getItem("messages");
        if (messages) {
            users = Array.from(messages);
        }

        const message = document.createElement("p");
        message.classList.add("content_chat--content--message");
        const content = messageContent;
        message.appendChild(document.createTextNode(content));
        const firstElement = document.querySelector(".content_chat--content").firstChild;
        document.querySelector(".content_chat--content").insertBefore(message, firstElement);

        if (messages !== null && messages !== undefined) {
            messages.push(messageContent);
        } else {
            messages = [messageContent];
        }
        sessionStorage.setItem("messages", messages);
    };

    sendNewMessage = () => {
        let message = document.querySelector(queryStringForInput).value;
        this.hub.invoke("Send", message);
    };

    getSavedMessages = () => {
        if (sessionStorage.getItem("messages") !== null && sessionStorage.getItem("messages") !== undefined) {
            const messages = Array.from(sessionStorage.getItem("messages"));
            messages.forEach(m => addNewMessage(m));
        }        
    };
}
