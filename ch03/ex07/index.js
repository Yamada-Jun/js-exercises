export function equalArrays(a, b) {
  if (a === b) return true; //a=1,b=2の場合ここはfalse
  if (a.length !== b.length) return false; //a=1,b=2の場合ここはtrue
    for (let i = 0; i < a.length; i++) { //a=1,b=2の場合a.length=0なのでforの中は実行されない
    if (a[i] !== b[i]) return false;
  }
  return true;  //a=1,b=2の場合ここに到達する
}
