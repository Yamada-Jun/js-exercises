//JavaScript の整数の最大値と最小値をコンソールに出力
console.log(Number.MAX_VALUE);          // => 1.7976931348623157e+308
console.log(Number.MIN_VALUE);          // => 5e-324

//最大値+1 をコンソールに出力
console.log(Number.MAX_VALUE + 1);      // => 1.7976931348623157e+308

//最大値+1 と最大値+2 を === で比較した結果をコンソールに出力
console.log((Number.MAX_VALUE + 1) === (Number.MAX_VALUE + 2));    // => true