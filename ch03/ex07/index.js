export function equalArrays(a, b) {
  if (a === b) return true; //a=1,b=2�̏ꍇ������false
  if (a.length !== b.length) return false; //a=1,b=2�̏ꍇ������true
    for (let i = 0; i < a.length; i++) { //a=1,b=2�̏ꍇa.length=0�Ȃ̂�for�̒��͎��s����Ȃ�
    if (a[i] !== b[i]) return false;
  }
  return true;  //a=1,b=2�̏ꍇ�����ɓ��B����
}
