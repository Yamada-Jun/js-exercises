

function hash(key, capacity) { // 簡単なハッシュ関数（文字コードの合計）
    let hash = 0;
    for (let char of key) {
        hash += char.charCodeAt(0);
    }
    return hash % capacity;
}
export function newHashTable(capacity) {
    return {
        size: 0, // マッピング数を示すプロパティ
        _capacity: capacity,
        entries: new Array(capacity), // マッピングを格納する固定長の配列


        get(key) {
            // keyにマップされた値を取得する
            const index = hash(key, this._capacity); // ハッシュ関数
            return this.entries[index] ? this.entries[index][key] : undefined;
        },

        put(key, value) {
            // key, valueのマッピングを追加する(keyが存在する場合はvalueを上書きする)
            const index = hash(key, this._capacity); // ハッシュ関数
            if (!this.entries[index]) {
                this.entries[index] = {};
            }
            if (!this.entries[index][key]) { // 新しいキーを追加する場合のみサイズを増やす
                this.size++;
            }
            this.entries[index][key] = value;
        },

        remove(key) {
            // keyのマッピングを削除する
            const index = hash(key, this._capacity); // ハッシュ関数
            if (this.entries[index] && this.entries[index][key] !== undefined) {
                delete this.entries[index][key];
                this.size--;
            }
        },
    };
}

function sample() {
    const hashTable = newHashTable(10);
    hashTable.put("key1", "value1");
    hashTable.put("key2", { value: "value2" });

    console.log(`size=${hashTable.size}`); // => size=2
    console.log(`key1=${hashTable.get("key1")}`); // => key1=value1
    console.log(`key2=${JSON.stringify(hashTable.get("key2"))}`); // => key2={"value":"value2"}

    hashTable.put("key2", "new value");

    console.log(`key2=${hashTable.get("key2")}`); // => key2=new value

    hashTable.remove("key2");

    console.log(`key2=${hashTable.get("key2")}`); // => key2=undefined
    console.log(`size=${hashTable.size}`); // => size=1
}

//sample();