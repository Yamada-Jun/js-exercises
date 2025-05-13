//正負の  Infinity と NaN で +, -, \*, / の計算を全ての組み合わせでして結果を見なさい。

console.log(Infinity + NaN);    // => NaN
console.log(Infinity - NaN);    // => NaN
console.log(Infinity * NaN);    // => NaN
console.log(Infinity / NaN);    // => NaN
console.log(- Infinity + NaN);  // => NaN
console.log(- Infinity - NaN);  // => NaN
console.log(- Infinity * NaN);  // => NaN
console.log(- Infinity / NaN);  // => NaN