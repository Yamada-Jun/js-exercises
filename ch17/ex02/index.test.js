
import { jest } from '@jest/globals';
import { createIssue, closeIssue, listIssues } from './index';

global.fetch = jest.fn();

afterEach(() => {
    fetch.mockClear();
});

test('Issue作成', async () => {
    fetch.mockResolvedValue({
        ok: true,
        text: async () => JSON.stringify({ title: "test title", body: "Issue body text" }),
    });

    const user = await createIssue("test title");

    expect(fetch).toHaveBeenCalledWith(
        'https://api.github.com/repos/Yamada-Jun/js-exercises/issues',
        {
            method: "POST",
            headers: {
                "Authorization": `token ${process.env.GITHUB_TOKEN}`,// GitHubのTokenを.envから取得
                "Content-Type": "application/json",
                "Accept": "application/vnd.github.v3+json"
            },
            body: JSON.stringify({ title: "test title", body: "Issue body text" }),
        }
    );
});


test('Issue削除', async () => {
    const user = await closeIssue(5);

    expect(fetch).toHaveBeenCalledWith(
        'https://api.github.com/repos/Yamada-Jun/js-exercises/issues/5',
        {
            method: "PATCH",
            headers: {
                "Authorization": `token ${process.env.GITHUB_TOKEN}`,// GitHubのTokenを.envから取得
                "Content-Type": "application/json",
                "Accept": "application/vnd.github.v3+json"
            },
            body: JSON.stringify({ state: "closed" }),
        }
    );
});


test('Issue一覧取得', async () => {
    fetch.mockResolvedValue({
        ok: true,
        json: async () => [
            { number: 1, title: "test title1" },
            { number: 2, title: "test title2" }
        ],
        text: async () => JSON.stringify([
            { number: 1, title: "test title1" },
            { number: 2, title: "test title2" }
        ]),
    });

    const user = await listIssues();

    expect(fetch).toHaveBeenCalledWith(
        'https://api.github.com/repos/Yamada-Jun/js-exercises/issues?state=open',
        {
            method: "GET",
            headers: {
                "Authorization": `token ${process.env.GITHUB_TOKEN}`,// GitHubのTokenを.envから取得
                "Content-Type": "application/json",
                "Accept": "application/vnd.github.v3+json"
            },
        }
    );
});