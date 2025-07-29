import { newHashTable } from "./index.js";



test("ch06-ex06", () => {
    const hashTable = newHashTable(10);
    hashTable.put("key1", "value1");
    hashTable.put("key2", { value: "value2" });

    expect(hashTable.size).toBe(2);
    expect(hashTable.get("key1")).toBe("value1");
    expect(JSON.stringify(hashTable.get("key2"))).toBe('{"value":"value2"}');

    hashTable.remove("key2");

    expect(hashTable.get("key2")).toBe(undefined);
    expect(hashTable.size).toBe(1);
});
