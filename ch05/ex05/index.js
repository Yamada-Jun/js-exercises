export function f(o) {
    const new_obj = {};
    //�����̒l�݂̂��R�s�[
    for (const key in o) {
        if (o[key] % 2 === 0) {
            new_obj[key] = o[key];
        }
    }
    return new_obj;
}


const o = { x: 1, y: 2, z: 3 };
console.log(f(o)); // { y: 2 }
console.log(o); // { x: 1, y: 2, z: 3 } ���̃I�u�W�F�N�g�͕ύX���Ȃ�
