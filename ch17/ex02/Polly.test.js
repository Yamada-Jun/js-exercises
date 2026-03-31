import { Polly } from '@pollyjs/core';
import FetchAdapter from '@pollyjs/adapter-fetch';  // Fetch APIをPollyに登録するためのAdapter
import FSPersister from '@pollyjs/persister-fs';    // Node.js環境でファイルシステムに録画データを保存するためのPersister
import { createIssue, closeIssue, listIssues } from './index';

Polly.register(FetchAdapter);   // FetchAdapterをPollyに登録
Polly.register(FSPersister);    // FSPersisterをPollyに登録

describe('ch17_ex02_PollyJS', () => {
  let polly;    // Pollyインスタンス

  beforeAll(() => {
    polly = new Polly('github-issue', { // Pollyインスタンスを生成
      adapters: ['fetch'],  // 使用する通信手段（fetch / axios）
      persister: 'fs',      // 録画データの保存先(ファイル / localStorage(ブラウザ))
      recordIfMissing: true, // 録画がなければ自動で記録
      persisterOptions: {
        fs: {
          recordingsDir: './__recordings__' // 録画データの保存先
        }
      }
    });
  });

  afterAll(async () => {
    await polly.stop(); // Pollyの停止（録画の保存）これがないと録画が保存されない
  });

  test('Issue作成', async () => {
    await createIssue("test title");  // Pollyが自動でリクエストを記録・再生
  });

  test('Issue削除', async () => {
    await closeIssue(5);  // Pollyが自動でリクエストを記録・再生
  });

  test('Issue一覧取得', async () => {
    await listIssues(); // Pollyが自動でリクエストを記録・再生
  });
});