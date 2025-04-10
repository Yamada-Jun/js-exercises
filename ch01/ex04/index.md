# 開発者ツールのコンソール上に何が表示されるか
予想："ansewer: 42"が表示された後に、"answer: 0"が表示される
結果："ansewer: 0"が表示された後に、"answer: 0"が表示された

# 開発者ツールを開いた状態のタブで HTML を開く場合
結果："ansewer: 42"が表示された後に、"answer: 0"が表示された
# HTML を開いた状態のタブで開発者ツールを開く場合
結果："ansewer: 0"が表示された後に、"answer: 0"が表示された

# 常に期待した結果を得るためにはどのようにコードを修正すべきか
まずlog出力用の変数を出力する回数分用意する。
今回は2回log出力しているので、life_log_1, life_log_2をletで定義する。
次に今回変数lifeは参照型(代入した場合、変数にはそのデータの参照が格納される)なので、life_log_1とlife_log_2にそれぞれlifeについて深いコピーを行う。
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