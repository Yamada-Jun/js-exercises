"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
const eventSource = new EventSource("http://localhost:3000/message");
button.addEventListener("click", (e) => {
    e.preventDefault();
    getMessageFromServer();
});
async function getMessageFromServer() {
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.textContent = "";
    messageContainer.appendChild(messageElement);

    // TODO: ここにサーバーとのやり取り等を実装しなさい
    eventSource.onmessage = (event) => {
        console.log("受信:", event.data);

        const data = JSON.parse(event.data);
        messageElement.textContent = data.value;
        if (data.done) {
            button.disabled = false;
        }
        else {
            //buttonを無効化する
            button.disabled = true;
        }
    };
}
