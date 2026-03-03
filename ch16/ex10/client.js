import fs from "fs";
import fetch from "node-fetch";

const res = await fetch("http://localhost:8000/foo/bar/hello.txt", {
    method: "PUT",
    //body: fs.createReadStream("./ch16/ex10/file.txt"),
    body: fs.readFileSync("./ch16/ex10/file.txt"),
    duplex: "half",
});
console.log(await res.text());