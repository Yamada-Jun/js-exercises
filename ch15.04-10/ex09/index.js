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
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d", { willReadFrequently: true }/*警告対応*/);
    //const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    //const imageData = originalCtx.getImageData(0, 0, img.width, img.height);// 元の画像データを取得
    //const data = imageData.data;// RGBA の配列 RはRed GはGreen BはBlue AはAlpha.alphaは透明度,透明度は0(透明)~255(不透明)
    //const outputData = new Uint8ClampedArray(imageData.data.length);
    // グレースケールへの変換 (RGB を足して平均を取っている)
    //
    // ガウシアンフィルタを実装する場合はこの周辺のコードを変更しなさい
    // imageData の中身はそのままに別の配列に結果を格納するとよい
    // ```js
    // const outputData = new Uint8ClampedArray(imageData.data.length);
    //
    // // TODO: ここで imageData.data を参照して outputData に結果を格納
    //
    // const outputImageData = new ImageData(outputData, img.width, img.height);
    // filteredCtx.putImageData(outputImageData, 0, 0);
    // ```

    //for (let i = 0; i < data.length; i += 4) {
    //  const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    //  data[i] = avg;
    //  data[i + 1] = avg;
    //  data[i + 2] = avg;
    //  data[i + 3] = 100;
    //}

      const src = cv.imread(originalCanvas); //canvasをOpenCVのMatに変換
      const dst = new cv.Mat();
      cv.GaussianBlur(src, dst, new cv.Size(5, 5), 0, 0); //カーネルサイズ5x5でガウシアンフィルタを適用
      cv.imshow(filteredCanvas, dst);   //表示
  });

  reader.readAsDataURL(file);
});
