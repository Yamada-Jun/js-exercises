const data = [
    { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
    { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
    { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
    { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
    { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
    { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
    { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
    { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
    { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];


// 1.mathの全員の合計点
console.log(data.reduce((x, y) => x + y.math, 0)); // => 530

// 2.クラスAのchemistryの平均点
let sum = data.reduce((x, y) => x + y.chemistry, 0);
console.log(sum / data.length); // => 49.4444444444


// 3.3科目合計点のクラスC内での平均点
let sum_class_c = 0;
data.forEach(sutudent => {
    if (sutudent.class === "C") {
        sum_class_c += (sutudent.math + sutudent.chemistry + sutudent.geography);
    }
});
console.log(sum_class_c); // => 530

// 4.3科目合計点が最も高い人のname
let sum_all = 0;
let name = "";
data.forEach(sutudent => {
    if (sum_all < (sutudent.math + sutudent.chemistry + sutudent.geography))
    {
        sum_all = sutudent.math + sutudent.chemistry + sutudent.geography;
        name = sutudent.name;
    }
});
console.log(name); // => Frank

// 5.全体のgeographyの標準偏差
// 平均を求める
let mean = data.reduce((sum, val) => sum + val.geography, 0) / data.length;
console.log(mean);
// 各値と平均の差の二乗を求める
let diffs = data.map(val => {
    let diff = val.geography - mean;
    return diff * diff;
});
console.log(diffs);
// 分散（二乗の平均を求める）
let variance = diffs.reduce((sum, val) => sum + val, 0) / data.length;
// 分散の平方根が標準偏差
console.log(Math.sqrt(variance));   // => 22.3330569358242



