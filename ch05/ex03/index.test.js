import { convertTextByIf, convertTextBySwitch } from "./index.js";

test("ch05-ex03", () => {
    expect(convertTextByIf("Jan")).toStrictEqual(true);
    expect(convertTextByIf("Feb")).toStrictEqual(false);
    expect(convertTextByIf("Mar")).toStrictEqual(true);
    expect(convertTextByIf("Apr")).toStrictEqual(false);
    expect(convertTextByIf("May")).toStrictEqual(true);
    expect(convertTextByIf("Jun")).toStrictEqual(false);
    expect(convertTextByIf("Jul")).toStrictEqual(true);
    expect(convertTextByIf("Aug")).toStrictEqual(true);
    expect(convertTextByIf("Sep")).toStrictEqual(false);
    expect(convertTextByIf("Oct")).toStrictEqual(true);
    expect(convertTextByIf("Nov")).toStrictEqual(false);
    expect(convertTextByIf("Dec")).toStrictEqual(true);
    expect(convertTextBySwitch("Jan")).toStrictEqual(true);
    expect(convertTextBySwitch("Feb")).toStrictEqual(false);
    expect(convertTextBySwitch("Mar")).toStrictEqual(true);
    expect(convertTextBySwitch("Apr")).toStrictEqual(false);
    expect(convertTextBySwitch("May")).toStrictEqual(true);
    expect(convertTextBySwitch("Jun")).toStrictEqual(false);
    expect(convertTextBySwitch("Jul")).toStrictEqual(true);
    expect(convertTextBySwitch("Aug")).toStrictEqual(true);
    expect(convertTextBySwitch("Sep")).toStrictEqual(false);
    expect(convertTextBySwitch("Oct")).toStrictEqual(true);
    expect(convertTextBySwitch("Nov")).toStrictEqual(false);
    expect(convertTextBySwitch("Dec")).toStrictEqual(true);
});
