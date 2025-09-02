
const password = "abc";
function f(input) {
    const f = new Function(`return "Hello, " + ${input}`);
    console.log(f());
}

// グローバルスコープにあるpassword変数を参照できてしまう
f(`"${password}"`);
