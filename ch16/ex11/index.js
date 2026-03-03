import net from "net";

const server = net.createServer(socket => {
    socket.on('data', data => {
        // 生のHTTPリクエストデータを表示
        //console.log(data.toString());

        const req = data.toString();    // 受信したデータを文字列に変換
        const [requestLine, ...headerAndBody] = req.split('\r\n');// HTTPリクエストの最初の行を解析
        const [method, path] = requestLine.split(' ');// HTTPリクエストの最初の行からHTTPメソッドとパスを取得
        //console.log(headerAndBody);

        // headerAndBodyの中から空行以降がbody
        const body = headerAndBody.slice(headerAndBody.indexOf('') + 1).join('\r\n');

        // new URLSearchParams(body)を使って、bodyからnameやgreetingの値を取得できるようにする
        const params = new URLSearchParams(body);
        console.log(params);
        const name = params.get('name');
        const greeting = params.get('greeting');

        console.log('name:', name);
        console.log('greeting:', greeting);

        if (method === 'GET' && path === '/') {
            // HTTPレスポンスヘッダーとボディを手動で送信
            socket.write('HTTP/1.1 200 OK\r\n');
            socket.write('Content-Type: text/html\r\n');//HTMLを指定しないと、ただのテキストとして表示されてしまう
            socket.write('\r\n');
            socket.write(
                `<!doctype html>
                <html lang="ja">
                    <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Greeting Form</title>
                    </head>
                    <body>
                    <form action="/greeting" method="POST">
                        <label for="greeting">Name:</label>
                        <input type="text" id="name" name="name" />
                        <input type="text" id="greeting" name="greeting" />
                        <button type="submit">Submit</button>
                    </form>
                    </body>
                </html>
                       `);

            socket.end(); // 通信を閉じる
        } else if (method === 'POST' && path === '/greeting') {// /greeting にPOSTリクエストが来たときの処理
            socket.write('HTTP/1.1 200 OK\r\n');
            socket.write('Content-Type: text/html\r\n');//HTMLを指定しないと、ただのテキストとして表示されてしまう
            socket.write('\r\n');
            socket.write(
                `<!doctype html>
                <html lang="ja">
                    <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Greeting Form</title>
                    </head>
                    <body>
                    <form action="/greeting" method="POST">
                        <label for="greeting">Name:</label>
                        <input type="text" id="name" name="name" value="${name}" />
                        <input type="text" id="greeting" name="greeting" value="${greeting}" />
                        <button type="submit">Submit</button>
                    </form>
                    </body>
                </html>
                       `);
            socket.end(); // 通信を閉じる
        }
        else {
            //HTTP のプロトコルにしたがい 404 または 405 を返す
            socket.write('HTTP/1.1 404 Not Found\r\n');
            socket.end(); // 通信を閉じる
        }
    });

 });


server.listen(3000);

console.log('listening on port 3000');