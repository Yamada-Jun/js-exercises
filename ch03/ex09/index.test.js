test("分割代入テスト", () => {
    let points = [{ x: 1, y: 2 }, { x: 3, y: 4 }];
    let [{ x : x1, y : y1 }, { x : x2, y: y2 }] = points;   //代入の左辺の名前をコードの中で使うことができる
    expect(x1).toBe(1);
    expect(y1).toBe(2);
    expect(x2).toBe(3);
    expect(y2).toBe(4);
});
