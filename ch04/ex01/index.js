
export function add(a, b) {
    return {
        real: a.real + b.real,
        imag: a.imag + b.imag
    };
}

export function sub(a, b) {
    return {
        real: a.real - b.real,
        imag: a.imag - b.imag
    };
}

export function mul(a, b) {
    return {
        real: a.real * b.real - a.imag * b.imag,
        imag: a.real * b.imag + a.imag * b.real
    };
}

export function div(a, b) {
    const denominator = b.real * b.real + b.imag * b.imag;
    return {
        real: (a.real * b.real + a.imag * b.imag) / denominator,
        imag: (a.imag * b.real - a.real * b.imag) / denominator
    };
}
