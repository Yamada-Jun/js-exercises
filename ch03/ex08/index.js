console.log(Number(true));      // => 1
console.log(Number(1234));      // => 1234
console.log(Number("text"));    // => NaN (tが数値ではないのでNaNになる)
console.log(Boolean(1234));     // => true (0以外の数値はtrueになる)
console.log(Boolean(0));        // => false(0はfalseになる)
console.log(String(true));      // => true
console.log(String(1234));      // => 1234
console.log(parseInt("12,742 km：地球の直径"));  // => 12
console.log(parseFloat("1.618：黄金比"));        // => 1.618

