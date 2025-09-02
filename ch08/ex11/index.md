### 組み込み関数の toString() の出力内容
JavaScriptエンジンによって内部的に実装されている「ネイティブコード」のため、ソースコードは表示されない
```
function max() { [native code] }
```
### 自作関数の toString() の出力内容
関数のソースコードを返す
```
function(x, y, z) {
        return this.a + this.b + this.c + x + y + z;
    }
```