import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";


// 最初のファイルのサイズを取得（fs/promises版）
export function fetchFirstFileSize_fspromises(path) {
    // fs/promisesのreaddirはPromiseを返す
    return readdir(path)
        .then(files => {
            // ファイルが存在しない場合はnullを返す
            if (files.length === 0) {
                return null;
            }
            //fs/promisesのstatはPromiseを返す
            return stat(join(path, files[0]))
                //statの戻り値statsからサイズを取得して返す
                .then(stats => stats.size);
        })
        // エラー処理
        .catch(err => {
            throw err;
        });
}


// 最初のファイルのサイズを取得(async/await版)
export async function fetchFirstFileSize(path) {
    // fs/promisesのreaddirはPromiseを返すので、awaitを使って解決を待つ
    //awaitで結果が出るまで待ち、filesに配列として格納
    const files = await readdir(path);
    // ファイルが存在しない場合はnullを返す
    if (files.length === 0) {
        return null;
    }
    // fs/promisesのstatはPromiseを返すので、awaitを使って解決を待つ
    const stats = await stat(join(path, files[0]));
    return stats.size;
}


// 全ファイルサイズの合計を取得（fs/promises版）
export function fetchSumOfFileSizes_fspromises(path) {
    // fs/promisesのreaddirはPromiseを返す
    return readdir(path)
        //readdirの戻り値のfiles配列を渡す。その配列をreduceで処理していく
        .then(files => {
            let total = 0;
            // ファイルごとにstatを呼び、サイズを足し合わせるPromiseのチェーンを作る
            // reduceは同期的にファイルサイズの取得と合計を行うために使用、非同期に処理されるメソッドを使用すると合計値の計算時に競合が発生してしまうことがあるため
            return files.reduce((promise_chain, file) => {
                //promise_chainは前のファイルのサイズ取得が終わった後に次のファイルの処理を始めるためのPromise
                return promise_chain.then(() => {
                    //fs/promisesのstatはPromiseを返す
                    return stat(join(path, file)).then(stats => {
                        total += stats.size;
                    });
                });
            },
                // reduceの初期値。Promise.resolve()で解決されたPromiseから開始させる。これがないと最初のファイルの処理が始まらない
                Promise.resolve())
                .then(() => total);//reduceで全ファイルのサイズを順番に合計した後のtotalを返す
        });
}

// 全ファイルサイズの合計を取得(async/await版)
export async function fetchSumOfFileSizes(path) {
    // fs/promisesのreaddirはPromiseを返すので、awaitを使って解決を待つ
    const files = await readdir(path);
    let total = 0;
    // ファイルごとにstatを呼びサイズを合計する
    for (const file of files) {
        // fs/promisesのstatはPromiseを返すので、awaitを使って解決を待つ
        const stats = await stat(join(path, file));
        total += stats.size;
    }
    // 合計を返す
    return total;
}