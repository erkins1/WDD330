/* An object for a todo item */


export default class ToDoItem {
    constructor(todo_Name){
        this.Timestamp = Date.now();
        this.Name = todo_Name;
        this.Status = false;
    }

    //Getters
    getTimestamp(){
        return this.Timestamp;
    }

    getName(){
        return this.Name;
    }

    getStatus(){
        return this.Status;
    }

    //Setters
    setName(new_Name){
        this.Name = new_Name;
    }

    setStatus(complete){
        this.Status = complete;
    }

    //Other Functions
    toString(){
        let output = `\nTimestamp: ${this.Timestamp}\nName: ${this.Name}\nStatus: ${this.Status}`;
        return output;
    }

}