// 何らかのリサイズを行う関数と思って読んで下さい
//
// - params には undefined またはオブジェクトが与えられる
// - params.maxWidth が与えられる場合 (正の整数と仮定して良い) はその値を利用する
// - params.maxHeight が与えられる場合 (正の整数と仮定して良い) はその値を利用する
function resize(params) {
    let maxWidth = 600;
    let maxHeight = 480;

    if (params && params.maxWidth) {
        maxWidth = params.maxWidth;
    }

    if (params && params.maxHeight) {
        maxHeight = params.maxHeight;
    }

    console.log({ maxWidth, maxHeight });
}

// if を利用せず && や || を用いて maxWidth や maxHeight を設定する関数 (resize1)
function resize1(params) {
    let maxWidth = 600;
    let maxHeight = 480;

    // paramsがundefinedだった場合、_paramsに{ maxWidth: 0, maxHeight: 0 }が代入される
    // paramsがundefinedでない場合、_paramsにparamsが代入される
    let _params = params || { maxWidth: 0, maxHeight: 0 };

    // _paramsはundefinedではないことは上記で判定済みなので、?.を使わずにアクセスできる
    // ||の左辺が0なら右辺が採用される
    // ||の左辺が0以外なら左辺が採用される
    maxWidth = _params.maxWidth || maxWidth;
    maxHeight = _params.maxHeight || maxHeight;

    console.log({ maxWidth, maxHeight });
}

// if を利用せず ?. や ?? を用いて maxWidth や maxHeight を設定する関数 (resize2)
function resize2(params) {
    let maxWidth = 600;
    let maxHeight = 480;

    // paramsがundefinedだった場合、params?.はundefinedに評価され、??の左辺がundefinedになるので、右辺が評価されmaxWidth(600)になる
    // params.maxWidthが0だった場合、(params?.maxWidth)?.はundefinedに評価され、??の左辺がundefinedになるので、右辺が評価されmaxWidth(600)になる
    // params.maxWidthが0でない場合、??の左辺がundefinedにならないので、??の左辺params.maxWidthが採用される
    maxWidth = (params?.maxWidth)?.maxWidth ?? maxWidth;
    maxHeight = (params?.maxHeight)?.maxHeight ?? maxHeight;

    console.log({ maxWidth, maxHeight });
}

//maxWidthが正の整数で、maxHeightが正の整数ではない(0)の場合の確認
resize({ maxWidth: 1, maxHeight: 0 });  //=> { maxWidth: 1, maxHeight: 480 }
resize1({ maxWidth: 1, maxHeight: 0 });
resize2({ maxWidth: 1, maxHeight: 0 });
//maxHeightがundefinedの場合の確認
resize({ maxWidth: 0 });                //=> { maxWidth: 640, maxHeight: 480 }
resize1({ maxWidth: 0 });
resize2({ maxWidth: 0 });
//paramsがundefinedの場合の確認
resize();                               //=> { maxWidth: 640, maxHeight: 480 }
resize1();
resize2();
