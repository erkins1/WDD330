/* Reading example */

/* Javascript novice to ninja p. 161 */
const quiz = [
    ["What is Superman's real name?", "Clark Kent"],
    ["What is Wonder Woman's real name?", "Diana Prince"],
    ["What is Batman's real name?", "Bruce Wayne"]
];

function start(quiz) {
    let score = 0;
    // main game loop
    for (const [question, answer] of quiz) {
        const response = ask(question);
        check(response, answer);
    }
    // end of main game loop
    gameOver();
    // function declarations
    function ask(question) {
        return prompt(question);
    }

    function check(response, answer) {
        if (response === answer) {
            alert('Correct!');
            score++;
        } else {
            alert(`Wrong! The correct answer was ${answer}`);
        }
    }

    function gameOver() {
        alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);
    }
}

function btnBeginQuiz() {
    start(quiz);
}

/* Reverse Array */
function btnReverseArray() {
    let output = "Reversed Arrays:<br>"


    output += reverseArray(["A", "B", "C"]);
    // → ["C", "B", "A"];

    output += "<br>";

    let arrayValue = [1, 2, 3, 4, 5];
    reverseArrayInPlace(arrayValue);
    output += arrayValue;
    // → [5, 4, 3, 2, 1]

    document.getElementById("ex2Output").innerHTML = output;
}

function reverseArray(newArray) {
    let last = newArray.length - 1;
    const reversedArray = [];

    for (i = 0; i < newArray.length; i++) {
        reversedArray[i] = newArray[last];
        last--;
    }

    return reversedArray;
}

function reverseArrayInPlace(arrayValue){
    let len = arrayValue.length - 1;

    for (i = 0; i < arrayValue.length; i++) {
        arrayValue.splice(i, 0, arrayValue[len]);
        arrayValue.pop();
    }

    return arrayValue;
}


/* TeamActivity */

function calculate() {
    var input = document.getElementById("usrInput").value;

    if (!checkNum(input)) {
        return;
    }

    var output = addNumbers(input);

    document.getElementById("output").innerHTML = output;

}

function checkNum(number) {
    if (!isNaN(number)) {
        return true;
    } else {
        document.getElementById("output").innerHTML = "Make sure you type in a valid number!";
        //alert("Make sure you type in a valid number!");
        return false;
    }
}

function addNumbers(number) {
    var sum = 0;
    for (i = 1; i <= number; i++) {
        sum += i;
    }

    return sum;
}

//This is our calculators controller
function calc2Nums(type) {
    var num1 = document.getElementById("usrInput").value;
    var num2 = document.getElementById("usrInput2").value;

    if (!checkNum(num1) || !checkNum(num2)) {
        return;
    }

    var output = 0;

    switch (type) {
        case 'add':
            output = addition(num1, num2);
            break;
        case 'sub':
            output = subtract(num1, num2);
            break;
        case 'mult':
            output = multiply(num1, num2);
            break;
        case 'div':
            output = divide(num1, num2);
            break;
    }

    document.getElementById("output").innerHTML = output;

}

function addition(num1, num2) {
    var sum = parseInt(num1) + parseInt(num2);
    return sum;
}

function subtract(num1, num2) {
    var sum = parseInt(num1) - parseInt(num2);
    return sum;
}

function multiply(num1, num2) {
    var sum = parseInt(num1) * parseInt(num2);
    return sum;
}

function divide(num1, num2) {
    var sum = parseInt(num1) / parseInt(num2);
    return sum;
}