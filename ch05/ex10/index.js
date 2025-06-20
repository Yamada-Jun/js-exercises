{
    let a = 1;
    let b = 2;
    let obj = { a: 3, b: 4 };
    with (obj) {
        a = b;
    }
    console.log({ a, b, obj });
    // console.log �̏o��: { a: 1, b: 2, obj: { a: 4, b: 4 }}
    // with �����g�킸�ɓ��������������ꍇ: obj.a = obj.b
}
{
    let a = 1;
    let b = 2;
    let obj = { b: 4 };
    with (obj) {
        a = b;
    }
    console.log({ a, b, obj });
}
{
    let a = 1;
    let b = 2;
    let obj = { a: 3 };
    with (obj) {
        a = b;
    }
    console.log({ a, b, obj });
}
{
    let a = 1;
    let b = 2;
    let obj = {};
    with (obj) {
        a = b;
    }
    console.log({ a, b, obj });
}

// with �����g�킸�ɓ��������������ꍇ
{
    let a = 1;
    let b = 2;
    let obj = { a: 3, b: 4 };
    obj.a = obj.b;
    console.log({ a, b, obj });
}
{
    let a = 1;
    let b = 2;
    let obj = { b: 4 };
    a = obj.b;
    console.log({ a, b, obj });
}
{
    let a = 1;
    let b = 2;
    let obj = { a: 3 };
    obj.a = b;
    console.log({ a, b, obj });
}
{
    let a = 1;
    let b = 2;
    let obj = {};
    a = b;
    console.log({ a, b, obj });
}