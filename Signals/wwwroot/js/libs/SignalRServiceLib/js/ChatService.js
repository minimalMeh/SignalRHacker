class ChatService extends HubService {
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
