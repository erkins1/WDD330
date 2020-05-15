/* Reading examples */

/* 6.2 Groups - Eloquent Javasript */

class Group {
    //Creates an empty group
    constructor(){
        this.members = [];
    }

    static from(values){
        let group = new Group;
        values.forEach(value => {
            group.add(value);
        });
        return group;
    }

    //Add a value if it doesn't already exist
    add(value){
        if(this.has(value) === false){
            this.members.push(value);
            return true;
        } else {
            return false;
        }
    }
    //Delete a value if it exists
    delete(value){
        if(this.has(value) === false){
            return false;
        } else {
            this.members.splice(this.members.indexOf(value), 1);
            return true;
        }
    }
    //Has returns if value exists
    has(value){
        let index = this.members.indexOf(value);
        if(index == -1){
            return false;
        } else {
            return true;
        }
    }
    //Count returns number of items in group
    count(){
        return this.members.length;
    }

    [Symbol.iterator](){
        return new GroupIterator(this);
    }
}


let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false


/* 6.3 Iterable Groups */

class GroupIterator {
    constructor(group){
        this.group = group;
        this.index = 0;
    }

    next(){
        if(this.index >= this.group.count()){
            return {done: true};
        }

        let value = this.group.members[this.index];
        this.index++;
        
        return {value, done: false};
    }

}


for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}
