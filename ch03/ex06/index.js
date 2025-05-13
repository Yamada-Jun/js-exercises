export function slice(str, indexStart, indexEnd) {
    let at_result = "";
    let at_indexStart = 0;
    let at_indexEnd = str.length;

    //第一引数以降がないならstrを返す
    if (indexStart === undefined) {
        at_result = str;
    }
    else if (indexEnd === undefined) {
        //第二引数がない場合
        if (indexStart >= 0) {
            at_indexStart = Math.trunc(indexStart);//小数部の桁を取り除く
        } else {
            at_indexStart = str.length + Math.trunc(indexStart);//小数部の桁を取り除く

        }
        for (let i = 0; i < str.length; i++) {
            if (i >= at_indexStart && i < at_indexEnd) {
                at_result += str[i];
            }
        }
    } else {
        at_indexStart = Math.trunc(indexStart);//小数部の桁を取り除く
        at_indexEnd = Math.trunc(indexEnd);//小数部の桁を取り除く

        //NaNは0と同じ扱い
        if (isNaN(indexStart)) {
            at_indexStart = 0;
        }
        if (isNaN(indexEnd)) {
            at_indexEnd = 0;
        }

        for (let i = 0; i < str.length; i++) {
            if (at_indexStart >= 0 && at_indexEnd > 0) {
                if (i >= at_indexStart && i < at_indexEnd) {
                    at_result += str[i];
                }
            } else if (at_indexStart < 0 && at_indexEnd > 0) {
                if (i >= str.length + at_indexStart && i < at_indexEnd) {
                    at_result += str[i];
                }
            } else if (at_indexStart >= 0 && at_indexEnd < 0) {
                if (i >= at_indexStart && i < str.length + at_indexEnd) {
                    at_result += str[i];
                }
            } else if (at_indexStart < 0 && at_indexEnd < 0) {
                if (i >= str.length + at_indexStart && i < str.length + at_indexEnd) {
                    at_result += str[i];
                }
            }
        }
    }
    return at_result;
}
