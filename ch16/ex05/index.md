## 用語
### 標準入出力
- Unix/Linux系OSやプログラミングでプログラムの入出力を扱う基本概念
### 標準入力(stdin)
- 通常はキーボードからの入力を指すが、ファイルや他のプログラムからの入力も可能
- ファイルディスクリプタ0に対応
- 使い方
```
node cat.mjs < input.txt
```
### 標準出力(stdout)
- 通常は画面への出力を指すが、ファイルや他のプログラムへの出力も可能
- ファイルディスクリプタ1に対応
- 使い方
```
node cat.mjs > output.txt
```
### 標準エラー出力(stderr)
- 通常はエラーメッセージの出力を指すが、ファイルや他のプログラムへの出力も可能
- ファイルディスクリプタ2に対応
- 使い方
```
node cat.mjs invalid-file 2> error.txt
```
### リダイレクト
- コマンドの入出力をファイルや他のコマンドに変更すること
- 「<」は標準入力のリダイレクト、「>」は標準出力のリダイレクト、「2>」は標準エラー出力のリダイレクトを表す

### パイプ
- 「|」の記号で表され、「|」記号の前のコマンドの出力を、「|」記号の後のコマンドの入力に渡すことを表す
- 引数として渡すわけではない

## 実験
``` cat.mjs
import fs from "fs";

if (process.argv.length > 2) {
	// node cat.js foo.txt といった形式ならばファイルを読み込み標準出力に出力する
	fs.createReadStream(process.argv[2]).pipe(process.stdout);
} else {
	// そうでなければ標準入力を標準出力に出力する
	process.stdin.pipe(process.stdout);
}
```
### 1.node cat.mjs
- process.argv.lengthは2なので、elseブロックが実行される
- 標準入力を標準出力に出力するので、キーボードからの入力がそのまま画面に表示される
### 2.echo FOO | node cat.mjs
- まず"echo FOO"の実行ところでechoにより標準出力にFOOが出力される
- パイプ「|」は前のコマンドの結果を次のコマンドに渡すものなので、echo FOOの出力がnode cat.mjsの標準入力に渡される
- これはnode cat.mjs FOOが実行されるということではなく、node cat.mjs（引数なし）が実行され、cat.mjsのelseブロックが実行された状態で、標準入力にFOOが渡されるということ
- elseブロックの処理は、標準入力(FOO)を標準出力に出力するので、FOOが画面に表示される
### 3.node cat.mjs > output.txt
- まず"node cat.mjs"が実行され、process.argv.lengthは2なので、elseブロックが実行される
- 「>」は出力先をファイルに変える記号
- elseブロックの処理は、標準入力を標準出力に出力するので、キーボードからの入力が標準出力ではなくoutput.txtに書き込まれる
### 4.node cat.mjs file
- process.argv.lengthは3なので、ifブロックが実行される
- ifブロックの処理は、ファイルを読み込み標準出力に出力するので、fileの内容が画面に表示される
### 5.node cat.mjs file > output.txt
- 4.の内容の出力先がoutput.txtに変わるので、fileの内容がoutput.txtに書き込まれる（追記ではなく、上書きされた）
### 6.node cat.mjs invalid-file > output.txt
- process.argv.lengthは3なので、ifブロックが実行される
- ifブロックの処理で、invalid-fileは存在しないファイルなので、fs.createReadStreamでエラーが発生する
- fs.createReadStreamのエラーは標準エラー出力に出力されるため、標準出力には何も出力されず、pipeにundefinedが渡されることになる
- その結果、output.txtが空のテキストになる
### 7.node cat.mjs invalid-file 2> error.txt
- 6.との違いは、2>の部分
- 「2>」はエラーの出力先をファイルに変える記号
- よって、6で画面表示さたfs.createReadStreamのエラーの内容がerror.txtに書き込まれる