import fs from 'fs';

fs.truncate('./ch16/ex06/test.txt', 100, function (err) {
    if (err) {
        console.log(err);
    }

    console.log(`extended 100 bytes.`);
});
