class Example {
    valueOf() {
        return 123;
    }

    toString() {
        return "Example";
    }
}

console.log(Number(new Example())); //明示的な型変換
console.log(String(new Example())); //明示的な型変換
