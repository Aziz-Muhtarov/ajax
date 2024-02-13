document.addEventListener('DOMContentLoaded', function() {
    const chatWindow = document.getElementById('chat-window');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const locationButton = document.querySelector('.location-button');

    let socket = new WebSocket('wss://echo-ws-service.herokuapp.com');

    socket.onopen = function(event) {
        console.log('WebSocket connection opened');
        messageInput.removeAttribute('disabled');
        sendButton.removeAttribute('disabled');
        locationButton.removeAttribute('disabled');
    };

    socket.onerror = function(error) {
        console.error('WebSocket error: ', error);
    };

    socket.onmessage = function(event) {
        appendMessage(event.data);
    };

    sendButton.addEventListener('click', function() {
        const message = messageInput.value;
        if (message.trim() !== '') {
            sendMessage(message);
            messageInput.value = '';
        }
    });

    locationButton.addEventListener('click', function() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const { latitude, longitude } = position.coords;
                const locationUrl = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
                sendMessage(locationUrl);
            });
        } else {
            alert('Geolocation is not supported by your browser');
        }
    });

    function sendMessage(message) {
        socket.send(message);
        appendMessage(message, true);
    }

    function appendMessage(message, isSent = false) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        if (isSent) {
            messageElement.classList.add('sent-message');
        }
        chatWindow.appendChild(messageElement);
    }
});