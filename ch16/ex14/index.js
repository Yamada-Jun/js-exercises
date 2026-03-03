import fs from 'fs/promises';
import { createCanvas, loadImage, ImageData } from 'canvas';
import cv from 'opencv.js';//今回もOpenCV.jsを使用
import threads from 'worker_threads';

if (threads.isMainThread) {
    const image = await loadImage('./ch16/ex14/image.png');
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, image.width, image.height);

    let worker = new threads.Worker(new URL(import.meta.url));

    //imageDataをそのまま渡せないため、dataを配列に変換して渡す
    worker.postMessage({
        data: imageData.data,
        width: imageData.width,
        height: imageData.height
    });

    worker.on("message", async (message) => {
        //配列からImageDataに変換してcanvasに描画
        const outImageData = new ImageData(new Uint8ClampedArray(message.data), message.width, message.height);
        ctx.putImageData(outImageData, 0, 0);
        //canvasをPNG形式のバッファに変換して保存
        const buf = canvas.toBuffer('image/png');
        await fs.writeFile('./ch16/ex14/gaussian.png', buf);
    });
}
else {
    threads.parentPort.once('message', (imageData) => {

        //OpenCV.jsで扱うため、Matに変換する
        const src = cv.matFromImageData(imageData);
        const dst = new cv.Mat();

        //ガウシアンフィルタをカーネルサイズ5x5で適用
        cv.GaussianBlur(src, dst, new cv.Size(5, 5), 0, 0);

        //メインスレッドに結果を渡すために、dstのdataを配列に変換して渡す
        threads.parentPort.postMessage({
            data: Array.from(dst.data),
            width: dst.cols,
            height: dst.rows
        });

        //メモリ解放
        src.delete();
        dst.delete();
    });
}