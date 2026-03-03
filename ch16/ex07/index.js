import fs from 'fs/promises';


export async function checkEntry(path) {
    try {
        const stats = await fs.stat(path);//statはstatSyncの非同期版なので、Promiseを返す。awaitで待つ必要がある。
        if (stats.isFile()) return 'file';
        else if (stats.isDirectory()) return 'directory';
        //else if (stats.isSymbolicLink()) return 'symbolic link';//シンボリックリンクはリンク先の型（ファイルやディレクトリ）として判定されるため、isSymbolicLink()は無意味
    } catch {
        console.log('Entry not found');//存在しないエントリーが指定された場合
        return 'Entry not found';
    }
}

//console.log(await checkEntry("ch16\\ex07\\hello.txt"));