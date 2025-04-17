import Point from './index.js';

describe("Point class add method test", () => {
    const p1 = new Point(1, 2);
    const p2 = new Point(3, 4);
    const p3 = new Point(4, 6);
    it("return p3 when adding p1 and p2", () => {
        expect(p3).toEqual(p1.add(p2));
    });
});
