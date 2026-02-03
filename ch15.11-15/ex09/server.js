import WebSocket, { WebSocketServer } from "ws";

// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1秒当たりの更新頻度
const FRAME_RATE = 10;

// WebSocketのポート
const port = 3003;
const wss = new WebSocketServer({ port });

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
.fill(null)
.map(() =>
  new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
);
// 停止状態
let paused = true;

wss.on("connection", (ws) => {
  // 接続されたクライアントに初期のグリッドを送信
  ws.send(JSON.stringify({ type: "update", grid }));

  ws.on("message", (message) => {
    const data = JSON.parse(message.toString());
    switch (data.type) {
      case "toggle": // セルの反転
        grid[data.row][data.col] = !grid[data.row][data.col];
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "update", grid }));
          }
        });
        break;
      case "pause": // 停止
        paused = true;
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "pause" }));
          }
        });
        break;
      case "start": // 開始・再開
        paused = false;
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "start" }));
          }
        });
        break;
    }
  });
});

// Life Game のルールに従ってセルを更新する
function updateGrid(grid) {
  // 新しいグリッドを作成
    const nextGrid = grid.map((arr) => [...arr]);
    let count = 0;
    let neighbor_row;
    let neighbor_col;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する
        //（15.04-10.10の実装を利用）
        count = 0;
        for (let row_i = -1; row_i <= 1; row_i++) {
            for (let col_i = -1; col_i <= 1; col_i++) {
                neighbor_row = row + row_i;
                neighbor_col = col + col_i;
                //範囲外のセルでないこと
                if (neighbor_row >= 0 && neighbor_row < ROWS && neighbor_col >= 0 && neighbor_row < COLS) {
                    if (grid[neighbor_row][neighbor_col] && !(row_i == 0 && col_i == 0)/*自分自身のセルは除く*/) {
                        count++;
                    }
                }
            }
        }
        nextGrid[row][col] = false;
        //今のセルが生きている場合
        if (grid[row][col]) {
            //周囲に生きたセルが2つか3つならば、次の世代でも生存する
            if (count == 2 || count == 3) nextGrid[row][col] = true;
        } else {
            //死んでいるセルに隣接する生きたセルがちょうど3つあれば、次の世代が誕生する。
            if (count == 3) nextGrid[row][col] = true;
        }
    }
  }
  return nextGrid;
}

// 全クライアントにグリッドの状態をブロードキャストする
function broadcast(grid) {
  const message = JSON.stringify({ type: "update", grid });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// 1秒に10回グリッドを更新し、クライアントに送信する
setInterval(() => {
  if (paused) {
    return;
  }
  grid = updateGrid(grid);
  broadcast(grid);
}, 1000 / FRAME_RATE);
