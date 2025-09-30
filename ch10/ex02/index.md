### AMD（Asynchronous Module Definition）

- 使用例：define(['dep'], function(dep) { ... })
- 主にブラウザ向け、非同期読み込みに対応
- ライブラリ：RequireJS

### UMD（Universal Module Definition）

- 使用例：CJS, AMD, グローバル変数のすべてに対応
- ライブラリやツールでよく使われる
- 目的：どの環境でも動作するようにする

### SystemJS

- 使用例：System.import()
- ES Modulesのポリフィルとして登場
- 柔軟なモジュールローダー

### IIFE（Immediately Invoked Function Expression）

- 使用例：(function() { ... })();
- モジュールというより、名前空間汚染を防ぐためのパターン
- 古いコードベースでよく見られる