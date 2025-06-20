export function convertTextByIfElse(r_text) {

    let result = r_text;
    let is_convert_flag = false;
    for (const element of r_text) {
        if (element === "0") {
            result = result.replace("0", "\0");
        } else if (element === "b") {
            result = result.replace("b", "\b");
        } else if (element === "t") {
            result = result.replace("t", "\t");
        } else if (element === "n") {
            result = result.replace("n", "\n");
        } else if (element === "v") {
            result = result.replace("v", "\v");
        } else if (element === "f") {
            result = result.replace("f", "\f");
        } else if (element === "r") {
            result = result.replace("r", "\r");
        } else if (element === '"') {
            result = result.replace('"', '\"');
        } else if (element === "'") {
            result = result.replace("'", "\'");
        } else if (element === "\\") {
            if (!is_convert_flag) {
                result = result.split("\\").join("\\\\");
                is_convert_flag = true;
            }
        } 
    }
    return result;
}

export function convertTextBySwitch(r_text) {

    let result = r_text;
    let is_convert_flag = false;
    for (const element of r_text) {
        switch (element) {
            case "0":
                result = result.replace("0", "\0");
                break;
            case "b":
                result = result.replace("b", "\b");
                break;
            case "t":
                result = result.replace("t", "\t");
                break;
            case "n":
                result = result.replace("n", "\n");
                break;
            case "v":
                result = result.replace("v", "\v");
                break;
            case "f":
                result = result.replace("f", "\f");
                break;
            case "r":
                result = result.replace("r", "\r");
                break;
            case '"':
                result = result.replace('"', '\"');
                break;
            case "'":
                result = result.replace("'", "\'");
                break;
            case "\\":
                if (!is_convert_flag) {
                    result = result.split("\\").join("\\\\");
                    is_convert_flag = true;
                }
                break;
        }
    }
    return result;
}
