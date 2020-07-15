function getLighthouseData(){
    var json = null;
    jQuery.ajax({
      'async': false,
      'global': false,
      'url': "./lighthousesCleaned.json",
      'dataType': "json",
      'success': function(data) {
        json = data;
      }
    });
    return json;
}

var newArray = [];
var data = getLighthouseData();
//var i = 1;

data.forEach(element => {
    newArray.push({
        id: element.id,
        Name: element.Name,
        State: element.State,
        District: element.District,
        Latitude: element.Latitude,
        Longitude: -element.Longitude
    });
});

console.log(JSON.stringify(newArray));