import { equalArrays } from "./index.js";

test("ch03-ex07", () => {
  const x = 1; // ここを変更(→変更不要)
  const y = 2; // ここを変更(→変更不要)

  expect(equalArrays(x, y)).toBe(true);
  expect(x).not.toEqual(y);
});
