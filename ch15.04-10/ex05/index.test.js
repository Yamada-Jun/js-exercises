import './inline-circle.js';

describe('ch15.04-10/ex05', () => {
    test('box-shadow属性テスト', () => {
        document.body.innerHTML = '<inline-circle box-shadow="0px 1px 2px 3px gray"></inline-circle>';//box-shadow属性をつけてDOMに追加
        const circle = document.querySelector('inline-circle');//追加した要素を取得
        expect(circle.style.boxShadow).toBe('0px 1px 2px 3px gray');//style.boxShadowプロパティの確認
    });
});