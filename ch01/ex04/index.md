# �J���҃c�[���̃R���\�[����ɉ����\������邩
�\�z�F"ansewer: 42"���\�����ꂽ��ɁA"answer: 0"���\�������
���ʁF"ansewer: 0"���\�����ꂽ��ɁA"answer: 0"���\�����ꂽ

# �J���҃c�[�����J������Ԃ̃^�u�� HTML ���J���ꍇ
���ʁF"ansewer: 42"���\�����ꂽ��ɁA"answer: 0"���\�����ꂽ
# HTML ���J������Ԃ̃^�u�ŊJ���҃c�[�����J���ꍇ
���ʁF"ansewer: 0"���\�����ꂽ��ɁA"answer: 0"���\�����ꂽ

# ��Ɋ��҂������ʂ𓾂邽�߂ɂ͂ǂ̂悤�ɃR�[�h���C�����ׂ���
�܂�log�o�͗p�̕ϐ����o�͂���񐔕��p�ӂ���B
�����2��log�o�͂��Ă���̂ŁAlife_log_1, life_log_2��let�Œ�`����B
���ɍ���ϐ�life�͎Q�ƌ^(��������ꍇ�A�ϐ��ɂ͂��̃f�[�^�̎Q�Ƃ��i�[�����)�Ȃ̂ŁAlife_log_1��life_log_2�ɂ��ꂼ��life�ɂ��Đ[���R�s�[���s���B
```html
<!DOCTYPE html>
<html>
<body>
    <script>
        let life = { answer: 42 };
        let life_log_1 = JSON.parse(JSON.stringify(life));
        console.log(life_log_1);
        life.answer = 0;
        let life_log_2 = JSON.parse(JSON.stringify(life));
        console.log(life_log_2);
    </script>
</body>
</html>
```