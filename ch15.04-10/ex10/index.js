// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("/ch15.04-10/ex10/decision1.mp3");

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
  );

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

// Life Game のルールに従ってセルを更新する
function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);
  let count = 0;
  let neighbor_row;
  let neighbor_col;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
      count = 0;
      for (let row_i = -1; row_i <= 1; row_i++) {
        for (let col_i = -1; col_i <= 1; col_i++) {
            neighbor_row = row + row_i;
            neighbor_col = col + col_i;
            //範囲外のセルでないこと
            if(neighbor_row >= 0 && neighbor_row < ROWS && neighbor_col >= 0 && neighbor_row < COLS)
            {
                if(grid[neighbor_row][neighbor_col] && !(row_i == 0 && col_i == 0)/*自分自身のセルは除く*/) {
                    count++;
                }
            }
        }
      }
      nextGrid[row][col] = false;
      //今のセルが生きている場合
      if(grid[row][col])
      {
          //周囲に生きたセルが2つか3つならば、次の世代でも生存する
          if(count == 2 || count == 3) nextGrid[row][col] = true;
      }else{
          //死んでいるセルに隣接する生きたセルがちょうど3つあれば、次の世代が誕生する。
          if(count == 3) nextGrid[row][col] = true;
      }
    }
  }
  return nextGrid;
}

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  renderGrid(grid);
});

 let last_timestamp = Date.now();
// requestAnimationFrame によって一定間隔で更新・描画を行う
// TODO: リフレッシュレートの高い画面では速く実行されてしまうため、以下を参考に更新頻度が常に一定となるようにしなさい
// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
function update() {
  const now_timestamp = Date.now();
  // 100msごと（10fps）に更新
  if (now_timestamp - last_timestamp >= 100) {
    grid = updateGrid(grid);
    renderGrid(grid);
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

renderGrid(grid);
