document.addEventListener("deviceready", onDeviceReady, false);


var pointarray, heatmap;

var styles = [
  {
    "stylers": [
      { "saturation": 22 },
      { "invert_lightness": true },
      { "lightness": 16 },
      { "weight": 2 },
      { "hue": "#00ccff" }
    ]
  }
];


var data;
var heatmapData = [];
var CrimesDataCat = [];
var Description = [];
var Date_of_Crimes = [];
var userLocationLat = 0.0;
var userLocationLon = 0.0;
var location_lat = 0;
var location_long = 0;
var Record_Coordinates = [];
<<<<<<< HEAD
var route = [
  new google.maps.LatLng(37.772323, -122.214897),
  new google.maps.LatLng(21.291982, -157.821856),
  new google.maps.LatLng(-18.142599, 178.431),
  new google.maps.LatLng(-27.46758, 153.027892)
];
function initialize() {  
  console.log(location_lat +" "+ location_long);

//  var styles = [
//    {
//      "stylers": [
//        { "saturation": 22 },
//        { "invert_lightness": true },
//        { "lightness": 16 },
//        { "weight": 2 },
//        { "hue": "#00ccff" }
//      ]
//    }
//  ];
//
=======
var route = [];
<<<<<<< HEAD
>>>>>>> phonegap
=======
var bounds;


var mapOptions = {
  center: { lat: location_lat, lng: location_long},
  zoom: 14,
  styles: styles
};

var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


var intervalID;
>>>>>>> phonegap

/////// SOUNDS ////////
var bass = document.createElement('audio');
bass.setAttribute('src', 'wav/bassLouder.wav');
bass.setAttribute('preload', 'auto');
bass.setAttribute('loop', 'true');

var publicOrderSound = document.createElement('audio');
publicOrderSound.setAttribute('src', 'wav/deux.wav');
publicOrderSound.setAttribute('preload', 'auto');


function initialize() { 
//  console.log(location_lat +" "+ location_long);
  
  var pointArray = new google.maps.MVCArray(heatmapData);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray,
  });

//  heatmap.setMap(map);
  
  intervalID = window.setInterval(get_current_loc, 5000);
}

function begin() {
  var id = document.getElementById("startElement");
  id.parentNode.removeChild(id);
  get_current_loc();
  
  $("#map-canvas").css("height", "90vh");
  $("#endButton").css("display", "block");
  bass.play();

}
function get_current_loc() {
  console.log("running");
  var Options = { enableHighAccuracy: true };
  
  navigator.geolocation.getCurrentPosition(geolocationSuccess, onError, Options);

  function geolocationSuccess(position) {

    Record_Coordinates.push( position.coords.latitude, position.coords.longitude );
    route.push( new google.maps.LatLng( position.coords.latitude, position.coords.longitude ));
//    console.log( Record_Coordinates );

    userLocationLat = Record_Coordinates[Record_Coordinates.length-2];
    userLocationLon = Record_Coordinates[Record_Coordinates.length-1];
//    console.log( userLocationLat + ', ' + userLocationLon );

    document.getElementById("container").innerHTML = ""; 

    for (var i = 0; i < heatmapData.length; i++) {

      if ((Math.abs(userLocationLat - heatmapData[i].k) < 0.0002) && (Math.abs(userLocationLon - heatmapData[i].D) < 0.0002))  {
        var arrayLoc = i        

        console.log(CrimesDataCat[arrayLoc]);


        //////////////////////////////////////////////////////
        // Play sound files ///////////////////////////////////
        //////////////////////////////////////////////////////
        if(CrimesDataCat[arrayLoc] === "anti-social-behaviour" ) {       
//          document.getElementById('violinPlay').play();
        } else if (CrimesDataCat[arrayLoc] === "shoplifting" ){
//          document.getElementById('bassPlay').play();
        } else if (CrimesDataCat[arrayLoc] === "public-order" ) {
          publicOrderSound.play();  
        }
        //////////////////////////////////////////////////////



        $("#container").append('<li id="list'+i+'" > <h3>' + CrimesDataCat[arrayLoc] + '</h3><p class="text" >'+ Description[arrayLoc] +'</p><p class="date">'+Date_of_Crimes[arrayLoc]+'</p></li>');
        //        console.log("close");

      }
    }
    
    var path = new google.maps.Polyline({
      path: route,
      geodesic: true,
      strokeColor: '#00baff',
      strokeOpacity: 1.0,
      strokeWeight: 5
    });

    path.setMap(map);

  }

}


// last 

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);

  
}


function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

// 1st 

function sendMyAjax(URL_address){
  $.ajax({
    dataType: 'json',
    url: URL_address,
  }).complete(function () {
    // callback stuff
  })
    .done(function(json) {
    //    console.log(json)    
    for (var i = 0; i < json.length; i++){

      var randomLat = (Math.random() * (0.001 - 0.00005) + 0.00005).toFixed(7)    
      var randomLon = (Math.random() * (0.0015 - 0.00005) + 0.00005).toFixed(7)

      var newLat = parseFloat(json[i].location.latitude) + parseFloat(randomLat);  
      var newLon = parseFloat(json[i].location.longitude) + parseFloat(randomLon);

      heatmapData.push( new google.maps.LatLng( newLat , newLon) );

      CrimesDataCat.push( json[i].category );

      Description.push( json[i].location.street.name );

      Date_of_Crimes.push( json[i].month );
    }


    // console.log(heatmapData);

    google.maps.event.trigger(map, 'resize');
  });
};




// Get Location

function getGeolocation(){

  var Options = { enableHighAccuracy: false };

  navigator.geolocation.getCurrentPosition(geolocationSuccess, onError, Options);

}


function geolocationSuccess(position) {

   location_lat = position.coords.latitude;
   location_long = position.coords.longitude;

//  console.log(location_lat +" "+ location_long);

  for (var i = 7; i <= 12; i++) {
    if (i < 10) {
      sendMyAjax("http://data.police.uk/api/crimes-street/all-crime?lat="+location_lat+"&lng="+location_long+"&date=2014-0" + i, i)
    }
    else if (i > 9) {
      sendMyAjax("http://data.police.uk/api/crimes-street/all-crime?lat="+location_lat+"&lng="+location_long+"&date=2014-" + i, i)    
    }        
  }
  mapOptions = {
    center: { lat: location_lat, lng: location_long},
    zoom: 14,
    styles: styles
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  return location_lat, location_long;

}

// onError Callback receives a PositionError object
function onError(error) {
  alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}


function end() {
  heatmap.setMap(map);
//  heatmap.setMap(heatmap.getMap() ? null : map);
  clearInterval(intervalID);
  
//  bounds = new google.maps.LatLngBounds();
  
//  for (var i = 0; i < Record_Coordinates.length; i+=2) {
//    console.log(Record_Coordinates[i]);
////    bounds.extend(Record_Coordinates[i],Record_Coordinates[i+1]);
//  }
//  
  var bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(Record_Coordinates[0],Record_Coordinates[1]),
    new google.maps.LatLng(Record_Coordinates[Record_Coordinates.length-2], Record_Coordinates[Record_Coordinates.length-1])
  );
  
  map.fitBounds(bounds);
}

function onDeviceReady() {  
  getGeolocation();

  google.maps.event.addDomListener(window, 'load', initialize);
}





