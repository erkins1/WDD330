/* Class definition for the ToDo object */

import ToDoItem from "./todoItem.js";


export default class ToDo {
    //Constructor check for or builds a todo array in local storage
    //Does this actually need to do anything?
    //Is it better to just save the elementId here?
    constructor(){
        this.todoList = localStorage.getItem("myToDoList");
        console.log(this.todoList);
    }

    //Build the entire todo list
    displayToDoList(elementId) {

    }

    //Override to filter the list by completion
    displayToDoList(elementId, filter){

    }

    addToDoItem(todo_item){
        this.todoList.push(new ToDoItem(todo_item));
        updateLocal();
    }

}

//Temporary function during testing
function createFakeList(){
    this.todoList = [new ToDoItem("Item1"), new ToDoItem("Item2"), new ToDoItem("LastItem")];
    console.log(this.todoList);
    localStorage.setItem("myToDoList", JSON.stringify(this.todoList));
}

function getFromLocal(){
    this.todoList = localStorage.getItem("myToDoList");
    console.log(this.todoList);
}

function updateLocal(){
    localStorage.setItem("myToDoList", JSON.stringify(this.todoList))
}
