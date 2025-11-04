export function* ResetCounter() {
    let count = 0;
    while (true) {
        try {
            yield count++;
        } catch (e) {
            // 例外が飛んできたらリセット
            // 次のyieldに行くまで処理が続くので0になるように-1としておく
            count = -1;
        }
    }
}



//const counter = ResetCounter();

//console.log(counter.next().value); // 0
//console.log(counter.next().value); // 1
//console.log(counter.next().value); // 2

//counter.throw(); // リセット

//console.log(counter.next().value); // 0
//console.log(counter.next().value); // 1