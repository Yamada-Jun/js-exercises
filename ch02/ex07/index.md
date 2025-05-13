### 出力結果
```
0 1 0
1 1 0
```
### 考察
```javascript
let a = 0,
    b = 0;

const c
    =
    a
++ //インクリメントがbにかかる
    b

console.log(a, b, c); //0 1 0

const e = a++ //インクリメントがaにかかる
b;

console.log(a, b, e); //1 1 0

```
