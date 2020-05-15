/* Reading examples */

/* 8.1 Retry */

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) {
        return a * b;
    } else {
        throw new MultiplicatorUnitFailure("Klunk");
    }
}

function reliableMultiply(a, b) {
    let success = false;
    let result = 0;
    while (!success) {
        try {
            result = primitiveMultiply(a, b);
            success = true;
        } catch(e){
            if (!(e instanceof MultiplicatorUnitFailure)){
                throw e;
            }
        }
    } 
    return result;

}

console.log(reliableMultiply(8, 8));
// → 64




/* 8.2 The locked box */

/* It is a box with a lock. There is an array in the box, but you can get at it 
only when the box is unlocked. Directly accessing the private _content property 
is forbidden.

Write a function called withBoxUnlocked that takes a function value as argument, 
unlocks the box, runs the function, and then ensures that the box is locked again 
before returning, regardless of whether the argument function returned normally 
or threw an exception.

For extra points, make sure that if you call withBoxUnlocked when the box is 
already unlocked, the box stays unlocked
*/

const box = {
    locked: true,
    unlock() {
        this.locked = false;
    },
    lock() {
        this.locked = true;
    },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(body) {
    box.unlock();

    try {
        return body();
    } catch (e) {
        //console.log(e);
        //box.unlock();
    } finally {
        box.lock();
        return;
    }
}

withBoxUnlocked(function () {
    box.content.push("gold piece");
});

try {
    withBoxUnlocked(function () {
        throw new Error("Pirates on the horizon! Abort!");
    });
} catch (e) {
    console.log("Error raised: " + e);
}
console.log(box.locked);
console.log(box);
// → true