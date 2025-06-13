// ���炩�̃��T�C�Y���s���֐��Ǝv���ēǂ�ŉ�����
//
// - params �ɂ� undefined �܂��̓I�u�W�F�N�g���^������
// - params.maxWidth ���^������ꍇ (���̐����Ɖ��肵�ėǂ�) �͂��̒l�𗘗p����
// - params.maxHeight ���^������ꍇ (���̐����Ɖ��肵�ėǂ�) �͂��̒l�𗘗p����
function resize(params) {
    let maxWidth = 600;
    let maxHeight = 480;

    if (params && params.maxWidth) {
        maxWidth = params.maxWidth;
    }

    if (params && params.maxHeight) {
        maxHeight = params.maxHeight;
    }

    console.log({ maxWidth, maxHeight });
}

// if �𗘗p���� && �� || ��p���� maxWidth �� maxHeight ��ݒ肷��֐� (resize1)
function resize1(params) {
    let maxWidth = 600;
    let maxHeight = 480;

    // params��undefined�������ꍇ�A_params��{ maxWidth: 0, maxHeight: 0 }����������
    // params��undefined�łȂ��ꍇ�A_params��params����������
    let _params = params || { maxWidth: 0, maxHeight: 0 };

    // _params��undefined�ł͂Ȃ����Ƃ͏�L�Ŕ���ς݂Ȃ̂ŁA?.���g�킸�ɃA�N�Z�X�ł���
    // ||�̍��ӂ�0�Ȃ�E�ӂ��̗p�����
    // ||�̍��ӂ�0�ȊO�Ȃ獶�ӂ��̗p�����
    maxWidth = _params.maxWidth || maxWidth;
    maxHeight = _params.maxHeight || maxHeight;

    console.log({ maxWidth, maxHeight });
}

// if �𗘗p���� ?. �� ?? ��p���� maxWidth �� maxHeight ��ݒ肷��֐� (resize2)
function resize2(params) {
    let maxWidth = 600;
    let maxHeight = 480;

    // params��undefined�������ꍇ�Aparams?.��undefined�ɕ]������A??�̍��ӂ�undefined�ɂȂ�̂ŁA�E�ӂ��]������maxWidth(600)�ɂȂ�
    // params.maxWidth��0�������ꍇ�A(params?.maxWidth)?.��undefined�ɕ]������A??�̍��ӂ�undefined�ɂȂ�̂ŁA�E�ӂ��]������maxWidth(600)�ɂȂ�
    // params.maxWidth��0�łȂ��ꍇ�A??�̍��ӂ�undefined�ɂȂ�Ȃ��̂ŁA??�̍���params.maxWidth���̗p�����
    maxWidth = (params?.maxWidth)?.maxWidth ?? maxWidth;
    maxHeight = (params?.maxHeight)?.maxHeight ?? maxHeight;

    console.log({ maxWidth, maxHeight });
}

//maxWidth�����̐����ŁAmaxHeight�����̐����ł͂Ȃ�(0)�̏ꍇ�̊m�F
resize({ maxWidth: 1, maxHeight: 0 });  //=> { maxWidth: 1, maxHeight: 480 }
resize1({ maxWidth: 1, maxHeight: 0 });
resize2({ maxWidth: 1, maxHeight: 0 });
//maxHeight��undefined�̏ꍇ�̊m�F
resize({ maxWidth: 0 });                //=> { maxWidth: 640, maxHeight: 480 }
resize1({ maxWidth: 0 });
resize2({ maxWidth: 0 });
//params��undefined�̏ꍇ�̊m�F
resize();                               //=> { maxWidth: 640, maxHeight: 480 }
resize1();
resize2();
