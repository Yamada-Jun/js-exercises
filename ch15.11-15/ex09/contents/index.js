const socket = new WebSocket("ws://localhost:3003/ch15.11-15/ex09");
const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const start_button = document.querySelector("#start");
const pause_button = document.querySelector("#pause");
// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;
canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;


// 開通
socket.addEventListener("open", () => {
    console.log("Connected");
});

start_button.addEventListener("click", (e) => {
    e.preventDefault();
    const request = {
        "type": "start"
    }
    console.log(JSON.stringify(request));
    socket.send(JSON.stringify(request));
});

pause_button.addEventListener("click", (e) => {
    e.preventDefault();
    const request = {
        "type": "pause"
    }
    console.log(JSON.stringify(request));
    socket.send(JSON.stringify(request));
});

// メッセージ受信
socket.addEventListener("message", (event) => {
    //console.log("Message from server:", event.data);

    let data = JSON.parse(event.data);
    if (data.type !== "update") {
        return;
    }
    renderGrid(data.grid);
});

// 切断
socket.addEventListener("close", () => {
    console.log("Disconnected");
});

// grid を canvas に描画する
function renderGrid(grid) {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = grid[row][col];
            ctx.beginPath();
            ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
            ctx.fillStyle = cell ? "black" : "white";
            ctx.fill();
            ctx.stroke();
        }
    }
}

// canvas がクリックされたときの処理
canvas.addEventListener("click", function (evt) {
    const rect = canvas.getBoundingClientRect();
    const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

    const row = Math.floor(pos.y / RESOLUTION);
    const col = Math.floor(pos.x / RESOLUTION);
    const request = {
        "type": "toggle",
        "row": row,
        "col": col
    }
    console.log(JSON.stringify(request));
    socket.send(JSON.stringify(request));
});

//最初に表示
renderGrid(new Array(ROWS).fill(false));
