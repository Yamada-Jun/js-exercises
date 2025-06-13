// このような関数は絶対に書いてはならない。
function set42(key) {
    eval(`${key} = 42;`);
}

// 例:
let hello;
set42("hello");
console.log(hello); // 42

// 下記のコードだと、処理が無限ループに入りプログラムが終了しなくなる
set42("; while(1){}//");

// 下記のコードだと、パスワードなどの重要な情報をコンソール出力させることができてしまう
set42("; console.log(password);	//");