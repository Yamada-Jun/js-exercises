class Example {
    valueOf() {
        return 123;
    }

    toString() {
        return "Example";
    }
}

console.log(Number(new Example())); //–¾Ž¦“I‚ÈŒ^•ÏŠ·
console.log(String(new Example())); //–¾Ž¦“I‚ÈŒ^•ÏŠ·
