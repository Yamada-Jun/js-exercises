import { getDayNumber, getWeekdayNum, getWeekdayName, getFirstDayOfLastMonth } from './index.js';

describe("ch11_ex10", () => {
    test("getDayNumber", () => {
        expect(getDayNumber(2024, 1)).toBe(31); // 1月
        expect(getDayNumber(2024, 2)).toBe(29); // 2月 (うるう年)
        expect(getDayNumber(2023, 2)).toBe(28); // 2月 (平年)
        expect(getDayNumber(2024, 3)).toBe(31); // 3月
        expect(getDayNumber(2024, 4)).toBe(30); // 4月
        expect(getDayNumber(2024, 5)).toBe(31); // 5月
        expect(getDayNumber(2024, 6)).toBe(30); // 6月
        expect(getDayNumber(2024, 7)).toBe(31); // 7月
        expect(getDayNumber(2024, 8)).toBe(31); // 8月
        expect(getDayNumber(2024, 9)).toBe(30); // 9月
        expect(getDayNumber(2024, 10)).toBe(31); // 10月
        expect(getDayNumber(2024, 11)).toBe(30); // 11月
        expect(getDayNumber(2024, 12)).toBe(31); // 12月

        // 引数がundefinedの場合
        expect(() => getDayNumber()).toThrow("第一引数に年を、第二引数に月を設定してください");
        expect(() => getDayNumber(2024)).toThrow("第一引数に年を、第二引数に月を設定してください");
        // yearの範囲外の場合
        expect(() => getDayNumber(1969, 1)).toThrow("year は 1970 から 275760 の間に設定してください");
        expect(() => getDayNumber(275761, 1)).toThrow("year は 1970 から 275760 の間に設定してください");
        // monthの範囲外の場合
        expect(() => getDayNumber(2024, 0)).toThrow("month は 1 から 12 の間に設定してください");
        expect(() => getDayNumber(2024, 13)).toThrow("month は 1 から 12 の間に設定してください");
    });

    test("getWeekdayNum", () => {
        expect(getWeekdayNum("2024-01-01", "2024-01-31")).toBe(23); // 1月
        expect(getWeekdayNum("2024-02-01", "2024-02-29")).toBe(21); // 2月 (うるう年)
        expect(getWeekdayNum("2023-02-01", "2023-02-28")).toBe(20); // 2月 (平年)
        expect(getWeekdayNum("2024-03-01", "2024-03-31")).toBe(21); // 3月
        expect(getWeekdayNum("2024-04-01", "2024-04-30")).toBe(22); // 4月
        expect(getWeekdayNum("2024-05-01", "2024-05-31")).toBe(23); // 5月
        expect(getWeekdayNum("2024-06-01", "2024-06-30")).toBe(20); // 6月
        expect(getWeekdayNum("2024-07-01", "2024-07-31")).toBe(23); // 7月
        expect(getWeekdayNum("2024-08-01", "2024-08-31")).toBe(22); // 8月
        expect(getWeekdayNum("2024-09-01", "2024-09-30")).toBe(21); // 9月
        expect(getWeekdayNum("2024-10-01", "2024-10-31")).toBe(23); // 10月
        expect(getWeekdayNum("2024-11-01", "2024-11-30")).toBe(21); // 11月
        expect(getWeekdayNum("2024-12-01", "2024-12-31")).toBe(22); // 12月
        // 開始日が終了日より後の場合
        expect(getWeekdayNum("2024-01-01", "2024-01-31")).toBe(23); // 1月
    });

    test("getWeekdayName", () => {
        expect(getWeekdayName("2024-01-01", "en-US")).toBe("Monday"); // 1月1日
        expect(getWeekdayName("2024-02-14", "en-US")).toBe("Wednesday"); // 2月14日
        expect(getWeekdayName("2024-03-17", "en-US")).toBe("Sunday"); // 3月17日
        expect(getWeekdayName("2024-04-01", "en-US")).toBe("Monday"); // 4月1日
        expect(getWeekdayName("2024-05-05", "en-US")).toBe("Sunday"); // 5月5日
        expect(getWeekdayName("2024-06-21", "en-US")).toBe("Friday"); // 6月21日
        expect(getWeekdayName("2024-06-21", "ja-JP")).toBe("金曜日"); // 6月21日
        expect(getWeekdayName("2024-07-04", "ja-JP")).toBe("木曜日"); // 7月4日
        expect(getWeekdayName("2024-08-15", "ja-JP")).toBe("木曜日"); // 8月15日
        expect(getWeekdayName("2024-09-02", "ja-JP")).toBe("月曜日"); // 9月2日
        expect(getWeekdayName("2024-10-31", "ja-JP")).toBe("木曜日"); // 10月31日
        expect(getWeekdayName("2024-11-28", "ja-JP")).toBe("木曜日"); // 11月28日
        expect(getWeekdayName("2024-12-25", "ja-JP")).toBe("水曜日"); // 12月25日
    });

    test("getFirstDayOfLastMonth", () => {
        expect(getFirstDayOfLastMonth("2024-01-15")).toEqual(new Date("2023-12-01")); // 1月
        expect(getFirstDayOfLastMonth("2024-02-15")).toEqual(new Date("2024-01-01")); // 2月
        expect(getFirstDayOfLastMonth("2024-03-15")).toEqual(new Date("2024-02-01")); // 3月
        expect(getFirstDayOfLastMonth("2024-04-15")).toEqual(new Date("2024-03-01")); // 4月
        expect(getFirstDayOfLastMonth("2024-05-15")).toEqual(new Date("2024-04-01")); // 5月
        expect(getFirstDayOfLastMonth("2024-06-15")).toEqual(new Date("2024-05-01")); // 6月
        expect(getFirstDayOfLastMonth("2024-07-15")).toEqual(new Date("2024-06-01")); // 7月
        expect(getFirstDayOfLastMonth("2024-08-15")).toEqual(new Date("2024-07-01")); // 8月
        expect(getFirstDayOfLastMonth("2024-09-15")).toEqual(new Date("2024-08-01")); // 9月
        expect(getFirstDayOfLastMonth("2024-10-15")).toEqual(new Date("2024-09-01")); // 10月
        expect(getFirstDayOfLastMonth("2024-11-15")).toEqual(new Date("2024-10-01")); // 11月
        expect(getFirstDayOfLastMonth("2024-12-15")).toEqual(new Date("2024-11-01")); // 12月
    });
});

