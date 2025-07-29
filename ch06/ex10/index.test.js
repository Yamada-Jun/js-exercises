const obj1 = {
    foo: Math.random(),
    bar: Math.random(),
};

const obj2 = {
    fizz: Math.random(),
    buzz: Math.random(),
};

const obj3 = {
    bar: Math.random(),
    buzz: Math.random(),
};

const num1 = Math.random();
const num2 = Math.random();

const arr1 = [Math.random(), Math.random(), Math.random()];
const arr2 = [Math.random(), Math.random()];

const obj = {
    num1: num1,
    num2: num2,
    foo: obj1.foo,
    bar: obj3.bar,
    fizz: obj2.fizz,
    buzz: obj2.buzz,
    arr: [arr1[0], arr1[1], arr1[2], num1, arr2[0], arr2[1]],
};

const answer = {
    num1,       // プロパティの簡略記法
    num2,       // プロパティの簡略記法
    ...obj1,    // obj1.foo, obj1.bar を展開
    ...obj3,    // obj3.barが obj1.bar を上書きする、obj3.buzz が展開される
    ...obj2,    // obj2.fizzが展開される、obj2.buzz がobj3.buzzを上書きする
    arr: [...arr1, num1, ...arr2],  // スプレッド演算子を使用して配列を展開

};

expect(answer).toEqual(obj);
