//通常のHTML<script>で読み込んだだけではWorkerのスコープにはcvは存在しないためここでimport
/* global importScripts */
importScripts('https://docs.opencv.org/4.x/opencv.js'); // OpenCV.jsのパスを指定

self.addEventListener('message', (event) => {
    const src = cv.matFromImageData(event.data); // ImageDataからMatを作成
    const dst = new cv.Mat();

    //わざとガウシアンフィルタを何度も実施して重い処理にする
    for (let i = 0; i < 500; i++) {
        cv.GaussianBlur(src, dst, new cv.Size(5, 5), 0, 0); //カーネルサイズ5x5でガウシアンフィルタを適用
    }

    //dstをImageDataに変換
    const resultImageData = new ImageData(new Uint8ClampedArray(dst.data), dst.cols, dst.rows);

    // 結果を返す
    postMessage(resultImageData);

    //メモリ解放
    src.delete();
    dst.delete();
});