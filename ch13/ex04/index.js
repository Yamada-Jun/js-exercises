import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

// 最初のファイルのサイズを取得
export function fetchFirstFileSize(path) {
    return readdir(path).then(files => {
        if (files.length === 0) {
            return null;
        }
        return stat(join(path, files[0])).then(stats => stats.size);
    });
}

// 全ファイルサイズの合計を取得
export function fetchSumOfFileSizes(path) {
    return readdir(path).then(files => {
        let total = 0;
        // ファイルごとにstatを呼び、サイズを足し合わせるPromiseのチェーンを作る
        return files.reduce((promise_chain, file) => {
            return promise_chain.then(() => {
                return stat(join(path, file)).then(stats => {
                    total += stats.size;
                });
            });
        }, Promise.resolve()).then(() => total);
    });
}


//fetchFirstFileSize("./ch12/ex06/test").then(size => console.log("First file size:", size));

//fetchSumOfFileSizes("./ch12/ex06/test").then(sum => console.log("Total size:", sum));
