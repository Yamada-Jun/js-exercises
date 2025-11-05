import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import * as fs from "node:fs";

// 最初のファイルのサイズを取得
function fetchFirstFileSize(path, callback) {
    // ディレクトリ内のファイル一覧を取得
    fs.readdir(path, (err, files) => {
        // エラーチェック
        if (err) {
            // エラーがあればコールバックで返す
            callback(err);
            return;
        }
        // ファイルが存在しない場合はnullを返す
        if (files.length === 0) {
            callback(null, null);
            return;
        }
        // 最初のファイルの情報を取得
        fs.stat(join(path, files[0]), (err, stats) => {
            // エラーチェック
            if (err) {
                callback(err);
                return;
            }
            // ファイルサイズをコールバックで返す
            callback(null, stats.size);
        });
    });
}


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

// 全ファイルサイズの合計を取得
function fetchSumOfFileSizes(path, callback) {
    // ディレクトリ内のファイル一覧を取得
    fs.readdir(path, (err, files) => {
        // エラーチェック
        if (err) {
        // エラーがあればコールバックで返す
            callback(err);
            return;
        }
        // ファイルごとにstatを呼びサイズを合計する
        let total = 0;
        // 処理するファイルのリストをコピー
        const rest = [...files];

        // 再帰的にファイルサイズを取得して合計する関数
        function iter() {
            // 処理するファイルが無くなったら合計を返す
            if (rest.length === 0) {
                callback(null, total);
                return;
            }
            // 次のファイルを取得
            const next = rest.pop();
            // ファイルの情報を取得
            fs.stat(join(path, next), (err, stats) => {
                // エラーチェック
                if (err) {
                    callback(err);
                    return;
                }
                // サイズを合計に加算
                total += stats.size;
                // 次のファイルを処理
                iter();
            });
        }
        // ここから処理を開始
        iter();
    });
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


//fetchFirstFileSize("./ch12/ex06/test").then(size => console.log("First file size:", size));

//fetchSumOfFileSizes("./ch12/ex06/test").then(sum => console.log("Total size:", sum));
