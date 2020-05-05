"use strict";
/* Reading examples */

/* Ex. 1 - Balloon *
document.body.addEventListener('keyup', (event) => {
    console.log(event.key);
    if(event.key == 'ArrowUp'){
        growBalloon();
    }
    else if (event.key == 'ArrowDown'){
        shrinkBalloon();
    }
});*/

//Add the event listener
document.body.addEventListener('keyup', balloonController);

// Set the balloon to an initial size 
document.getElementById('balloon').style.fontSize = 20 + "px";

//Determine if the balloon grows or shrinks
function balloonController(event){
    console.log(event.key);
    if(event.key == 'ArrowUp'){
        growBalloon();
    }
    else if (event.key == 'ArrowDown'){
        shrinkBalloon();
    }
}

//Increase the font size of the balloon
function growBalloon(){
    let balloon = document.getElementById('balloon');
    let size = parseInt(balloon.style.fontSize.replace("px", ""));

    console.log(size);

    if (size >= 55){
        balloon.innerHTML = "💥";
        document.body.removeEventListener('keyup', balloonController);
    } else {
        balloon.style.fontSize = (size * 1.1) + "px";
    }


}

//Decrease the font size of the balloon
function shrinkBalloon(){
    let balloon = document.getElementById('balloon');
    let size = parseInt(balloon.style.fontSize.replace("px", ""));

    console.log(size);
    balloon.style.fontSize = (size * .9) + "px";
}

/* TeamActivity */

