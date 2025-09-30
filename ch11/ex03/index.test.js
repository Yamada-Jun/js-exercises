import { littleToBigEndian, bigToLittleEndian } from "./index.js";

test("ch11_ex03", () => {
    const buffer = new Uint32Array(4);
    const buffer_2 = new Uint32Array(4);
    buffer[0] = 0x12000000;
    buffer[1] = 0x00340000;
    buffer[2] = 0x00005600;
    buffer[3] = 0x00000078;
    buffer_2[0] = 0x00000012;
    buffer_2[1] = 0x00003400;
    buffer_2[2] = 0x00560000;
    buffer_2[3] = 0x78000000;
    expect(littleToBigEndian(buffer)).toEqual(buffer_2);
    expect(bigToLittleEndian(buffer)).toEqual(buffer_2);
});
