import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: 'production',                 // 'production' | 'development' | 'none'
    entry: './ex05/index.js',
    output: {
        path: path.resolve(__dirname, './ex05/dist'),//output.path には絶対パスを指定する必要がある
        filename: 'bundle.js',           // 出力ファイル名
        clean: true,                     // 出力前にdistをクリーン
    },
    module: {
        rules: [
            // 例: CSSを取り込む
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            // 画像やフォント（webpack 5 の asset modules）
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff2?)$/i,
                type: 'asset',              // 自動でinline or resourceに振り分け
            },
        ],
    },
    devtool: 'source-map',             // デバッグ用ソースマップ
};