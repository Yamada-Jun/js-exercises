// これは指定したディレクトリからファイルを配信するシンプルな静的HTTPサーバです。
// また、/test/mirror エンドポイントを実装しており、
// クライアントからのリクエスト内容をそのまま返します（クライアントのデバッグに便利です）。
import http from "http";   // 証明書がある場合は "https" を使ってください
import url from "url";     // URLを解析するため
import path from "path";   // ファイルシステムのパスを操作するため
import fs from "fs";       // ファイルを読み込むため

// 指定したルートディレクトリからファイルを配信するHTTPサーバを、指定したポートで起動します。
export function serve(rootDirectory, port) {
    let server = new http.Server();  // 新しいHTTPサーバを作成
    server.listen(port);             // 指定したポートで待ち受け
    console.log("Listening on port", port);

    // リクエストが来たとき、この関数で処理します
    server.on("request", (request, response) => {
        // リクエストURLのパス部分のみを取得（クエリパラメータは無視）
        let endpoint = url.parse(request.url).pathname;

        // "/test/mirror" へのリクエストの場合、リクエスト内容をそのまま返す
        // （リクエストヘッダやボディを確認したいときに便利）
        if (endpoint === "/test/mirror") {
            // レスポンスヘッダを設定
            response.setHeader("Content-Type", "text/plain; charset=UTF-8");

            // レスポンスのステータスコードを指定
            response.writeHead(200);  // 200 OK

            // レスポンスボディの先頭にリクエスト内容を出力
            response.write(`${request.method} ${request.url} HTTP/${
                               request.httpVersion
                           }\r\n`);

            // リクエストヘッダを出力
            let headers = request.rawHeaders;
            for(let i = 0; i < headers.length; i += 2) {
                response.write(`${headers[i]}: ${headers[i+1]}\r\n`);
            }

            // ヘッダの後に空行を追加
            response.write("\r\n");

            // リクエストボディをレスポンスボディにコピーする
            // どちらもストリームなので pipe が使える
            request.pipe(response);
        }
        else  // "/foo/bar/hello.txt" へのリクエストの場合
            if (endpoint === "/foo/bar/hello.txt") {
                console.log("Received request for /foo/bar/hello.txt");
                //PUTでファイルをストリームでアップロードする
                if (request.method === "PUT") {
                    console.log("Handling PUT request for /foo/bar/hello.txt");
                    // 保存先ファイルパスを決定
                    const savePath = path.resolve(rootDirectory, "foo/bar/hello.txt");
                    // ディレクトリが存在しない場合は作成
                    fs.mkdir(path.dirname(savePath), { recursive: true }, (err) => {
                        console.log("Creating directory for /foo/bar/hello.txt");
                        if (err) {
                            response.writeHead(500);
                            response.end("Directory creation failed");
                            return;
                        }
                        // リクエストボディをファイルにストリームで保存
                        const fileStream = fs.createWriteStream(savePath);
                        request.pipe(fileStream);
                        fileStream.on("finish", () => {
                            console.log("finish");
                            response.writeHead(201);
                            response.end("File uploaded");
                        });
                    });
                }
            }
        // それ以外の場合はローカルディレクトリからファイルを配信
        else {
            // エンドポイントをローカルファイルシステム上のファイルに対応付ける
            let filename = endpoint.substring(1); // 先頭の / を除去
            // パスに "../" が含まれている場合は除去（ルートディレクトリ外のファイルを配信しないためのセキュリティ対策）
            filename = filename.replace(/\.\.\//g, "");
            // 相対パスを絶対パスに変換
            filename = path.resolve(rootDirectory, filename);

            // 拡張子からコンテンツタイプ（Content-Type）を推測
            let type;
            switch(path.extname(filename))  {
            case ".html":
            case ".htm": type = "text/html"; break;
            case ".js":  type = "text/javascript"; break;
            case ".css": type = "text/css"; break;
            case ".png": type = "image/png"; break;
            case ".txt": type = "text/plain"; break;
            default:     type = "application/octet-stream"; break;
            }

            let stream = fs.createReadStream(filename);
            stream.once("readable", () => {
                // ストリームが読み込み可能になったら、
                // Content-Typeヘッダと200 OKステータスを設定し、
                // ファイルリーダーストリームをレスポンスにpipeする
                // pipeはストリーム終了時に自動でresponse.end()を呼ぶ
                response.setHeader("Content-Type", type);
                response.writeHead(200);
                stream.pipe(response);
            });

            stream.on("error", (err) => {
                // ストリームのオープン時にエラーが発生した場合、
                // ファイルが存在しないか、読み込み不可の可能性が高い
                // 404 Not Found のプレーンテキストレスポンスとエラーメッセージを返す
                response.setHeader("Content-Type", "text/plain; charset=UTF-8");
                response.writeHead(404);
                response.end(err.message);
            });
        }
    });
}

// コマンドラインから実行された場合、serve() 関数を呼び出す
serve(process.argv[2] || "/tmp", parseInt(process.argv[3]) || 8000);
