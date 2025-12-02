
## Reactフレームワークを使っていればどのように XSS 対策がされるか
- Reactは自動でJSX(JavaScript XML) 内で使用される文字列を自動的にエスケープされる。これにより、悪意のあるスクリプトがHTMLとして解釈されるのを防ぐ。
- 例えば、<div>{userInput}</div> の場合、userInputに<script>alert(1)</script>が入っていても、Reactはタグを文字列として扱い、DOMに挿入する際に安全な形に変換される。

## どのような XSS の危険が残るか
- ただしReactでは `dangerouslySetInnerHTML` プロパティを使用して直接HTMLを挿入することができるため、これはXSS攻撃のリスクがある。

### JSXとは
- JSXは、JavaScript XMLの略で、JavaScript内でHTMLのような構文を使用できるようにする拡張機能。
- Reactでコンポーネントを定義する際に広く使用されており、UIの構造を直感的に表現できる。
- JSXは最終的にJavaScriptコードに変換され、ブラウザで実行される。