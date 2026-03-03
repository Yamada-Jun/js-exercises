import fetch from "node-fetch";
import 'dotenv/config';
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

// コマンドを実行する関数
async function runCmd(cmd, args) {
    switch (cmd) {
        case "create":
            {
                const resCreate = await fetch("https://api.github.com/repos/Yamada-Jun/js-exercises/issues", {
                    method: "POST",
                    headers: {
                        "Authorization": `token ${process.env.GITHUB_TOKEN}`,// GitHubのTokenを.envから取得
                        "Content-Type": "application/json",
                        "Accept": "application/vnd.github.v3+json"
                    },
                    body: JSON.stringify({
                        title: args[0],
                        body: "Issue body text"
                    })
                });
                //console.log(await resCreate.text());
                log += `Request: POST https://api.github.com/repos/Yamada-Jun/js-exercises/issues\n`;
                log += `Body: ${JSON.stringify({ title: args[0], body: "Issue body text" })}\n`;
                log += `Response: ${await resCreate.text()}\n`;
                break;
            }
        case "close":
            {
                const resClose = await fetch(`https://api.github.com/repos/Yamada-Jun/js-exercises/issues/${args[0]}`, {
                    method: "PATCH",
                    headers: {
                        "Authorization": `token ${process.env.GITHUB_TOKEN}`,// GitHubのTokenを.envから取得
                        "Content-Type": "application/json",
                        "Accept": "application/vnd.github.v3+json"
                    },
                    body: JSON.stringify({
                        state: "closed"
                    }),
                });
                //console.log(await resClose.text());
                log += `Request: PATCH https://api.github.com/repos/Yamada-Jun/js-exercises/issues/${args[0]}\n`;
                log += `Body: ${JSON.stringify({ state: "closed" })}\n`;
                log += `Response: ${await resClose.text()}\n`;
                break;
            }
        case "list":
            {
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
                break;
            }
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
        input: process.stdin,
        output: process.stdout,
        prompt: "> ",
        terminal: false,
    });

    rl.prompt(); // > を表示

    for await (const rawLine of rl) {
        const line = rawLine.trim();
        if (line === "") {
            rl.prompt();
            continue;
        }
        const [cmd, ...args] = line.split(" ");//コマンドと引数を分割
        try {
            rl.pause();
            await runCmd(cmd, args);//argsを追加
        } catch (err) {
            console.error(err);
        } finally {
            rl.resume();
        }
        rl.prompt();
    }
}

main();