import { convertTextByIfElse, convertTextBySwitch } from "./index.js";

test("ch05-ex02", () => {
    expect(convertTextByIfElse("aa0a")).toStrictEqual("aa\0a");
    expect(convertTextBySwitch("aa0a")).toStrictEqual("aa\0a");
    expect(convertTextByIfElse("aaba")).toStrictEqual("aa\ba");
    expect(convertTextBySwitch("aaba")).toStrictEqual("aa\ba");
    expect(convertTextByIfElse("aata")).toStrictEqual("aa\ta");
    expect(convertTextBySwitch("aata")).toStrictEqual("aa\ta");
    expect(convertTextByIfElse("aana")).toStrictEqual("aa\na");
    expect(convertTextBySwitch("aana")).toStrictEqual("aa\na");
    expect(convertTextByIfElse("aava")).toStrictEqual("aa\va");
    expect(convertTextBySwitch("aava")).toStrictEqual("aa\va");
    expect(convertTextByIfElse("aafa")).toStrictEqual("aa\fa");
    expect(convertTextBySwitch("aafa")).toStrictEqual("aa\fa");
    expect(convertTextByIfElse("aara")).toStrictEqual("aa\ra");
    expect(convertTextBySwitch("aara")).toStrictEqual("aa\ra");
    expect(convertTextByIfElse('aa"a')).toStrictEqual('aa\"a');
    expect(convertTextBySwitch('aa"a')).toStrictEqual('aa\"a');
    expect(convertTextByIfElse("aa'a")).toStrictEqual("aa\'a");
    expect(convertTextBySwitch("aa'a")).toStrictEqual("aa\'a");
    expect(convertTextBySwitch("aa\\a")).toStrictEqual("aa\\\\a");
    expect(convertTextByIfElse("aa\\a")).toStrictEqual("aa\\\\a");
    expect(convertTextByIfElse(`aa0aaa0aaabaaataaanaaavaaafaaaraaa"aaa'aaa\\aaa\\a`)).toStrictEqual(`aa\0aaa\0aaa\baaa\taaa\naaa\vaaa\faaa\raaa\"aaa\'aaa\\\\aaa\\\\a`);
    expect(convertTextBySwitch(`aa0aaa0aaabaaataaanaaavaaafaaaraaa"aaa'aaa\\aaa\\a`)).toStrictEqual(`aa\0aaa\0aaa\baaa\taaa\naaa\vaaa\faaa\raaa\"aaa\'aaa\\\\aaa\\\\a`);
});
