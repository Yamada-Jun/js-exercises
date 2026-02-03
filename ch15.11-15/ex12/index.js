const send_button = document.getElementById("send");
const prompt_text = document.getElementById("prompt");
const anser = document.getElementById("anser");

send_button.addEventListener("click", async (event) => {
    if (!prompt_text) {
        console.log('prompt null');
        return;
    }

    console.log('送信');

    const res = await fetch("http://localhost:3000/api/ollama", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gemma:2B",
            stream: true,
            messages: [
                { role: "user", content: prompt_text.value }
            ]
        })
    });
    console.log(prompt_text.value);
    anser.value += "<質問>\n" + prompt_text.value + "\n\n";
    prompt_text.value = "";

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");

    anser.value += "<回答>\n";
    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const data = JSON.parse(chunk);
        //console.log(data.message.content);
        anser.value += data.message.content;
    }
    anser.value += "\n\n";

});
