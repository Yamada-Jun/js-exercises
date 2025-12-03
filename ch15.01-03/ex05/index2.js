//DOM API を使って HTML 要素の内容を書き換え。DOM構築前に実行されると困るので、asyncは×、deferは〇
//document.addEventListener("domcontentloaded", () => {})はDOM構築時に実行されるので〇のはずだが、Helloが表示されない。
//window.addEventListener("load", () => {})はすべてのリソース読み込み後に実行されるので〇。ただし3より後。
window.addEventListener("load", () => { document.getElementById("1000").innerHTML = "Hello"; }) 
//id="1000" を持つ要素の中身が "Hello" になる