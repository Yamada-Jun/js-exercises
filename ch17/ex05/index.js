import { updateGrid } from "./updateGrid.js";
import { renderGrid } from "./renderGrid.js";

// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("/ch17/ex05/decision1.mp3");

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
    .fill(null)
    .map(() =>
        new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
    );

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
    const rect = canvas.getBoundingClientRect();
    const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

    const row = Math.floor(pos.y / RESOLUTION);
    const col = Math.floor(pos.x / RESOLUTION);
    grid[row][col] = !grid[row][col];
    sound.cloneNode().play();
    renderGrid(grid, ROWS, COLS, RESOLUTION);
});

let last_timestamp = Date.now();
// requestAnimationFrame によって一定間隔で更新・描画を行う
// TODO: リフレッシュレートの高い画面では速く実行されてしまうため、以下を参考に更新頻度が常に一定となるようにしなさい
// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
function update() {
    const now_timestamp = Date.now();
    // 100msごと（10fps）に更新
    if (now_timestamp - last_timestamp >= 100) {
        grid = updateGrid(grid, ROWS, COLS);
        renderGrid(grid, ROWS, COLS, RESOLUTION);
        last_timestamp = now_timestamp;
    }
    animationId = requestAnimationFrame(update);
}

startButton.addEventListener("click", () => {
    // 既にアニメーションが動いている場合は何もしない
    if (animationId) {
        return;
    }
    update();
});

pauseButton.addEventListener("click", () => {
    // アニメーションが停止している場合は何もしない
    if (!animationId) {
        return;
    }
    cancelAnimationFrame(animationId);
    animationId = null;
});

renderGrid(grid, ROWS, COLS, RESOLUTION);
