### tsc
- tscは下記の処理を行う。
1. 型チェック（静的解析）をして、コードに型のエラーが無いか確認する
1. TypeScriptのコードをJavaScriptに変換する
1. 必要に応じて、コード変換と同時に型定義ファイル（.d.tsファイル）の生成もする（ライブラリをTypeScriptで書く際などに行われる）
- ライブラリ配布ではtscがよい（.d.ts）

### @babel/preset-typescript
- @babel/preset-typescriptはtscの処理のうち
2. TypeScriptのコードをJavaScriptに変換する
のみを実施する
- アプリ開発ではBabelでビルドして、tsc --noEmit で型チェックがよい

- 参考 https://qiita.com/nacam403/items/edf3e2c8ff364aff910f