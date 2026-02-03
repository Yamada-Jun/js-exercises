const socket = new WebSocket("ws://localhost:3003/ch15.11-15/ex08");
const send_button = document.querySelector("#send");
const input1 = document.querySelector("#payload1");
const input2 = document.querySelector("#payload2");
const input3 = document.querySelector("#payload3");
const response1 = document.querySelector("#response1");
const response2 = document.querySelector("#response2");
const response3 = document.querySelector("#response3");
let request_id_count = 0;
const request_id = [];
let is_timeout = false;
const loading_text = "Loading...";

// 開通
socket.addEventListener("open", () => {
    console.log("Connected");
});

send_button.addEventListener("click", (e) => {
    e.preventDefault();
    // 両端からホワイトスペースを取り除いた文字列を取得する
    const request1 = input1.value.trim();
    const request2 = input2.value.trim();
    const request3 = input3.value.trim();
    if (request1 !== "") {
        response1.textContent = loading_text;
        let request = {
            "requestId": request_id_count, // リクエストを識別するID
            "type": "request",
            "payload": request1
        }
        request_id[0] = request_id_count;
        request_id_count++;
        console.log(JSON.stringify(request));
        socket.send(JSON.stringify(request));
    }
    if (request2 !== "") {
        response2.textContent = loading_text;
        let request = {
            "requestId": request_id_count, // リクエストを識別するID
            "type": "request",
            "payload": request2
        }
        request_id[1] = request_id_count;
        request_id_count++;
        console.log(JSON.stringify(request));
        socket.send(JSON.stringify(request));
    }
    if (request3 !== "") {
        response3.textContent = loading_text;
        let request = {
            "requestId": request_id_count, // リクエストを識別するID
            "type": "request",
            "payload": request3
        }
        request_id[2] = request_id_count;
        request_id_count++;
        console.log(JSON.stringify(request));
        socket.send(JSON.stringify(request));
    }
    input1.value = "";
    input2.value = "";
    input3.value = "";

    //3秒以内にレスポンスが返ってこなかった場合
    is_timeout = false;
    setTimeout(() => {
        if (response1.textContent === loading_text) {
            response1.textContent = "Error: Request timed out";
        }
        if (response2.textContent === loading_text) {
            response2.textContent = "Error: Request timed out";
        }
        if (response3.textContent === loading_text) {
            response3.textContent = "Error: Request timed out";
        }
        is_timeout = true;
    }, 3000);
    //console.log("click");
});

// メッセージ受信
socket.addEventListener("message", (event) => {
    console.log("Message from server:", event.data);
    //タイムアウトしていたら無視する
    if (is_timeout) {
        console.log("Ignore message because timeout");
        return;
    }

    let data = JSON.parse(event.data);
    if (request_id[0] === data.requestId) {
        if (data.type === "error") {
            response1.textContent = "Error: " + data.payload;
        }
        else {
            response1.textContent = data.payload;
        }
    }
    if (request_id[1] === data.requestId) {
        if (data.type === "error") {
            response2.textContent = "Error: " + data.payload;
        }
        else {
            response2.textContent = data.payload;
        }
    } 
    if (request_id[2] === data.requestId) {
        if (data.type === "error") {
            response3.textContent = "Error: " + data.payload;
        }
        else {
            response3.textContent = data.payload;
        }
    }
});

// 切断
socket.addEventListener("close", () => {
    console.log("Disconnected");
    if (response1.textContent === loading_text) {
        response1.textContent = "Error: Connection Closed";
    }
    if (response2.textContent === loading_text) {
        response2.textContent = "Error: Connection Closed";
    }
    if (response3.textContent === loading_text) {
        response3.textContent = "Error: Connection Closed";
    }
});
