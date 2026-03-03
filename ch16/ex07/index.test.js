import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkEntry } from "./index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('ch16_ex07', () => {
    const test_file = path.join(__dirname, 'test_file.txt');
    const test_dir = path.join(__dirname, 'test_dir');
    const symbllink1_path = path.join(__dirname, 'test_symlink1');
    const symbllink2_path = path.join(__dirname, 'test_symlink2');
    const not_exist = path.join(__dirname, 'not_exist.txt');

    beforeAll(() => {
        fs.writeFileSync(test_file, 'test');//テスト用のファイルを作成
        fs.mkdirSync(test_dir, { recursive: true });//テスト用のディレクトリをrecursiveオプションを指定して作成。すでに存在する場合はエラーにならないようにする。
        fs.symlinkSync(test_file, symbllink1_path);//テスト用のシンボリックリンクを作成。recursiveオプションを指定できない
        fs.symlinkSync(test_dir, symbllink2_path);//テスト用のシンボリックリンクを作成。recursiveオプションを指定できない
    });

    afterAll(() => {
        fs.unlinkSync(test_file);//テスト用のファイルを削除
        fs.rmSync(test_dir, { recursive: true, force: true });//テスト用のディレクトリを削除。forceオプションを指定して存在しない場合でもエラーにならないようにする。
        fs.unlinkSync(symbllink1_path);
        fs.unlinkSync(symbllink2_path);
    });

    test('isFile()のテスト', async () => {
        expect(await checkEntry(test_file)).toBe('file');
    });

    test('isDirectory()のテスト', async () => {
        expect(await checkEntry(test_dir)).toBe('directory');
    });

    test('isSymbolicLink()のテスト', async () => {
        expect(await checkEntry(symbllink1_path)).toBe('file');//シンボリックリンクはリンク先の型（ファイルやディレクトリ）として判定される
        expect(await checkEntry(symbllink2_path)).toBe('directory');//シンボリックリンクはリンク先の型（ファイルやディレクトリ）として判定される
    });

    test('存在しないパスの場合のテスト', async () => {
        expect(await checkEntry(not_exist)).toBe('Entry not found');
    });
});