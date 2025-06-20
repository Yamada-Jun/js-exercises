## Node で debugger 文を使ってデバッグする方法
### Chrome DevTools を使用してデバッグする
1. Chromeを起動し、アドレスバーにchrome://inspectを入力する。
Node.js をデバッグモードで起動するには、以下のコマンドを使用する。
```bash
node --inspect-brk ch05/ex11/index.js
```
1. 上記のコマンドで Node.js を起動すると、自動的に認識されるので、出てきたinspectのリンクをクリックする。
1. Chrome DevTools が開き、Node.js のコードをデバッグできる。
1. ブレークポイントを設定したり、変数の値を確認したり、ステップ実行が可能となる。

### Visual Studio Code を使用してデバッグする
1. VSCode を開き、左側の「実行とデバッグ」を押す。
1. 「実行とデバッグ」をクリックし、Node.js を選択する。
1. デバッグが始まり、ブレークポイントを設定したり、変数の値を確認したり、ステップ実行が可能となる。
