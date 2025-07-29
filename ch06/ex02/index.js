// オブジェクトリテラルで独自プロパティを持つオブジェクトを定義
let object1 = { x: 0, y: 0 };

// Object.create を使用してそのオブジェクトをプロトタイプとして持つ新しいオブジェクト生成
let object2 = Object.create(object1);

// Object.getPrototypeOf()を利用して、生成したオブジェクトのプロトタイプが Object.create で渡したオブジェクトになっていることを確認
console.log(Object.getPrototypeOf(object2) === object1); // =>true