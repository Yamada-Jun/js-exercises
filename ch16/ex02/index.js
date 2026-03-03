import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  // 子プロセスが異常終了した場合、再起動
  child.on("close", async (code, signal) => {
    if (code !== 0) {
      console.log(`子プロセスが終了しました (code: ${code}, signal: ${signal})`);
      await startChild();
    }
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]); // Promiseを解決して、子プロセスの終了コードとシグナルを返す
    });
  });
}

// TODO: ここに処理を書く
(async () => {
    child = await startChild();//startChild()はPromiseを返す
    const [code, signal] = await child;
    if (signal === "SIGTERM" || signal === "SIGKILL") {
        process.exit(0);
    }
})();

//SIGTERMシグナルをトラップ
process.on("SIGTERM", () => {
    // 子プロセスが存在すればSIGTERMを送信
    if (child) {
        child.kill("SIGTERM");
    }
});

//SIGKILLシグナルをトラップ
process.on("SIGKILL", () => {
    // 子プロセスが存在すればSIGKILLを送信
    if (child) {
        child.kill("SIGKILL");
    }
});
