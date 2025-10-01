export function isEmailAddress(r) {
    // ここに実装する
    // nullまたはundefinedはfalseを返す
    if (r === null) {
        return false;
    }
    // 文字列であるか確認する
    if (typeof r !== "string") {
        return false;
    }
    // @で分割し、2つに分かれることを確認する
    const address = r.split("@");
    if (address.length !== 2) {
        return false;
    }
    // 前半部分とドメイン部分に分けて、それぞれの長さをテストコードの内容に従い確認する
    const first_part = address[0];
    const domain_part = address[1];
    if (first_part.length > 64 || domain_part.length > 252) {
        return false;
    }
    // 英数字や一部記号が1文字以上続く正規表現
    const pattern = "[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+";
    // ドットで区切られた前後が1つ以上続くパターンを作成（正規表現の中にドットを含めてしまうと先頭や末尾のドットと連続したドットも許可してしまうため）
    const test_pattern = new RegExp(`^${pattern}(\\.${pattern})*$`);
    if (!test_pattern.test(first_part) || !test_pattern.test(domain_part)) {
        return false;
    }
    // すべての確認を通過した場合はtrueを返す
    return true;
}