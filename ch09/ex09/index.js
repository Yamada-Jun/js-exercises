//リスコフの置換原則を満たさない例
class RectangleNg {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
}

class SquareNg extends RectangleNg {
    setWidth(width) {
        this.width = width;
        this.height = width; // 正方形なので高さも変更
    }

    setHeight(height) {
        this.height = height;
        this.width = height; // 正方形なので幅も変更
    }
}

// 使用例
const shape = new SquareNg();
shape.setWidth(5);
shape.setHeight(10); // 意図しない動作：幅も10になる
console.log(shape.getArea()); // 100（本来は50を期待）

//リスコフの置換原則を満たす例
class Shape {
    getArea() {
        throw new Error("getArea() must be implemented");
    }
}

class RectangleOk extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
}

class SquareOk extends Shape {
    constructor(side) {
        super();
        this.side = side;
    }

    getArea() {
        return this.side * this.side;
    }
}

// 使用例
const rect = new RectangleOk(5, 10);
const square = new SquareOk(5);

console.log(rect.getArea());   // 50
console.log(square.getArea()); // 25