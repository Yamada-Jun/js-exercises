### let�̏ꍇ
0�`9���o�͂��ꂽ��A8�s�ڂ�console.log(i)�ŁA"i�͒�`����Ă��Ȃ�"�ƃG���[�ɂȂ�B
let�̏ꍇ�A�u���b�N�X�R�[�v�Ȃ̂ŁA�u���b�N�̊O��i���Q�Ƃ���ƁA���̃X�R�[�v��i�͒�`����Ă��Ȃ��̂ŃG���[�ɂȂ��Ă��܂��B
```
PS C:\Projects\js-exercises> node ch03/ex14
0
1
2
3
4
5
6
7
8
9
file:///C:/Projects/js-exercises/ch03/ex14/index.js:8
console.log(i);
            ^

ReferenceError: i is not defined
    at file:///C:/Projects/js-exercises/ch03/ex14/index.js:8:13
    at ModuleJob.run (node:internal/modules/esm/module_job:271:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:547:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)
```
```javascript
/* eslint-disable */
for (let i = 0; i < 10; i++) {
  (function () {
    let i = 100;
  })();
  console.log(i); //0�`9���o��
}
console.log(i); //i�͒�`����Ă��Ȃ����߃G���[
```

### �S�Ă� let �� var �ɕς����ꍇ
8�s�ڂŃG���[�ɂ͂Ȃ炸�A0�`10�����Ԃɏo�͂����B
�֐��̊O�Œ�`�����ϐ��̓O���[�o���ϐ��ɂȂ�
�قȂ�̂�i��100�ɂ͂Ȃ�Ȃ��B
```
PS C:\Projects\js-exercises> node ch03/ex14
0
1
2
3
4
5
6
7
8
9
10
```

```javascript
/* eslint-disable */
for (var i = 0; i < 10; i++) {  //for����i�̓O���[�o���ϐ��ɂȂ�
  (function () {
    var i = 100;    //var�̏ꍇ�͍Ē�`���\�B����i��for����i�Ƃ͕ʂ̕ϐ��ƂȂ�
  })();
  console.log(i);
}
console.log(i);  //for����i�̓O���[�o���ϐ��Ȃ̂ŁA�����ŎQ�Ƃ����
```

### �S�Ă� let ���������ꍇ (�� strict ���[�h�ł̂ݎ��s�\) 
i���O���[�o���ϐ��ɂȂ�̂Ŋ֐��̒���i��100�ɂȂ�B
�C���N�������g������ɁA���������肪���胋�[�v���炷�������Ă��܂��B
101�ɂȂ��Ă���for�𔲂��邽�߁A100�A101�����Ԃɏo�͂����B
```
PS C:\Projects\js-exercises> node ch03/ex14
100
101
```

```javascript
/* eslint-disable */
for (i = 0; i < 10; i++) {
  (function () {
    i = 100;        //i���O���[�o���ϐ��ɂȂ�̂Ŋ֐��̒���i��100�ɂȂ�
  })();
  console.log(i);   //100���o�͂��A�C���N�������g���Ă�����������肵��for���[�v���甲����
}
console.log(i);     //101���o�́Bi�̓O���[�o���ϐ��Ȃ̂ŁAfor���[�v��i�Ɠ���i�ɂȂ邽��
```
