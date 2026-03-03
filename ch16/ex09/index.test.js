import { test } from 'vitest';//jestでうまくいかなかったためvitestを利用
import request from "supertest";
import app from './index.js';


test('get /test/mirror', async () => {
    await request(app)
    .get('/test/mirror')
    .expect('Content-Type', "text/plain; charset=UTF-8")
    .expect(200);
});

test('存在しないパスで404が返る', async () => {
    await request(app)
        .get('/notfound')
        .expect(404)
        .expect('Content-Type', /text\/plain/)
        .expect('Not Found');
});