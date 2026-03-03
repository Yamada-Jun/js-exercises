import express from "express";
import path from "path";

const rootDirectory = process.argv[2] || "/tmp";

const app = express();// 新しいHTTPサーバを作成

// "/test/mirror" へのリクエストの場合、リクエスト内容をそのまま返す
app.get("/test/mirror", (req, res) => {
    // レスポンスヘッダを設定
    res.set("Content-Type", "text/plain; charset=UTF-8");
    // レスポンスボディの先頭にリクエスト内容を出力
    res.write(`${req.method} ${req.originalUrl} HTTP/${req.httpVersion}\r\n`);
    // リクエストヘッダを出力
    for (const [key, value] of Object.entries(req.headers)) {
        res.write(`${key}: ${value}\r\n`);
    }
    // ヘッダの後に空行を追加
    res.write("\r\n");
    // リクエストボディをレスポンスボディにコピーする
    // どちらもストリームなので pipe が使える
    req.pipe(res);
});

// それ以外の場合はローカルディレクトリからファイルを配信
app.use(express.static(rootDirectory, {//express.static ミドルウェアを使って、rootDirectory で指定されたローカルディレクトリ内のファイルを静的ファイルとして配信する
    setHeaders: (res, filePath) => {
        // 拡張子からコンテンツタイプ（Content-Type）を推測
        //console.log(filePath);
        let type;
        switch (path.extname(filePath)) {
            case ".html":
            case ".htm": type = "text/html"; break;
            case ".js": type = "text/javascript"; break;
            case ".css": type = "text/css"; break;
            case ".png": type = "image/png"; break;
            case ".txt": type = "text/plain"; break;
            default: type = "application/octet-stream"; break;
        }
        //Content-Typeヘッダを設定。これがないとブラウザがファイルの種類を正しく認識できない
        res.setHeader("Content-Type", type);
    }
}));

// 404 Not Found
app.use((req, res) => {
    res.status(404).type("text/plain").send("Not Found");
});

// 指定したポートで待ち受け
app.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});

export default app;


