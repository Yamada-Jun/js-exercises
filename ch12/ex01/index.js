function counterIter(max) {
    console.log("counterIter");
    let c = 1;
    return {
        [Symbol.iterator]() {
            console.log("counterIter: Symbol.iterator");
            return this;
        },
        next() {
            console.log("counterIter: next");
            if (c >= max + 1) {
                return { value: undefined, done: true };
            }
            const value = c;
            c++;
            return { value, done: false };
        },
        return(value) {
            console.log("counterIter: return:", value);
            return { value, done: true };
        },
        throw(e) {
            console.log("counterIter: throw:", e);
            throw e;
        },
    };
}

function* counterGen(max) {
    console.log("counterGen");
    try {
        for (let c = 1; c <= max; c++) {
            console.log("counterGen: next");
            yield c;
        }
    } catch (e) {
        console.log("counterGen: catch:", e);
        throw e;
    } finally {
        console.log("counterGen: finally");
    }
}

//明示的にイテレータプロトコルの next() を呼び出す
//counterIterに対して
const it_it = counterIter(3); // -> counterIter
it_it.next(); // ->counterIter: next
it_it.next(); // ->counterIter: next
it_it.next(); // ->counterIter: next
it_it.next(); // ->counterIter: next

console.log("-----");

//counterGenに対して
const it_gen = counterGen(3); // -> ""
it_gen.next(); // -> counterGen \n counterGen: next
it_gen.next(); // ->counterGen: next
it_gen.next(); // ->counterGen: next
it_gen.next(); // ->counterGen: finally

console.log("-----");

//明示的にイテレータプロトコルの return () を呼び出す
//counterIterに対して
const it_it_re = counterIter(3); // -> counterIter
it_it_re.return(); // -> counterIter: return: undefined
it_it_re.return(); // -> counterIter: return: undefined

console.log("-----");

//counterGenに対して
const it_re_gen = counterGen(3); // -> ""
it_re_gen.return(); // -> ""
it_re_gen.return(); // -> ""


console.log("-----");

//明示的にイテレータプロトコルの throw () を呼び出す
//counterIterに対して
const it_it_th = counterIter(3);
//it_it_th.throw();
console.log("-----");

//counterGenに対して
const it_gen_th = counterGen(3);
//it_gen_th.throw();
console.log("-----");

//for-of ループを実行
//counterIterに対して
const it = counterIter(5);
for (const value of it) {
    console.log(value);
}
console.log("-----");
//counterGenに対して
const it_gen_ = counterGen(5);
for (const value of it_gen_) {
    console.log(value);
}
console.log("-----");

//for-of ループを実行途中で break
//counterIterに対して
const it_b = counterIter(5);
for (const value of it_b) {
    console.log(value);
    if (value === 2) {
        break;
    }
}
console.log("-----");
//counterGenに対して
const it_b_gen = counterGen(5);
for (const value of it_b_gen) {
    console.log(value);
    if (value === 2) {
        break;
    }
}
console.log("-----");

//for-of ループを実行中に例外発生
//counterIterに対して
const it_t = counterIter(5);
for (const value of it_t) {
    console.log(value);
    if (value === 2) {
        throw new Error("例外発生");
    }
}
console.log("-----");
//counterGenに対して
const it_t_gen = counterGen(5);
for (const value of it_t_gen) {
    console.log(value);
    if (value === 2) {
        throw new Error("例外発生");
    }
}
