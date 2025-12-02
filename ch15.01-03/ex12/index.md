
## 選択したテキストをリコーグループポータルで検索するブックマークレット
以下のコードをブラウザのブックマークに登録する。
```javascript
javascript:(function(){
	//window.getSelection()で選択テキストを取得し、リコーグループポータルの検索ページを開く
  let s = window.getSelection && window.getSelection().toString();
  open('リコーグループポータルURL/_layouts/15/search.aspx/?q=' + encodeURIComponent(s), '_blank');
})();
```