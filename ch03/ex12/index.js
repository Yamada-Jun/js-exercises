class Example {
    valueOf() {
        return 123;
    }

    toString() {
        return "Example";
    }
}

console.log(Number(new Example())); //�����I�Ȍ^�ϊ�
console.log(String(new Example())); //�����I�Ȍ^�ϊ�
