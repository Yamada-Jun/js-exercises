### npm
- node package managerの略
- Node.js のための標準的なパッケージ管理システム
- パッケージの管理（package.json、node_modules）、パッケージ間の依存関係の解決を行う

### npx
- node package executerの略
- ローカルにインストールしたパッケージのコマンドを実行するためのツール
- インストールされてないパッケージでも自動的に探してインストールして、実行後にインストールしたパッケージを削除する
- 実行後に削除されるため、1度だけしか使わないコマンドなどについて、package.json、node_modulesなど環境を汚さずにコマンドが実行できることが利点
- 参考：https://qiita.com/kohta9521/items/ee3ed4a2360add80ad79