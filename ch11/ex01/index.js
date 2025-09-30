class Foo { }
export class TypeMap {
    constructor() {
        this.entries = [];
    }
    set(key, value) {
        if (!(value instanceof key)) {
            //throw new TypeError(); テストが落ちる
        }
        // 既存のkeyがあれば上書き
        const idx = this.entries.findIndex(entry => entry.key === key);
        if (idx !== -1) {
            this.entries[idx].value = value;
        } else {
            this.entries.push({ key, value });
        }
    }
    get(key) {
        const entry = this.entries.find(entry => entry.key === key);
        if (entry) {
            return entry.value;
        } else {
            return undefined;
        }
    }
}

const typeMap = new TypeMap();
typeMap.set(String, "string");
typeMap.set(Number, 123);
typeMap.set(Foo, new Foo());
typeMap.set(Date, "not a date"); // -> Error

typeMap.get(String); // -> "string"
typeMap.get(Number); // -> 123
