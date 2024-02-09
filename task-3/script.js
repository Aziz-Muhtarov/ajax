const wsUrl = "wss://echo-ws-service.herokuapp.com";

const output = document.getElementById('output');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const locationButton = document.getElementById('location-button');

let websocket;

function renderInfo(message) {
    let pre = document.createElement("p");
    pre.style.wordBreak = "break-all";
    pre.innerHTML = message;
    output.appendChild(pre);
};

sendButton.addEventListener('click', () => {
    websocket = new WebSocket(wsUrl);
    websocket.onopen = function (evt) {
        writeToScreen("CONNECTED");
    };
    websocket.onclose = function (evt) {
        writeToScreen("DISCONNECTED");
    };
    websocket.onmessage = function (evt) {
        writeToScreen(
            '<span style="color: blue;">RESPONSE: ' + evt.data + '</span>'
        );
    };
    websocket.onerror = function (evt) {
        writeToScreen(
            '<span style="color: red;">ERROR:</span> ' + evt.data
        );
    };
});

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    writeToScreen("SENT: " + message);
    websocket.send(message);
});

