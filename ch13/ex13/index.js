import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

export async function* walk(_path) {
    const stats = await stat(_path);

    if (stats.isDirectory()) {
        yield { path: _path, isDirectory: true };

        const entries = await readdir(_path);
        for (const entry of entries) {
            const full_path = join(_path, entry);
            // 再帰的に非同期ジェネレータの値をyield
            yield* walk(full_path);
        }
    } else if (stats.isFile()) {
        yield { path: _path, isDirectory: false };
    }
}

//// 利用例
//(async () => {
//    // カレントディレクトリ (.) のファイル・フォルダを再帰的に取得し表示する
//    for await (const elem of walk("./ch12/ex06/test")) {
//        console.log(elem);
//    }

//    // NOTE: walk に与えたパスが以下のようなディレクトリ・ファイルを持つ時を考える
//    // .
//    // ├── A
//    // ├── B
//    // │   └── C
//    // │       └── buz.txt
//    // └── foo.txt
//    //
//    // この気 `walk` は以下を返す (順序は任意):
//    // - { path: "A", isDirectory: true }
//    // - { path: "B", isDirectory: true }
//    // - { path: "B/C", isDirectory: true }
//    // - { path: "B/C/buz.txt", isDirectory: false }
//    // - { path: "foo.txt", isDirectory: false }
//})();
