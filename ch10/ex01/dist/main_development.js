/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./ch10/ex01/index.cjs":
/*!*****************************!*\
  !*** ./ch10/ex01/index.cjs ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("{const stats = __webpack_require__(/*! ./stats.cjs */ \"./ch10/ex01/stats.cjs\");\r\nconst BitSet = (__webpack_require__(/*! ./sets.cjs */ \"./ch10/ex01/sets.cjs\").BitSet);\r\n\r\nlet s = new BitSet(100);\r\ns.insert(10);\r\ns.insert(20);\r\ns.insert(30);\r\nlet average = stats.mean([...s]);\r\nconsole.log(`Average of ${[...s]} is ${average}`);\n\n//# sourceURL=webpack://preset-js/./ch10/ex01/index.cjs?\n}");

/***/ }),

/***/ "./ch10/ex01/sets.cjs":
/*!****************************!*\
  !*** ./ch10/ex01/sets.cjs ***!
  \****************************/
/***/ ((module) => {

eval("{/**\r\n * The AbstractSet class defines a single abstract method, has().\r\n */\r\nclass AbstractSet {\r\n    // Throw an error here so that subclasses are forced\r\n    // to define their own working version of this method.\r\n    has(x) { throw new Error(\"Abstract method\"); }\r\n}\r\n\r\n/**\r\n * NotSet is a concrete subclass of AbstractSet.\r\n * The members of this set are all values that are not members of some\r\n * other set. Because it is defined in terms of another set it is not\r\n * writable, and because it has infinite members, it is not enumerable.\r\n * All we can do with it is test for membership and convert it to a\r\n * string using mathematical notation.\r\n */\r\nclass NotSet extends AbstractSet {\r\n    constructor(set) {\r\n        super();\r\n        this.set = set;\r\n    }\r\n\r\n    // Our implementation of the abstract method we inherited\r\n    has(x) { return !this.set.has(x); }\r\n    // And we also override this Object method\r\n    toString() { return `{ x| x ∉ ${this.set.toString()} }`; }\r\n}\r\n\r\n/**\r\n * Range set is a concrete subclass of AbstractSet. Its members are\r\n * all values that are between the from and to bounds, inclusive.\r\n * Since its members can be floating point numbers, it is not\r\n * enumerable and does not have a meaningful size.\r\n */\r\nclass RangeSet extends AbstractSet {\r\n    constructor(from, to) {\r\n        super();\r\n        this.from = from;\r\n        this.to = to;\r\n    }\r\n\r\n    has(x) { return x >= this.from && x <= this.to; }\r\n    toString() { return `{ x| ${this.from} ≤ x ≤ ${this.to} }`; }\r\n}\r\n\r\n/*\r\n * AbstractEnumerableSet is an abstract subclass of AbstractSet.  It defines\r\n * an abstract getter that returns the size of the set and also defines an\r\n * abstract iterator. And it then implements concrete isEmpty(), toString(),\r\n * and equals() methods on top of those. Subclasses that implement the\r\n * iterator, the size getter, and the has() method get these concrete\r\n * methods for free.\r\n */\r\nclass AbstractEnumerableSet extends AbstractSet {\r\n    get size() { throw new Error(\"Abstract method\"); }\r\n    [Symbol.iterator]() { throw new Error(\"Abstract method\"); }\r\n\r\n    isEmpty() { return this.size === 0; }\r\n    toString() { return `{${Array.from(this).join(\", \")}}`; }\r\n    equals(set) {\r\n        // If the other set is not also Enumerable, it isn't equal to this one\r\n        if (!(set instanceof AbstractEnumerableSet)) return false;\r\n\r\n        // If they don't have the same size, they're not equal\r\n        if (this.size !== set.size) return false;\r\n\r\n        // Loop through the elements of this set\r\n        for(let element of this) {\r\n            // If an element isn't in the other set, they aren't equal\r\n            if (!set.has(element)) return false;\r\n        }\r\n\r\n        // The elements matched, so the sets are equal\r\n        return true;\r\n    }\r\n}\r\n\r\n/*\r\n * SingletonSet is a concrete subclass of AbstractEnumerableSet.\r\n * A singleton set is a read-only set with a single member.\r\n */\r\nclass SingletonSet extends AbstractEnumerableSet {\r\n    constructor(member) {\r\n        super();\r\n        this.member = member;\r\n    }\r\n\r\n    // We implement these three methods, and inherit isEmpty, equals()\r\n    // and toString() implementations based on these methods.\r\n    has(x) { return x === this.member; }\r\n    get size() { return 1; }\r\n    *[Symbol.iterator]() { yield this.member; }\r\n}\r\n\r\n/*\r\n * AbstractWritableSet is an abstract subclass of AbstractEnumerableSet.\r\n * It defines the abstract methods insert() and remove() that insert and\r\n * remove individual elements from the set, and then implements concrete\r\n * add(), subtract(), and intersect() methods on top of those. Note that\r\n * our API diverges here from the standard JavaScript Set class.\r\n */\r\nclass AbstractWritableSet extends  AbstractEnumerableSet {\r\n    insert(x) { throw new Error(\"Abstract method\"); }\r\n    remove(x) { throw new Error(\"Abstract method\"); }\r\n\r\n    add(set) {\r\n        for(let element of set) {\r\n            this.insert(element);\r\n        }\r\n    }\r\n\r\n    subtract(set) {\r\n        for(let element of set) {\r\n            this.remove(element);\r\n        }\r\n    }\r\n\r\n    intersect(set) {\r\n        for(let element of this) {\r\n            if (!set.has(element)) {\r\n                this.remove(element);\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n/**\r\n * A BitSet is a concrete subclass of AbstractWritableSet with a\r\n * very efficient fixed-size set implementation for sets whose\r\n * elements are non-negative integers less than some maximum size.\r\n */\r\nclass BitSet extends AbstractWritableSet {\r\n    constructor(max) {\r\n        super();\r\n        this.max = max;  // The maximum integer we can store.\r\n        this.n = 0;      // How many integers are in the set\r\n        this.numBytes = Math.floor(max / 8) + 1;   // How many bytes we need\r\n        this.data = new Uint8Array(this.numBytes); // The bytes\r\n    }\r\n\r\n    // Internal method to check if a value is a legal member of this set\r\n    _valid(x) { return Number.isInteger(x) && x >= 0 && x <= this.max; }\r\n\r\n    // Tests whether the specified bit of the specified byte of our\r\n    // data array is set or not. Returns true or false.\r\n    _has(byte, bit) { return (this.data[byte] & BitSet.bits[bit]) !== 0; }\r\n\r\n    // Is the value x in this BitSet?\r\n    has(x) {\r\n        if (this._valid(x)) {\r\n            let byte = Math.floor(x / 8);\r\n            let bit = x % 8;\r\n            return this._has(byte, bit);\r\n        } else {\r\n            return false;\r\n        }\r\n    }\r\n\r\n    // Insert the value x into the BitSet\r\n    insert(x) {\r\n        if (this._valid(x)) {               // If the value is valid\r\n            let byte = Math.floor(x / 8);   // convert to byte and bit\r\n            let bit = x % 8;\r\n            if (!this._has(byte, bit)) {    // If that bit is not set yet\r\n                this.data[byte] |= BitSet.bits[bit]; // then set it\r\n                this.n++;                            // and increment set size\r\n            }\r\n        } else {\r\n            throw new TypeError(\"Invalid set element: \" + x );\r\n        }\r\n    }\r\n\r\n    remove(x) {\r\n        if (this._valid(x)) {              // If the value is valid\r\n            let byte = Math.floor(x / 8);  // compute the byte and bit\r\n            let bit = x % 8;\r\n            if (this._has(byte, bit)) {    // If that bit is already set\r\n                this.data[byte] &= BitSet.masks[bit];  // then unset it\r\n                this.n--;                              // and decrement size\r\n            }\r\n        } else {\r\n            throw new TypeError(\"Invalid set element: \" + x );\r\n        }\r\n    }\r\n\r\n    // A getter to return the size of the set\r\n    get size() { return this.n; }\r\n\r\n    // Iterate the set by just checking each bit in turn.\r\n    // (We could be a lot more clever and optimize this substantially)\r\n    *[Symbol.iterator]() {\r\n        for(let i = 0; i <= this.max; i++) {\r\n            if (this.has(i)) {\r\n                yield i;\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n// Some pre-computed values used by the has(), insert() and remove() methods\r\nBitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);\r\nBitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);\r\n\r\nmodule.exports = { BitSet };\r\n\n\n//# sourceURL=webpack://preset-js/./ch10/ex01/sets.cjs?\n}");

/***/ }),

