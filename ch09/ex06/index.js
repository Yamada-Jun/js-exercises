export class TypedMapCompo {
    constructor(keyType, valueType, entries) {
        // entries が指定されている場合、型をチェックする。
        if (entries) {
            for (let [k, v] of entries) {
                if (typeof k !== keyType || typeof v !== valueType) {
                    throw new TypeError('Wrong type for entry [${k}, $(v}]');
                }
            }
        }

        //(型チェックされた)entriesを使って、Mapクラスのインスタンスを初期化する。
        if (this.map === undefined) {
            this.map = new Map(entries);
        }

        // 次に、型を保存して、サブクラスを初期化する。
        this.keyType = keyType;
        this.valueType = valueType;
    }

    // set()メソッドを再定義して、マップに追加されるキーと値のペアに対して
    // 型チェックを行うようにする。
    set(key, value) {
        // keyやvalueの型が異なっている場合は、エラーをスローする。
        if (this.keyType && typeof key !== this.keyType) {
            throw new TypeError('${key} is not of type ${this. keyType}');
        }
        if (this.valueType && typeof value !== this.valueType) {
            throw new TypeError('${value} is not of type ${this.valueType}');
        }
        // 型が正しい場合、Mapクラスのインスタンスのset()メソッドを呼び出し、
        // エントリをマップに追加する。Mapクラスのインスタンスから返されたものを
        // そのまま返す。
        return this.map.set(key, value);
    }

    // get()メソッドを再定義
    get(key) {
        return this.map.get(key);
    }
    // sizeを再定義
    get size() {
        return this.map.size;
    }
}

//const map = new TypedMap("string", "number", [["one", 1], ["two", 2]]);
//console.log(map.get("one"));
//console.log(map.get("two"));

export class TypedMapOrig extends Map {
    constructor(keyType, valueType, entries) {
        // entries が指定されている場合、型をチェックする。
        if (entries) {
            for (let [k, v] of entries) {
                if (typeof k !== keyType || typeof v !== valueType) {
                    throw new TypeError('Wrong type for entry [${k}, $(v}]');
                }
            }
        }

        //(型チェックされた)entriesを使って、スーパークラスを初期化する。
        super(entries);

        // 次に、型を保存して、サブクラスを初期化する。
        this.keyType = keyType;
        this.valueType = valueType;
    }

    // set()メソッドを再定義して、マップに追加されるキーと値のペアに対して
    // 型チェックを行うようにする。
    set(key, value) {
        // keyやvalueの型が異なっている場合は、エラーをスローする。
        if (this.keyType && typeof key !== this.keyType) {
            throw new TypeError('${key} is not of type ${this. keyType}');
        }
        if (this.valueType && typeof value !== this.valueType) {
            throw new TypeError('${value} is not of type ${this.valueType}');
        }
        // 型が正しい場合、スーパークラスのset()メソッドを呼び出し、
        // エントリをマップに追加する。スーパークラスから返されたものを
        // そのまま返す。
        return super.set(key, value);
    }
}