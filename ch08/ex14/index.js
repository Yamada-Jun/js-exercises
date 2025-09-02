
export function any(...functions) {
    return function (value) {
        for (const _function of functions) {
            // ‚¢‚¸‚ê‚©‚ÌŠÖ”‚ªtrue‚ð•Ô‚µ‚½‚çtrue‚ð•Ô‚·
            if (_function (value)) {
                return true;
            }
        }
        return false;
    };
}

//const isNonZero = any(
//    (n) => n > 0,
//    (n) => n < 0
//);

//console.log(isNonZero(0)); // => false
//console.log(isNonZero(42)); // => true
//console.log(isNonZero(-0.5)); // => true




export function catching(func, handler) {
    return function (...args) {
        try {
            return func(...args);   //³í‚É“®ì‚µ‚½ê‡‚Í‚»‚ÌŒ‹‰Ê‚ð•Ô‚·
        } catch (e) {
            return handler(e);      //—áŠO‚ª”­¶‚µ‚½ê‡‚ÍhandlerŠÖ”‚ðŒÄ‚Ño‚µA‚»‚ÌŒ‹‰Ê‚ð•Ô‚·
        }
    };
}

//const safeJsonParse = catching(JSON.parse, (e) => {
//    return { error: e.toString() };
//});

//console.log(safeJsonParse('{"a": 1}')); // => {a: 1}
//console.log(safeJsonParse("{Invalid Json}")); // => {error: "SyntaxError: ..."}