function fizzbuzz(n) {
    // 1からnまでの数値を配列に格納
    let data = Array.from({ length: n }, function(x, i) { return i + 1; });
    data.forEach(function(i) {
        if (i % 15 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    });
}

function sumOfSquaredDifference(f, g) {
    let result = 0;
    result = f.map((x, index) => (x - g[index]) ** 2); // => [ 9, 9, 9 ]
    result.reduce((x, y) => x + y, 0); // => 27
    return result;
}


function sumOfEvensIsLargerThan42(array) {
    let sum = 0;
    sum = array.filter(x => x % 2 === 0).reduce((a, b) => a + b, 0);
    return sum >= 42;

}

fizzbuzz(100);
console.log(sumOfSquaredDifference([1, 2, 3], [4, 5, 6])); // => 27
console.log(sumOfEvensIsLargerThan42([1, 2, 41, 39])); // => false
console.log(sumOfEvensIsLargerThan42([1, 2, 41, 40])); // => true