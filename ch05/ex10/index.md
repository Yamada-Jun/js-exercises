### console.log �̏o��
```
{ a: 1, b: 2, obj: { a: 4, b: 4 } }
{ a: 4, b: 2, obj: { b: 4 } }
{ a: 1, b: 2, obj: { a: 2 } }
{ a: 2, b: 2, obj: {} }
```
### with �����g�킸�ɓ��������������ꍇ�ǂ̂悤�ȕ��ɂȂ邩
```javascript
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
```