/***/ "./ch10/ex01/stats.cjs":
/*!*****************************!*\
  !*** ./ch10/ex01/stats.cjs ***!
  \*****************************/
/***/ ((module) => {

eval("{// This is how we could define a stats module\r\nconst stats = (function() {\r\n    // Utility functions private to the module\r\n    const sum = (x, y) => x + y;\r\n    const square = x => x * x;\r\n\r\n    // A public function that will be exported\r\n    function mean(data) {\r\n        return data.reduce(sum)/data.length;\r\n    }\r\n\r\n    // A public function that we will export\r\n    function stddev(data) {\r\n        let m = mean(data);\r\n        return Math.sqrt(\r\n            data.map(x => x - m).map(square).reduce(sum)/(data.length-1)\r\n        );\r\n    }\r\n\r\n    // We export the public function as properties of an object\r\n    return { mean, stddev };\r\n}());\r\n\r\n// And here is how we might use the module\r\nstats.mean([1, 3, 5, 7, 9])   // => 5\r\nstats.stddev([1, 3, 5, 7, 9]) // => Math.sqrt(10)\r\n\r\nmodule.exports = stats;\n\n//# sourceURL=webpack://preset-js/./ch10/ex01/stats.cjs?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ch10/ex01/index.cjs");
/******/ 	
/******/ })()
;