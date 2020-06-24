/* Reading examples */


/* TeamActivity */

fetch('https://swapi.dev/api/people/')
    .then(response => response.json())
    .then(people => {
        people.results.forEach(element => {
            console.log(element);
        });
    });