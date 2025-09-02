export class C {
    count = 0;
    get x() {
        return this.count++;
    }
}


const c = new C();
console.log(c.x); // 0
console.log(c.x); // 1