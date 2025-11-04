# 明示的にイテレータプロトコルの next() を呼び出す
## counterIterに対して
### 実行結果
``` javascript
const it_it = counterIter(3);	 // -> counterIter
it_it.next();					 // ->counterIter: next
it_it.next();					 // ->counterIter: next
it_it.next();					 // ->counterIter: next
it_it.next();					 // ->counterIter: next
```
### 動作の説明
const it_it = counterIter(3)では、counterIter関数が呼び出され、"counterIter"が出力される。
it_it.next()を呼び出すと、イテレータのnextが実行され、"counterIter: next"が出力される。
3回目の呼び出しで終了条件に達するが、console.logの出力は変化せず"counterIter: next"が出力される。
4回目も同様に"counterIter: next"が出力される。

## counterGenに対して
### 実行結果
``` javascript
const it_gen = counterGen(3);	 // -> ""
it_gen.next();					 // -> counterGen \n counterGen: next
it_gen.next();					 // ->counterGen: next
it_gen.next();					 // ->counterGen: next
it_gen.next();					 // ->counterGen: finally
```
### 動作の説明
const it_gen = counterGen(3)では、counterGen関数が呼び出されるが、最初のconsole.logは実行されない。
it_gen.next() を呼び出したときに、はじめて本体の処理が実行される。
4回目の呼び出しでforループから抜けて、finally内が実行される。

# 明示的にイテレータプロトコルの return() を呼び出す
## counterIterに対して
### 実行結果
``` javascript
const it_it_re = counterIter(3); // -> counterIter
it_it_re.return();				 // -> counterIter: return: undefined
it_it_re.return();				 // -> counterIter: return: undefined
```
### 動作の説明
const it_it_re = counterIter(3)では、counterIter関数が呼び出され、"counterIter"が出力される。
it_it_re.return()を呼び出すと、イテレータのreturnが実行され、"counterIter: return: undefined"が出力される。
valueはnext内でしか定義されていないため、undefinedが表示される。

## counterGenに対して
### 実行結果
``` javascript
const it_re_gen = counterGen(3); // -> ""
it_re_gen.return();				 // -> ""
it_re_gen.return();				 // -> ""
```
### 動作の説明
const it_re_gen = counterGen(3)では、counterGen関数が呼び出されるが、最初のconsole.logは実行されない。
it_re_gen.return()を呼び出すと、イテレータのreturnが実行されるが、この場合next()が一度も呼ばれていないため、本体の処理をスキップして即座に完了状態となり、その結果console.logは何も出力されない。

# 明示的にイテレータプロトコルの throw() を呼び出す
## counterIterに対して
### 実行結果
``` javascript
const it_it_th = counterIter(3); // -> counterIter
it_it_th.throw();				 // -> counterIter: throw: undefined
```
### 動作の説明
const it_it_th = counterIter(3)では、counterIter関数が呼び出され、"counterIter"が出力される。
it_it_th.throw()を呼び出すと、イテレータのthrowが実行され、"counterIter: throw: undefined"が出力される。
valueはnext内でしか定義されていないため、undefinedが表示される。
さらにthrowが呼ばれ例外が発生してプログラムが終了し、eはundefinedなためundefinedが表示される。

## counterGenに対して
### 実行結果
``` javascript
const it_gen_th = counterGen(3); // -> ""
it_gen_th.throw();				 // -> ""
```
### 動作の説明
const it_gen_th = counterGen(3)では、counterGen関数が呼び出されるが、最初のconsole.logは実行されない。
it_gen_th.throw()を呼び出すと、イテレータのthrowが実行されるが、この場合next()が一度も呼ばれていないため、本体の処理をスキップして即座に完了状態となり、その結果console.logは何も出力されない。

# for-of ループを実行
## counterIterに対して
### 実行結果
``` javascript
const it = counterIter(5);
for (const value of it) {
    console.log(value);
}
```
```
counterIter
counterIter: Symbol.iterator
counterIter: next
1
counterIter: next
2
counterIter: next
3
counterIter: next
4
counterIter: next
5
counterIter: next
```
### 動作の説明
const it = counterIter(5);では、counterIter関数が呼び出され、"counterIter"が出力される。
for (const value of it)では、Symbol.iteratorメソッドが呼び出され、"counterIter: Symbol.iterator"が出力される。
ループ内でit.next()が繰り返し呼び出され、"counterIter: next"が出力される。
その後で1から5までの値がそれぞれ出力される。
最後は終了条件に達して、"counterIter: next"が出力されて、{ value: undefined, done: true }オブジェクトが返されて終了する。

## counterGenに対して
### 実行結果
``` javascript
const it_gen_ = counterGen(5);
for (const value of it_gen_) {
    console.log(value);
}
```
```
counterGen
counterGen: next
1
counterGen: next
2
counterGen: next
3
counterGen: next
4
counterGen: next
5
counterGen: finally
```
### 動作の説明
const it_gen_ = counterGen(5);では、counterGen関数が呼び出されるが、最初のconsole.logは実行されない。
for (const value of it_gen_)では、ループ内でit_gen_.next()が繰り返し呼び出され、"counterGen: next"が出力される。
その後で1から5までの値がそれぞれ出力される。
最後は終了条件に達して、forループから抜けて、finally内が実行される。

# for-of ループを実行途中で break
## counterIterに対して
### 実行結果
``` javascript
const it_b = counterIter(5);
for (const value of it_b) {
    console.log(value);
    if (value === 2) {
        break;
    }
}
```
```
counterIter
counterIter: Symbol.iterator
counterIter: next
1
counterIter: next
2
counterIter: return: undefined
```
### 動作の説明
for-of ループを実行途中で breakした場合、イテレータの return()メソッドが呼び出される。
渡されてくるvalueはnext内でしか定義されていないため、undefinedが表示される。

## counterGenに対して
### 実行結果
``` javascript
const it_b_gen = counterGen(5);
for (const value of it_b_gen) {
    console.log(value);
    if (value === 2) {
        break;
    }
}
```
```
counterGen
counterGen: next
1
counterGen: next
2
counterGen: finally
```
### 動作の説明
for-of ループを実行途中で breakした場合、イテレータの return()メソッドが呼び出され、finally内が実行される。

# for-of ループを実行中に例外発生
## counterIterに対して
### 実行結果
``` javascript
const it_t = counterIter(5);
for (const value of it_t) {
    console.log(value);
    if (value === 2) {
        throw new Error("例外発生");
    }
}
```
```
counterIter
counterIter: Symbol.iterator
counterIter: next
1
counterIter: next
2
counterIter: return: undefined
file:///C:/Projects/js-exercises/ch12/ex01/index.js:71
        throw new Error("例外発生");
```
### 動作の説明
for-ofループ実行中に例外発生した場合、イテレータの return()メソッドが呼び出される。
渡されてくるvalueはnext内でしか定義されていないため、undefinedが表示される。
for-ofループは例外発生時にthrow()メソッドは呼ばない仕様となっている。
throw()は、明示的にiterator.throw()を呼んだときだけ実行されることとなる。

## counterGenに対して
### 実行結果
``` javascript
const it_t_gen = counterGen(5);
for (const value of it_t_gen) {
    console.log(value);
    if (value === 2) {
        throw new Error("例外発生");
    }
}

```
```
counterGen
counterGen: next
1
counterGen: next
2
counterGen: finally
file:///C:/Projects/js-exercises/ch12/ex01/index.js:50
        throw new Error("例外発生");
              ^

Error: 例外発生
```
### 動作の説明
for-ofループ実行中に例外発生した場合、イテレータの return()メソッドが呼び出され、finally内が実行される。
for-ofループは例外発生時にthrow()メソッドは呼ばない仕様となっている。