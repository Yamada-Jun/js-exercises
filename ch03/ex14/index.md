### letの場合
0～9が出力された後、8行目のconsole.log(i)で、"iは定義されていない"とエラーになる。
letの場合、ブロックスコープなので、ブロックの外でiを参照すると、そのスコープにiは定義されていないのでエラーになってしまう。
```
PS C:\Projects\js-exercises> node ch03/ex14
0
1
2
3
4
5
6
7
8
9
file:///C:/Projects/js-exercises/ch03/ex14/index.js:8
console.log(i);
            ^

ReferenceError: i is not defined
    at file:///C:/Projects/js-exercises/ch03/ex14/index.js:8:13
    at ModuleJob.run (node:internal/modules/esm/module_job:271:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:547:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)
```
```javascript
/* eslint-disable */
for (let i = 0; i < 10; i++) {
  (function () {
    let i = 100;
  })();
  console.log(i); //0～9を出力
}
console.log(i); //iは定義されていないためエラー
```

### 全ての let を var に変えた場合
8行目でエラーにはならず、0～10が順番に出力される。
関数の外で定義した変数はグローバル変数になる
異なるのでiは100にはならない。
```
PS C:\Projects\js-exercises> node ch03/ex14
0
1
2
3
4
5
6
7
8
9
10
```

```javascript
/* eslint-disable */
for (var i = 0; i < 10; i++) {  //for文のiはグローバル変数になる
  (function () {
    var i = 100;    //varの場合は再定義が可能。このiはfor文のiとは別の変数となる
  })();
  console.log(i);
}
console.log(i);  //for文のiはグローバル変数なので、ここで参照される
```

### 全ての let を消した場合 (非 strict モードでのみ実行可能) 
iがグローバル変数になるので関数の中でiは100になる。
インクリメントした後に、条件式判定がありループからすぐ抜けてしまう。
101になってからforを抜けるため、100、101が順番に出力される。
```
PS C:\Projects\js-exercises> node ch03/ex14
100
101
```

```javascript
/* eslint-disable */
for (i = 0; i < 10; i++) {
  (function () {
    i = 100;        //iがグローバル変数になるので関数の中でiは100になる
  })();
  console.log(i);   //100を出力し、インクリメントしてから条件式判定してforループから抜ける
}
console.log(i);     //101を出力。iはグローバル変数なので、forループのiと同じiになるため
```
