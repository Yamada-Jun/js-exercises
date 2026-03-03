import fs from 'fs';
import iconv from 'iconv-lite';

const reader = fs.createReadStream('ch16/ex04/hello.txt');
const decoder = iconv.decodeStream('Shift_JIS');
reader.pipe(decoder);
decoder.on('data', (chunk) => {
    console.log(chunk);
});