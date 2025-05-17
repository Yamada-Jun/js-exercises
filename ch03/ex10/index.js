//���������񂩂琶�����ꂽ 2 �� Symbol �ϐ����쐬
let symname1 = Symbol("propname");
let symname2 = Symbol("propname");

//�������v���p�e�B�Ƃ��Ď��I�u�W�F�N�g���쐬
let obj = {};
obj[symname1] = "value1";
obj[symname2] = "value2";

//�쐬����Symbol�ϐ����g���Ċe�v���p�e�B�̒l���擾
console.log(obj[symname1]); // => value1
console.log(obj[symname2]); // => value2

//���������񂩂琶�����ꂽ 2 �� Symbol �ϐ����쐬(Symbol.for()�œ����̕ϐ����쐬�����ꍇ)
let symname1_for = Symbol.for("propname_for");
let symname2_for = Symbol.for("propname_for");

//�������v���p�e�B�Ƃ��Ď��I�u�W�F�N�g���쐬(Symbol.for()�œ����̕ϐ����쐬�����ꍇ)
let obj_for = {};
obj_for[symname1_for] = "value1";
obj_for[symname2_for] = "value2";   //�����ŏ㏑�������

//�쐬����Symbol�ϐ����g���Ċe�v���p�e�B�̒l���擾(Symbol.for()�œ����̕ϐ����쐬�����ꍇ)
console.log(obj_for[symname1_for]); // => value2
console.log(obj_for[symname2_for]); // => value2