(function updateClock() { // Update the SVG clock graphic to show current time
    // Update the SVG clock graphic to show current time
    // 現在時刻を表示するSVG時計グラフィックを更新する
    let now = new Date();                       // Current time // 現在時刻
    let sec = now.getSeconds();                 // Seconds // 秒
    let min = now.getMinutes() + sec/60;        // Fractional minutes // 分（小数点以下含む）
    let hour = (now.getHours() % 12) + min/60;  // Fractional hours // 時（小数点以下含む）
    let minangle = min * 6;                     // 6 degrees per minute  // 1分あたり6度
    let hourangle = hour * 30;                  // 30 degrees per hour // 1時間あたり30度
    let secondangle = sec * 6;                  // 6 degrees per second // 1秒あたり6度

    // Get SVG elements for the hands of the clock
    // 時計の針のSVG要素を取得する
    let minhand = document.querySelector("#clock .minutehand");
    let hourhand = document.querySelector("#clock .hourhand");
    let secondhand = document.querySelector("#clock .secondhand");

    // Set an SVG attribute on them to move them around the clock face
    // 時計盤上で針を動かすためにSVG属性を設定する
    minhand.setAttribute("transform", `rotate(${minangle},50,50)`);
    hourhand.setAttribute("transform", `rotate(${hourangle},50,50)`);
    secondhand.setAttribute("transform", `rotate(${secondangle},50,50)`);

    // Run this function again in 10 seconds
    // この関数を10秒後に再度実行する
    setTimeout(updateClock, 0.5);
}()); // Note immediate invocation of the function here.
// Note immediate invocation of the function here.
// ここで関数が即時実行されていることに注意
