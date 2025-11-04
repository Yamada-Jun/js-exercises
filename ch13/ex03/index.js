import * as fs from "node:fs";
import { promisify } from "node:util";

//readdirのcallback
//callback < Function >
//    err < Error >
//    files < string[] > | <Buffer[] > | <fs.Dirent[] >
//mkdirとの違いはfilesが配列で返ってくること
export function readdir_promise(path, options) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, options, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(files);
        });
    });
}

const readdir_promisify = promisify(fs.readdir);

//readdir_promise(".")
//    .then(files => {
//        console.log(files);
//    })
//    .catch(err => {
//        console.error( err);
//    });


//readdir_promisify(".")
//    .then(files => {
//        console.log(files);
//    })
//    .catch(err => {
//        console.error(err);
//    });

//callback < Function >
//    err < Error >
//    stats < fs.Stats >
//mkdirとの違いはstatsが返ってくること
export function stat_promise(path, options) {
    return new Promise((resolve, reject) => {
        fs.stat(path, options, (err, stats) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(stats);
        });
    });
}

const stat_promisify = promisify(fs.stat);

//stat_promise(".")
//    .then(stats => {
//        console.log(stats);
//    })
//    .catch(err => {
//        console.error(err);
//    });

stat_promisify(".")
    .then(stats => {
        console.log(stats);
    })
    .catch(err => {
        console.error(err);
    });
