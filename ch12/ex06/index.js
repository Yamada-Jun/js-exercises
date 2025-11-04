import * as fs from "node:fs";
import { join } from "node:path";

export function* walk(_path) {
    //ファイル/ディレクトリの情報を取得し、ディレクトリなら中身を再帰的に探索
    const stats = fs.statSync(_path);

    if (stats.isDirectory()) {
        //ディレクトリの場合、そのパスをyieldで返す
        yield { path: _path, isDirectory: true };

        //次に呼び出されたとき、ここから再開
        //ディレクトリ内のファイル・サブディレクトリ情報を取得
        const entries = fs.readdirSync(_path);
        //各ファイル・サブディレクトリ情報に対して処理を行う
        for (const entry of entries) {
            //ファイル・サブディレクトリのフルパスを作成（相対パスだと問題あり）
            const full_path = join(_path, entry);
            //再帰的にwalkを呼び出す
            yield* walk(full_path);
        }
    } else if (stats.isFile()) {
        //ファイルの場合、そのパスをyieldで返す
        yield { path: _path, isDirectory: false };
    }
}

//const path_ = [];
//for (const p of walk("./ch12/ex06/test")) {
//    path_.push(p);
//    console.log(p);
//}