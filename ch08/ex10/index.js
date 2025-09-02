export function addMyCall(func) {
    func.myCall = function (this_, ...args) {   // this_は関数を呼び出すときのthis
        return func.bind(this_)(...args);       // bindでthisを設定し、引数を展開して関数を呼び出す
    };
}

// 例
const square = (n) => n * n;

addMyCall(square);

console.log(square.myCall(null, 5)); // 25

function Product(name, price) {
    this.name = name;
    this.price = price;
}

addMyCall(Product);

const that = {};
Product.myCall(that, "Apple", 100);
console.log(that); // { name: 'Apple', price: 100 }
