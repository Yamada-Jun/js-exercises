
## グローバルオブジェクトを参照する方法
- ブラウザ: window
- Node.js: global
- 共通: globalThis

## ブラウザと node のグローバルオブジェクトのプロパティやメソッドを比較し、ブラウザ独自のものを 10 程度
### ブラウザ独自のグローバルオブジェクトのプロパティやメソッド
- alert()
- confirm()
- documentオブジェクト
- locationオブジェクト
- navigatorオブジェクト
- historyオブジェクト
- prompt()
- fetch()
- localStorage / sessionStorage
- setTimeout() / setInterval()

### Node.js独自のプロパティ・メソッド
- process（環境変数や実行情報）
- require()（モジュール読み込み）
- __dirname / __filename（現在のファイルパス）
- Buffer（バイナリデータ操作）
- setImmediate()（非同期処理）

## グローバルオブジェクトに undefined が定義されていることを確認し、過去の ES 仕様でどのような問題が発生していたか
- 環境ごとに異なるコードを書く必要があった。
- そのため、下記のようなコードがよく書かれていた。
```javascript

var g = (typeof window !== 'undefined') ? window :  //window が存在すればそれを使う
        (typeof global !== 'undefined') ? global :  //global が存在すればそれを使う
        (typeof self !== 'undefined') ? self :      //self が存在すればそれを使う
        this;                                       //どれも存在しなければ this を使う

```