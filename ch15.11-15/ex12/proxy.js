import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.post("/api/ollama", async (req, res) => {
    const response = await fetch("http://localhost:11434/api/chat", {//generateだとうまくいかない
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body)
    });

    //const data = await response.json(); こうするとだめらしい。bodyを全部読み込んでからになるのでストリーミングにならない
    //res.json(data);
    res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");
    response.body.pipe(res);
});

app.listen(3000, () => {
    console.log("Proxy running on http://localhost:3000");
});