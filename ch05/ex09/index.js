export function convertJSONParse(r_text) {

    let result = { success: true };

    try {
        result.data = JSON.parse(r_text);
    }
    catch (error) {
        result.success = false;
        result.error = error.message;
    }
    finally {
        return result;
    }
}

console.log(convertJSONParse('{"name": "sample_user", "age": 30, "email": "user@example.com"}'));
console.log(convertJSONParse('{name: sample_user, age: 30, email: "user@example.com"}'));
