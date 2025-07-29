
export let point = {
    r: 0,
    theta: 0,

    get x() {
        return this.r * Math.cos(this.theta);
    },
    get y() {
        return this.r * Math.sin(this.theta);
    },
    set x(value) {
        if (isNaN(value)) {
            throw new Error();
        }
        const _y = this.y; // Œ»İ‚Ìy‚ğæ“¾,this.y‚ğg‚¤‚Ægetter‚ğ’Ê‚µ‚ÄŒvZ‚³‚ê‚½’l‚É‚È‚Á‚Ä‚µ‚Ü‚¤
        this.r = Math.sqrt(value * value + _y * _y);
        this.theta = Math.atan2(_y, value);
    },
    
    set y(value) {
        if (isNaN(value)) {
            throw new Error();
        }
        const _x = this.x; // Œ»İ‚Ìx‚ğæ“¾
        this.r = Math.sqrt(_x * _x + value * value);
        this.theta = Math.atan2(value, _x);
    }
}

