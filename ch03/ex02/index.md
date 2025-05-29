###JavaScript �̐����̍ő�l�ƍŏ��l���R���\�[���ɏo��
```javascript
//JavaScript �̐����̍ő�l�ƍŏ��l���R���\�[���ɏo��
console.log(Number.MAX_VALUE);          // => 1.7976931348623157e+308
console.log(Number.MIN_VALUE);          // => 5e-324

//�ő�l+1 ���R���\�[���ɏo��
console.log(Number.MAX_VALUE + 1);      // => 1.7976931348623157e+308

//�ő�l+1 �ƍő�l+2 �� === �Ŕ�r�������ʂ��R���\�[���ɏo��
console.log((Number.MAX_VALUE + 1) === (Number.MAX_VALUE + 2));    // => true
```

### �ő�l+1 �ƍő�l+2 �� === �Ŕ�r�������ʂ�true�ɂȂ闝�R
- `Number.MAX_SAFE_INTEGER`��`9007199254740991`�ł���A�����1�𑫂���`9007199254740992`�ɂȂ�
- `Number.MAX_SAFE_INTEGER`��2�𑫂���`9007199254740993`�ƂȂ邪�A�����53�r�b�g�̉������ŕ\���ł���ő�̐����𒴂��邽�߁AJavaScript�ł�`9007199254740992`�Ɠ����l�Ƃ��Ĉ�����