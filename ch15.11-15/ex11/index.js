const input_file = document.getElementById("input_file");
const access_token = document.getElementById("access_token");

input_file.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) {
        console.log('file null');
        return;
    }
    if (!access_token.value) {
        console.log('access_token.value null');
        return;
    }

    //単純アップロードでも4MB以上のファイルをアップロードできた
    console.log('アップロード開始');
    const res = await fetch(`https://graph.microsoft.com/v1.0/me/drive/root:/${file.name}:/content`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${access_token.value}`,
            'Content-Type': file.type
        },
        body: file
    });
    if (!res.ok) {
        console.log('アップロード失敗');
        return;
    }
    console.log('アップロード完了');
});