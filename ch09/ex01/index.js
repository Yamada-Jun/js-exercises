export class C {
    //1を返すクラスメソッドを定義
    static method() {
        return 1;
    }
    //2を返すインスタンスメソッドを定義
    method() {
        return 2;
    }
    static C = class {
        //3を返すクラスメソッドを定義
        static method() {
            return 3;
        }
        //4を返すインスタンスメソッドを定義
        method() {
            return 4;
        }
    };

    C = class {
        //5を返すクラスメソッドを定義
        static method() {
            return 5;
        }
        //6を返すインスタンスメソッドを定義
        method() {
            return 6;
        }
    };
}