// import fetch from "node-fetch"; // Node.js 18以降では、fetchはグローバルに利用可能になったため、node-fetchをインポートする必要はありません。
import 'dotenv/config';// .env ファイルから環境変数を読み込むためのモジュール
import readline from "readline";


const HELP_TXT = `
GitHub Issues CLI

Options:
  -h, --help                  ヘルプを表示
  -v, --verbose               HTTP リクエスト/レスポンスのログを出力

Commands:
  create <title>              Issue を作成
  close <issue num>           指定した Issue をクローズ
  list                        オープンな Issue の一覧を表示
`;

let log = "";

// Issue操作関数
export async function createIssue(title) {
    const resCreate = await fetch("https://api.github.com/repos/Yamada-Jun/js-exercises/issues", {
        method: "POST",
        headers: {
            "Authorization": `token ${process.env.GITHUB_TOKEN}`,// GitHubのTokenを.envから取得
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        },
        body: JSON.stringify({ title, body: "Issue body text" })
    });
    log += `Request: POST https://api.github.com/repos/Yamada-Jun/js-exercises/issues\n`;
    log += `Body: ${JSON.stringify({ title, body: "Issue body text" })}\n`;
    log += `Response: ${await resCreate.text()}\n`;
}

export async function closeIssue(issueNum) {
    const resClose = await fetch(`https://api.github.com/repos/Yamada-Jun/js-exercises/issues/${issueNum}`, {
        method: "PATCH",
        headers: {
            "Authorization": `token ${process.env.GITHUB_TOKEN}`,// GitHubのTokenを.envから取得
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        },
        body: JSON.stringify({ state: "closed" }),
    });
    log += `Request: PATCH https://api.github.com/repos/Yamada-Jun/js-exercises/issues/${issueNum}\n`;
    log += `Body: ${JSON.stringify({ state: "closed" })}\n`;
    log += `Response: ${await resClose.text()}\n`;
}

export async function listIssues() {
    const resList = await fetch(`https://api.github.com/repos/Yamada-Jun/js-exercises/issues?state=open`, {
        method: "GET",
        headers: {
            "Authorization": `token ${process.env.GITHUB_TOKEN}`,// GitHubのTokenを.envから取得
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        },
    });
    const issues = await resList.json();
    issues.forEach(issue => {
        console.log(`#${issue.number}: ${issue.title}`);
    });
    log += `Request: GET https://api.github.com/repos/Yamada-Jun/js-exercises/issues?state=open\n`;
    log += `Response: ${await resList.text()}\n`;
}

// コマンドを実行する関数
async function runCmd(cmd, args) {
    switch (cmd) {
        case "create":
            await createIssue(args[0]);
            break;
        case "close":
            await closeIssue(args[0]);
            break;
        case "list":
            await listIssues();
            break;
        case "-h":
        case "--help":
            console.log(HELP_TXT);
            break;
        case "-v":
        case "--verbose":
            console.log(log);
            break;
        default:
            console.error("unknown runcmd");
    }
}


// メイン関数
async function main() {
    const rl = readline.createInterface({
        input: process.stdin,// input: process.stdin は、ユーザーがコマンドを入力するための入力ストリームを指定するオプションです。ここでは、ユーザーがコマンドを入力するために標準入力を使用するようになっています。
        output: process.stdout,// output: process.stdout は、ユーザーがコマンドを入力した後に結果を表示するための出力ストリームを指定するオプションです。ここでは、ユーザーがコマンドを入力した後に結果が標準出力に表示されるようになっています。
        prompt: "> ",// prompt: "> " は、ユーザーがコマンドを入力する前に表示されるプロンプト文字列を指定するオプションです。ここでは、ユーザーがコマンドを入力する前に "> " が表示されるようになっています。
        terminal: false,// terminal: false は、readline インターフェースが端末ではなく、ファイルやパイプなどの非対話的なストリームを使用することを示すオプションです。これにより、プロンプトが表示されなくなります。
    });

    rl.prompt(); // > を表示

    for await (const rawLine of rl) {
        const line = rawLine.trim();// trim() は、文字列の両端から空白を削除するメソッドです。これにより、ユーザーがコマンドを入力する際に余分な空白があっても正しく処理されるようになります。
        if (line === "") {
            rl.prompt();
            continue;
        }
        const [cmd, ...args] = line.split(" ");// コマンドと引数を分割
        try {
            rl.pause();
            await runCmd(cmd, args);// argsを追加
        } catch (err) {
            console.error(err);
        } finally {
            rl.resume();
        }
        rl.prompt();
    }
}

// main();