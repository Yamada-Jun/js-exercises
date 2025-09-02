### 予想
false, true
false, true
アロー演算子を使っても、`this`の値は変わらないと考えた。

### 結果
```javascript
const obj = {
    om: function () {
        const nest = {
            nm: function () {
                console.log(this === obj, this === nest);
            },
            arrow: () => {
                console.log(this === obj, this === nest);
            },
        };
        nest.nm();
        nest.arrow();
    },
};
obj.om();
```
false, true
true, falseとなる

### 解説
`this`の値は、関数がどのように呼び出されたかによって決まる。`nest.nm()`では、`this`はその関数を呼び出したオブジェクトを指す。一方、アロー関数では、`this`は定義されたスコープの`this`を継承する。
よって、`nest.nm()`を呼び出すと、`this`は`obj`を指し、`nest`を指さない。しかし、アロー関数である`nest.arrow()`を呼び出すと、`this`は定義されたスコープの`this`を継承するため、`obj`を指す。


