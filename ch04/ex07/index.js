// ���̂悤�Ȋ֐��͐�΂ɏ����Ă͂Ȃ�Ȃ��B
function set42(key) {
    eval(`${key} = 42;`);
}

// ��:
let hello;
set42("hello");
console.log(hello); // 42

// ���L�̃R�[�h���ƁA�������������[�v�ɓ���v���O�������I�����Ȃ��Ȃ�
set42("; while(1){}//");

// ���L�̃R�[�h���ƁA�p�X���[�h�Ȃǂ̏d�v�ȏ����R���\�[���o�͂����邱�Ƃ��ł��Ă��܂�
set42("; console.log(password);	//");