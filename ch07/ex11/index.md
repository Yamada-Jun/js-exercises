## 7.10 で作成した動的配列の push の平均時間計算量

オーダー記法でO(n)。
`push` を $`n`$ 回呼び出したとき、7.10 の実装では配列を倍々にしていくので再配置は $`log_2 n`$ 回発生する。
各再配置で要素のコピーは $`1, 2, 4, 8, ..., 2^{log_2 n}`$ 回発生する。
再配置の際にコピー回数の総和は $`2^0 + 2^1 + 2^2 + ... + 2^{log_2 n} = ...`$ 。
この値を $`n`$ で割ると、O(n)となるので `push` の平均時間計算量はO(n)。

## copyA の平均時間計算量

```javascript
function copyA(array) {
  const result = Array(array.length);       // O(n)
  for (let i = 0; i < array.length; i++) {  // O(n)
    result[i] = array[i];                   // O(1) × n回
  }
  return result;
}

```
オーダー記法でO(n)


## copyB の平均時間計算量

```javascript
function copyB(array) {
  const result = [];           // O(1)
  for (const v of array) {     // O(n)
    result.push(v);            // push を n回呼び出し
  }
  return result;
}

```
オーダー記法でO(n)。
理由は上記"7.10 で作成した動的配列の push の平均時間計算量と同じ