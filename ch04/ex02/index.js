for (let i = 1; i < 101; i++) {
    let result;
    if (i % 15) {
        if (i % 3) {
            if (i % 5) {
                result = i
            }
            else {
                result = "Buzz"
            }
        } else {
            result = "Fizz"
        }
    } else {
        result = "FizzBuzz"
    }
        
    console.log(result);
}
