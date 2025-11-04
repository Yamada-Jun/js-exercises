import fs from "fs";

// 指定されたファイルパスを受け取り、そのファイルを改行コード \n の出現ごとに分割して返すジェネレータ関数
export function* readLines(filePath) {
    //fsモジュールのreadFileSyncで指定されたfilePathのファイルを読み込み文字列として取得
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    //data.split("\n")で、ファイル全体の文字列を改行\nごとに分割して各行の配列を作成
    const lines = data.split("\n");
    //各行を順番にyieldで返す
    for (const line of lines) {
        yield line;
    }
}


//let read_lines = readLines("./ch12/ex05/text.txt");
//console.log(read_lines.next().value);
//console.log(read_lines.next().value);
//console.log(read_lines.next().value);
//console.log(read_lines.next().value);
//console.log(read_lines.next().value);