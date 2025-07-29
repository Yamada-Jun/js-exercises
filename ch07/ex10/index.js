export function makeFixedSizeArray(size) {
    const array = new Array(size);
    return {
        get(index) {
            if (index < 0 || array.length <= index) {
                throw new Error(`Array index out of range: ${index}`);
            }
            return array[index];
        },
        set(index, value) {
            if (index < 0 || array.length <= index) {
                throw new Error(`Array index out of range: ${index}`);
            }
            array[index] = value;
        },
        length() {
            return array.length;
        },
    };
}

export class DynamicSizeArray {
    static INITIAL_SIZE = 4; // 初期サイズ

    constructor() {
        this.len = 0;
        this.array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE);
    }
    get(index) {
        if (index < 0 || this.array.length <= index) {
            throw new Error(`Array index out of range: ${index}`);
        }
        return this.array.get(index);
    }
    set(index, value) {
        if (index < 0 || this.array.length <= index) {
            throw new Error(`Array index out of range: ${index}`);
        }
        this.array.set(index, value);
    }
    length() {
        return this.len;
    }
    push(value) {
        // this.array に空が無い場合は「再配置」を行う
        if (this.len >= this.array.length()) {
            // 新しい固定長配列を作成
            const old = this.array;
            this.array = makeFixedSizeArray(old.length() * 2);
            // 古い配列 (old) の要素を新しい配列にコピー
            for (let i = 0; i < old.length(); i++) {
                this.array.set(i, old.get(i));
            }
        }
        // 値をセット
        this.array.set(this.len, value);
        // 長さ+1
        this.len++;
    }
}

//let ary = new DynamicSizeArray();
//ary.push(1);
////console.log(ary);
//console.log(ary.get(0));
//ary.push(2);
//ary.push(3);
//ary.push(4);
//ary.push(5);

////console.log(ary);
////console.log(ary.length);
//console.log(ary.get(0));
//console.log(ary.get(1));
//console.log(ary.get(2));
//console.log(ary.get(3));
//console.log(ary.get(4));
//console.log(ary.length());