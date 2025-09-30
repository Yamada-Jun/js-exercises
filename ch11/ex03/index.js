

export function littleToBigEndian(uint32) {
    const result = new Uint32Array(uint32.length);
    for (let i = 0; i < uint32.length; i++) {
        const value = uint32[i];
        //1byte目と4byte目を入れ替え、2byte目と3byte目を入れ替える
        result[i] |= (value & 0x000000ff) << 24;
        result[i] |= (value & 0xff000000) >>> 24;
        result[i] |= (value & 0x0000ff00) << 8;
        result[i] |= (value & 0x00ff0000) >> 8;
    }
    return result;
}

export function bigToLittleEndian(uint32) {
    //処理内容としては同じ
    return littleToBigEndian(uint32);
}

//const buffer = new Uint32Array(4);
//const buffer_2 = new Uint32Array(4);
//buffer[0] = 0x12000000;
//buffer[1] = 0x00340000;
//buffer[2] = 0x00005600;
//buffer[3] = 0x00000078;
//buffer_2[0] = 0x00000012;
//buffer_2[1] = 0x00003400;
//buffer_2[2] = 0x00560000;
//buffer_2[3] = 0x78000000;
//console.log(buffer);
//console.log(littleToBigEndian(buffer));
//console.log(buffer_2);