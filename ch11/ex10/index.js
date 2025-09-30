export function getDayNumber(year, month) {
    if (year === undefined || month === undefined) {
        throw new Error("第一引数に年を、第二引数に月を設定してください");
    }
    if (year < 1970 || year > 275760) {
        throw new Error("year は 1970 から 275760 の間に設定してください");
    }
    if (month < 1 || month > 12) {
        throw new Error("month は 1 から 12 の間に設定してください");
    }
    let d = new Date(year, month - 1, 1);
    // 28日後の月が変わっていたら28日
    d.setDate(d.getDate() + 28);
    if (d.getMonth() !== month - 1) {
        return 28;
    }
    // 29日後の月が変わっていたら29日
    d.setDate(d.getDate() + 1);
    if (d.getMonth() !== month - 1) {
        return 29;
    }
    // 30日後の月が変わっていたら30日
    d.setDate(d.getDate() + 1);
    if (d.getMonth() !== month - 1) {
        return 30;
    }
    // それ以外なら31日
    return 31;
}

//console.log(getDayNumber());


export function getWeekdayNum(start_date, end_date) {
    let start = new Date(start_date);
    let end = new Date(end_date);
    // 開始日と終了日が逆の場合は入れ替え
    if (start > end) {
        start = new Date(end_date);
        end = new Date(start_date);
    }
    let result = 0;
    let now_date = new Date(start);
    while (now_date <= end) {
        const day = now_date.getDay();
        if (day !== 0 && day !== 6) { // 0: 日曜日, 6: 土曜日
            result++;
        }
        now_date.setDate(now_date.getDate() + 1);
    }
    return result;
}

export function getWeekdayName(date_str, local) {
    const date = new Date(date_str);
    // 曜日を長い形式で取得
    const options = {
        weekday: "long"
    };
    return date.toLocaleDateString(local, options);
}


export function getFirstDayOfLastMonth(now_str) {
    const date = new Date(now_str);
    // 日数分の時間を引いて先月末日にする
    const date_2 = new Date(date.getTime() - (date.getDate() + 1) * 24 * 60 * 60 * 1000);
    //console.log(month_first);
    // その月の1日を作る
    const result = new Date(date_2.getTime() - (date_2.getDate() - 1) * 24 * 60 * 60 * 1000);
    return result;
}

//console.log(getFirstDayOfLastMonth("2024-01-15"));
