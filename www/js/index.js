var map, pointarray, heatmap;

var data;
var heatmapData = [];
var CrimesDataCat = [];
var Description = [];
var Date_of_Crimes = [];
var userLocationLat = 0.0;
var userLocationLon = 0.0;
var location_lat = [];
var location_long = [];




// Get Location

function getGeolocation(){  

  var Options = { enableHighAccuracy: false };

  navigator.geolocation.getCurrentPosition(geolocationSuccess, onError, Options);

  function geolocationSuccess(position) {

    var loc = position.coords.latitude+","+position.coords.longitude;
    location_lat.push(position.coords.latitude); 
    location_long.push(position.coords.longitude); 

  }

  // onError Callback receives a PositionError object
  //
  function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
  }

}


function initialize() { 
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
    
    
    var mapOptions = {
        center: { lat: 50.3714, lng: -4.1422},
        zoom: 14,
        styles: styles
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
                              mapOptions);

    
    var pointArray = new google.maps.MVCArray(heatmapData);

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointArray,
    });
    
    heatmap.setMap(map);
  
    getGeolocation()
    
    alert("map data loaded")

    google.maps.event.addListener(map, "click", function (event) {
        userLocationLat = event.latLng.lat();
        userLocationLon = event.latLng.lng();
        console.log( userLocationLat + ', ' + userLocationLon );
        
        document.getElementById("container").innerHTML = ""; 
        
        for (var i = 0; i < heatmapData.length; i++) {
            
            if ((Math.abs(userLocationLat - heatmapData[i].k) < 0.0002) && (Math.abs(userLocationLon - heatmapData[i].D) < 0.0002))  {
        var arrayLoc = i        
        
        console.log(CrimesDataCat[arrayLoc]);
        
        if(CrimesDataCat[arrayLoc] === "anti-social-behaviour" ) {       
            document.getElementById('violinPlay').play();
        } else if (CrimesDataCat[arrayLoc] === "shoplifting" ){
           document.getElementById('bassPlay').play();
        }    
                
                $("#container").append('<li id="list'+i+'" onclick="drag(list'+i+')" > <h3>' + CrimesDataCat[arrayLoc] + '</h3><p class="text" >'+ Description[arrayLoc] +'</p><p class="date">'+Date_of_Crimes[arrayLoc]+'</p></li>');
//        console.log("close");
             
            }
        }

    });
    
}


function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}


function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function drag(item) {
    var dragCounter = 0;
    $(item).css("opacity", 1 );

    $drag_counter_item = $( item );
    
    $( item ).draggable({revert: true, axis: "x" });
    
    $( item ).draggable({drag: function() {
            dragCounter++;            
            updateCounterStatus( $drag_counter_item, dragCounter );
        }
    });
                                    
}

function updateCounterStatus( item, new_counter ) {
//    console.log(new_counter*5);
    opacity_N  = map_range(new_counter*5, 0, 200, 1.0, 0.0);
    
    $(item).css("opacity", opacity_N );
    if (new_counter*5 > 200) {
        $(item).remove();          
    }
    
}


function sendMyAjax(URL_address){
    $.ajax({
         dataType: 'json',
         url: URL_address,
    }).done(function(json) {
        console.log(json)    
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

for (var i = 7; i <= 12; i++) {
    if (i < 10) {
        sendMyAjax("http://data.police.uk/api/crimes-street/all-crime?lat=50.375456&lng=-4.142656&date=2014-0" + i, i)
    }
    else if (i > 9) {
        sendMyAjax("http://data.police.uk/api/crimes-street/all-crime?lat=50.375456&lng=-4.142656&date=2014-" + i, i)    
    }        
}

google.maps.event.addDomListener(window, 'load', initialize);


// Swipe Pop-up Away








