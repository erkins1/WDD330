//Event Listeners
const searchFrm = document.querySelector('#searchFrm')
searchFrm.addEventListener('submit', searchLighthouses);


//Event Functions
function searchLighthouses(event){
    event.preventDefault(); //Prevent the page refresh
    
    let query = searchFrm.srchStr.value;
    let data = getLighthouseData();

    //Make sure search is not empty
    if(query == ""){
        window.alert("Please, do not leave the search field blank!");
        return;
    }

    const srchResults = document.querySelector('#srchResults');
    srchResults.innerHTML = "";
    let srchArray = [];
    data.forEach(element => {
        if(element.Name.toUpperCase().includes(query.toUpperCase())){
            console.log(element.Name);
            let li = document.createElement('li');
            
            li.innerHTML = element.Name;
            li.classList.add('srchResult');
            li.dataset.id = element.id;
            
            srchResults.appendChild(li);
            srchArray.push(element);
        }
    });

    if(srchArray.length > 0){
        srchResultEvents();
        //Make them show up on the map
        customMarkers(srchArray);
        //Maybe include a click event so that clicking will show you their name
        //Then you can easily add them to the vacation plan
    } else {
        srchResults.innerHTML = `<li>No search results for "<em>${query}</em>"</li>`;
    }
}

//Adds event listeners for each search result
function srchResultEvents(){
    console.log('adding events');
    document.querySelectorAll('.srchResult').forEach(element =>{
        element.addEventListener('touchend', (event) => {
            buildHighlightDiv(event.target.dataset.id, true);
        });
    });
}
