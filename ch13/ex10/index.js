import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import * as fs from "node:fs";

// 全ファイルサイズの合計を取得(13.4のfetchSumOfFileSizes)
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

export function fetchSumOfFileSizes_Promise_all(path) {
    return readdir(path).then(files => {
        // 各ファイルのサイズを取得するPromiseをそれぞれ作成する（allに渡す配列）
        let promises = [];
        for (let file of files) {
            // fs/promisesのstatはPromiseを返すので、そのPromiseを配列に追加
            promises.push(stat(join(path, file)));
        }

        //allに各ファイルのサイズを取得するPromiseを渡し
        return Promise.all(promises)
             //すべてのPromiseが完了したら合計サイズを計算
            .then(stats_arr => {
                let total = 0;
                for (let stats of stats_arr) {
                    total += stats.size;
                }
                return total;
            });
    });
}
