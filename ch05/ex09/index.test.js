import { convertJSONParse } from "./index.js";

test("ch05-ex09", () => {
    expect(convertJSONParse('{"name": "sample_user", "age": 30, "email": "user@example.com"}')).toStrictEqual({ success: true, data: { name: "sample_user", age: 30, email: "user@example.com" } });
    expect(convertJSONParse('{name: sample_user, age: 30, email: "user@example.com"}')).toStrictEqual({ success: false, error: "Expected property name or '}' in JSON at position 1 (line 1 column 2)" });
});
