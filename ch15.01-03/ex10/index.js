// divとinputの要素を取得
const div = document.getElementById('editor-front');
const input = document.getElementById('editor-back');

//addEventListener(イベントタイプ, 呼び出される関数)

// div 要素をクリックすると input 要素が focus される
div.addEventListener('click', () => {
    input.focus();
});

// input 要素に focus されると灰色 (silver)になる
input.addEventListener('focus', () => {
    div.style.backgroundColor = 'silver';
});

// input 要素から focus が外れると白色に戻る
input.addEventListener('blur', () => {
    div.style.backgroundColor = 'white';
});

// input 要素に入力された text は div 要素にも表示される
input.addEventListener('input', () => {
    div.textContent = input.value;
});
