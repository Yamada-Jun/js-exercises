//ここでworker.jsを読み込むことで、OpenCV.jpもindex.htmlを開いたときに読み込むことができる
//"change"のイベントリスナーの中だとうまくいかない
const worker = new Worker('./worker.js');

document.getElementById("image").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
        img.src = e.target.result;
    });

    img.addEventListener("load", () => {
        const originalCanvas = document.getElementById("original");
        const originalCtx = originalCanvas.getContext("2d", { willReadFrequently: true }/*警告対応*/);

        originalCanvas.width = img.width;
        originalCanvas.height = img.height;

        originalCtx.drawImage(img, 0, 0);

        //Web Workerに渡せるデータ「imageData」に変換
        const imageData = originalCtx.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
        worker.postMessage(imageData);
    });

    worker.addEventListener('message', (event) => {
        const filteredCanvas = document.getElementById("filtered");
        const filteredCtx = filteredCanvas.getContext("2d");
        filteredCanvas.width = img.width;
        filteredCanvas.height = img.height;
        filteredCtx.putImageData(event.data, 0, 0);
    });

    reader.readAsDataURL(file);
});

