export function convertTextByIf(r_text) {

    let result = false;

    if (r_text == "Jan") {
        result = true;
    } else if (r_text == "Feb") {
        result = false;
    } else if (r_text == "Mar") {
        result = true;
    } else if (r_text == "Apr") {
        result = false;
    } else if (r_text == "May") {
        result = true;
    } else if (r_text == "Jun") {
        result = false;
    } else if (r_text == "Jul") {
        result = true;
    } else if (r_text == "Aug") {
        result = true;
    } else if (r_text == "Sep") {
        result = false;
    } else if (r_text == "Oct") {
        result = true;
    } else if (r_text == "Nov") {
        result = false;
    } else if (r_text == "Dec") {
        result = true;
    }
    return result;
}

export function convertTextBySwitch(r_text) {

    let result = false;

    switch (r_text) {
        case "Jan":
            result = true;
            break;
        case "Feb":
            result = false;
            break;
        case "Mar":
            result = true;
            break;
        case "Apr":
            result = false;
            break;
        case "May":
            result = true;
            break;
        case "Jun":
            result = false;
            break;
        case "Jul":
            result = true;
            break;
        case "Aug":
            result = true;
            break;
        case "Sep":
            result = false;
            break;
        case "Oct":
            result = true;
            break;
        case "Nov":
            result = false;
            break;
        case "Dec":
            result = true;
            break;
        default:
            result = true;
    }
    return result;
}

