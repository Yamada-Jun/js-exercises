###JavaScript の整数の最大値と最小値をコンソールに出力
```javascript
//JavaScript の整数の最大値と最小値をコンソールに出力
console.log(Number.MAX_VALUE);          // => 1.7976931348623157e+308
console.log(Number.MIN_VALUE);          // => 5e-324

//最大値+1 をコンソールに出力
console.log(Number.MAX_VALUE + 1);      // => 1.7976931348623157e+308

//最大値+1 と最大値+2 を === で比較した結果をコンソールに出力
console.log((Number.MAX_VALUE + 1) === (Number.MAX_VALUE + 2));    // => true
```

### 最大値+1 と最大値+2 を === で比較した結果がtrueになる理由
- `Number.MAX_SAFE_INTEGER`は`9007199254740991`であり、これに1を足すと`9007199254740992`になる
- `Number.MAX_SAFE_INTEGER`に2を足すと`9007199254740993`となるが、これは53ビットの仮数部で表現できる最大の整数を超えるため、JavaScriptでは`9007199254740992`と同じ値として扱われる