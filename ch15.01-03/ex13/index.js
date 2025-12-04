//nav 要素内のリンク (<a>)
const links = document.querySelectorAll("nav a");//"nav" 要素のうち、a 要素
console.log(links);
for (let i = 0; i < links.length; i++) {
    console.log(links[i]);
}

//商品リスト (.product-list) 内の最初の商品 (.product-item)
const product_item = document.querySelector(".product-list .product-item:first-child");//.product-list のうち、product-item クラスを持つ要素で、かつその親の中で最初の子
console.log(product_item);

//カートアイコンの画像 (<img>)
const icon = document.querySelector(".cart img");//.cart クラスを持つ要素のうち、img 要素
console.log(icon);

//商品リスト (.product-list) 内の価格 (.price) を表示する要素
const price_elements = document.querySelectorAll(".product-list .price");//.product-list のうち、price クラスを持つ要素
console.log(price_elements);
for (let i = 0; i < price_elements.length; i++) {
    console.log(price_elements[i]);
}

//商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>)
const product_images = document.querySelectorAll(".product-list .product-item img");//.product-list のうち、product-item クラスを持つ要素のさらに子孫要素である img 要素
console.log(product_images);
for (let i = 0; i < product_images.length; i++) {
    console.log(product_images[i]);
}

//検索バー (.search-bar) 内の検索ボタン (<button>)
const button = document.querySelector(".search-bar button");//.search-bar クラスを持つ要素のうち、button 要素
console.log(button);

//フッター (footer) 内のパラグラフ (<p>) 要素
const paragraphs = document.querySelectorAll("footer p");//footer 要素のうち、p 要素
console.log(paragraphs);
for (let i = 0; i < paragraphs.length; i++) {
    console.log(paragraphs[i]);
}

//商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
const product_item_even = document.querySelectorAll(".product-list .product-item:nth-child(even)");//.product-list のうち、product-item クラスを持つ要素で、かつその親の中で偶数番目の子
console.log(product_item_even);
for (let i = 0; i < product_item_even.length; i++) {
    console.log(product_item_even[i]);
}

//ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>)
const account_image = document.querySelector("header .account img");//.account クラスを持つ要素のうち、img 要素
console.log(account_image);

//ナビゲーションリンクのうち、"会社情報" のリンク
const company_info_link = document.querySelector("nav a[href='#about']");//"nav" 要素のうち、href 属性が '#about' の a 要素
console.log(company_info_link);