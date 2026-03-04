import { test, expect } from 'vitest';//jestでうまくいかなかったためvitestを利用

const BASE_URL = 'http://localhost:3000';

test('"/"が GET されたとき以下の HTML を返却する', async () => {
    const res = await fetch(BASE_URL + '/', {
        method: 'GET'
    });
    const text = await res.text();
    expect(res.status).toBe(200);
    expect(text).toContain(`<form action="/greeting" method="POST">`);
    expect(text).toContain(`<label for="greeting">Name:</label>`);
    expect(text).toContain(`<input type="text" id="name" name="name" />`);
    expect(text).toContain(`<input type="text" id="greeting" name="greeting" />`);
    expect(text).toContain(`<button type="submit">Submit</button>`);
    expect(text).toContain(`</form>`);
});

test('フォームから/greetingに POST されたとき、nameとgreeting の内容をボディに含む HTML を返却する', async () => {
    const params = new URLSearchParams({ name: 'AAA', greeting: 'BBB' });
    const res = await fetch(BASE_URL + '/greeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),    // フォームの内容をURLエンコードして送信
    });
    const text = await res.text();
    expect(res.status).toBe(200);
    expect(text).toContain(`<form action="/greeting" method="POST">`);
    expect(text).toContain(`<label for="greeting">Name:</label>`);
    expect(text).toContain(`<input type="text" id="name" name="name" value="AAA" />`);//value="AAA"
    expect(text).toContain(`<input type="text" id="greeting" name="greeting" value="BBB" />`);//value="BBB"
    expect(text).toContain(`<button type="submit">Submit</button>`);
    expect(text).toContain(`</form>`);
});

test('非対応のパスとメソッドの組み合わせでアクセスされた場合、HTTP のプロトコルにしたがい 404 または 405 を返す', async () => {
    const res = await fetch(BASE_URL + '/greeting', { method: 'GET' });
    expect(res.status).toBe(404);
});
