export function equalArrays(a, b) {
  if (a === b) return true; //a=1,b=2‚Ìê‡‚±‚±‚Ífalse
  if (a.length !== b.length) return false; //a=1,b=2‚Ìê‡‚±‚±‚Ítrue
    for (let i = 0; i < a.length; i++) { //a=1,b=2‚Ìê‡a.length=0‚È‚Ì‚Åfor‚Ì’†‚ÍÀs‚³‚ê‚È‚¢
    if (a[i] !== b[i]) return false;
  }
  return true;  //a=1,b=2‚Ìê‡‚±‚±‚É“’B‚·‚é
}
