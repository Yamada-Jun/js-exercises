import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

export function fetchSumOfFileSizes(path) {
    return readdir(path).then(files => {
        // 各ファイルのサイズを取得するPromiseを作成
        let promises = [];
        for (let file of files) {
            promises.push(stat(join(path, file)));
        }

        // すべてのPromiseが完了したら合計サイズを計算
        return Promise.all(promises).then(stats_arr => {
            let total = 0;
            for (let stats of stats_arr) {
                total += stats.size;
            }
            return total;
        });
    });
}
