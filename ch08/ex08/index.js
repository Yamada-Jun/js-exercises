function counter() {
    let n = 0;
    return {
        count: function () { return n++; },
        reset: function () { n = 0; },
        getcount: function () { return n; } //副作用を発生させずcountの値を取得するためのメソッド
    };
}

export function counterGroup() {
    let counters = [];
    return {
        newCounter: function() {
            const c = counter(0);
            counters.push(c);
            return c;
        },
        total: function () {
            return counters.reduce((sum, c) => sum + c.getcount(), 0);
        },
        average: function () {
            if (counters.length === 0) {
                throw new TypeError();
            }
            return (counters.reduce((sum, c) => sum + c.getcount(), 0) / counters.length);
        },
        variance: function () {
            if (counters.length < 2) {
                throw new TypeError();
            }
            let avg = this.average();
            return (counters.reduce((sum, c) => sum + Math.pow(c.getcount() - avg, 2), 0) / counters.length);
        }
    };
}
