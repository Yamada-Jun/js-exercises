customElements.define("inline-circle", class InlineCircle extends HTMLElement {
    // ブラウザは <inline-circle> 要素がドキュメントに挿入されたときにこのメソッドを呼び出します。
    // この例では不要ですが、disconnectedCallback() もあります。
    connectedCallback() {
        // 円を作成するために必要なスタイルを設定します
        this.style.display = "inline-block";
        this.style.borderRadius = "50%";
        this.style.border = "solid black 1px";
        this.style.transform = "translateY(10%)";

        // すでにサイズが定義されていない場合、現在のフォントサイズに基づいたデフォルトサイズを設定します
        if (!this.style.width) {
            this.style.width = "0.8em";
            this.style.height = "0.8em";
        }
    }

    // static observedAttributes プロパティは、変更通知を受けたい属性を指定します。
    // （メソッドにしか "static" を使えないため、getter を使っています。）
    static get observedAttributes() { return ["diameter", "color", "box-shadow"]; }

    // 上記で指定した属性のいずれかが変更されたとき（カスタム要素が最初にパースされたときや後で変更されたとき）に呼び出されます。
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
        case "diameter":
            // diameter 属性が変更された場合、サイズのスタイルを更新します
            this.style.width = newValue;
            this.style.height = newValue;
            break;
        case "color":
            // color 属性が変更された場合、色のスタイルを更新します
            this.style.backgroundColor = newValue;
                break;
        case "box-shadow":
            // box-shadow 属性が変更された場合、影のスタイルを更新します
            this.style.boxShadow = newValue;
            break;
        }
    }

    // 要素の属性に対応する JavaScript プロパティを定義します。
    // これらの getter と setter は、基礎となる属性を取得・設定するだけです。
    // JavaScript プロパティが設定されると、属性が設定され、attributeChangedCallback() が呼び出されて要素のスタイルが更新されます。
    get diameter() { return this.getAttribute("diameter"); }
    set diameter(diameter) { this.setAttribute("diameter", diameter); }
    get color() { return this.getAttribute("color"); }
    set color(color) { this.setAttribute("color", color); }
    get boxShadow() { return this.getAttribute("box-shadow"); }
    set boxShadow(color) { this.setAttribute("box-shadow", color); }
});
