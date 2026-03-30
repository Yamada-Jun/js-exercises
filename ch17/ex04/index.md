### package.json
- npm installを実行時、プロジェクトに必要なパッケージをインストールするために参照されるファイル
- 使いたいパッケージの種類やバージョンのざっくりした範囲を示す（キャレット（^）:メジャーバージョンまで固定 、 チルダ（~）:マイナーバージョンまで固定）

### package-lock.json
- npm ciを実行時、プロジェクトに必要なパッケージをインストールするために参照されるファイル（ci：clean install）
- 実際にインストールしたパッケージの正確なバージョンや依存関係を記録する
- 実際にインストールしたパッケージのバージョンに加え、そのパッケージが依存しているパッケージのバージョンも記録されている
- npm ciは必ずpackage-lock.jsonの内容通りにインストールするため、開発のチーム全員(CI/CD含む)が同じ依存環境を再現できる(理由1)
- package-lock.jsonがあれば、node_modulesをコミットせずに、過去のnode_modulesの状態を正確に再現可能(理由2)

### package-lock.jsonはリポジトリにコミットすべきか
- 上記理由1,2により、package-lock.jsonはリポジトリにコミットすべき


- 参考 https://qiita.com/whiskeyCheese/items/b9a72cdd0dba67c28b61