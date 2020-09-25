class ChatService extends HubService {
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
