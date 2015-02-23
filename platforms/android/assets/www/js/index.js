
//document.addEventListener('deviceready', onDeviceReady, false);
//function onDeviceReady(){ 
//    var db = window.openDatabase("Database", "1.0", "Demo", 200000);
//    db.transaction(populateDB, errorDB);
//}


///////////////////////////////////////////////////////////////////
///////////////////// Variables
///////////////////////////////////////////////////////////////////

// Variables for Picture Database
var len_of_pic;
var Id_of_item;
var src_p;
var Photo_id;
var Id_of;
var Rate_2;

// Variables for Database Item
var id;
var len;

var Title;
var Length;
var Rate;

var $img;
var src;

var loction;
var Geolocation;


// Variables for map
var map;
var Lat;
var Long;
var Address_R;
var id_for_map;
var ID_of_route;

// Record
var Record_Coordinates = [];
var timer = null, 
    interval = 3000;


///////////////////////////////////////////////////////////////////
///////////////////// Open Databases
///////////////////////////////////////////////////////////////////

var Picture = window.openDatabase("Database_Picture", "1.0", "Picture", 200000);

var Loction_Route = window.openDatabase("Database_Route", "1.0", "Route", 200000);


var db = window.openDatabase("Database", "1.0", "Location", 200000);
db.transaction(populateDB, errorDB);






///////////////////////////////////////////////////////////////////
///////////////////// Error's
///////////////////////////////////////////////////////////////////

function errorDB(err) {
    console.log("01 Error processing SQL: " + err.code);
}

function errorCB(err) {
    console.log("02 Error processing SQL: "+err.code);
}

function errorPic(err) {
    console.log("01 Error processing SQL: " + err.code);
}

function errorCB_Pic(err) {
    console.log("02 Error processing SQL: "+err.code);
}

function errorRoute(err) {
    console.log("01 Error processing SQL: " + err.code);
}

function errorCDRoute(err) {
    console.log("02 Error processing SQL: "+err.code);
}




///////////////////////////////////////////////////////////////////
///////////////////// Populate Databases
///////////////////////////////////////////////////////////////////


// Populate Items Location 

function populateDB(tx) {
 //   tx.executeSql( 'DROP TABLE IF EXISTS Location' );

    tx.executeSql( 'CREATE TABLE IF NOT EXISTS Location (ID, Title, URL, Rate_added, Rate_Number, Rate, Loction, Img_Url, Length)' );
    
//    tx.executeSql( 'INSERT INTO Location (ID, Title, URL, Rate_added, Rate_Number, Rate, Loction, Img_Url, Length) VALUES (0, "Dartmoor", "Dartmoor", 16, 12, 5, "Princetown", "img/main/Great_Staple_tor_DSC4195.jpg", 4.4 )' );
//    
//    tx.executeSql( 'INSERT INTO Location (ID, Title, URL, Rate_added, Rate_Number, Rate, Loction, Img_Url, Length) VALUES (1, "Coastal", "Coastal", 50, 10, 3, "Heybrook-Bay", "img/main/south-devon.jpg", 2.1 )' );
//    
//    tx.executeSql( 'INSERT INTO Location (ID, Title, URL, Rate_added, Rate_Number, Rate, Loction, Img_Url, Length) VALUES (2, "Snowdonia", "snowdonia", 80, 30, 1, "snowdonia", "img/main/20121027-IMG_4141.jpg", 6.3 )' );
    
    tx.executeSql('SELECT * FROM Location ORDER BY Rate ASC', [], querySuccess, errorCB);
    
}


// Populate Picture 

function populateDB_Picture(tx) {
  // tx.executeSql( 'DROP TABLE IF EXISTS Picture' );

    tx.executeSql( 'CREATE TABLE IF NOT EXISTS Picture (ID ,ID_of_Picture, IMG_URL)' );

//    tx.executeSql( 'INSERT INTO Picture (ID ,ID_of_Picture, IMG_URL) VALUES (0,"Photo0", "img/main/Great_Staple_tor_DSC4195.jpg")' );
//    tx.executeSql( 'INSERT INTO Picture (ID ,ID_of_Picture, IMG_URL) VALUES (1, "Photo1", "img/main/south-devon.jpg")' );
//    tx.executeSql( 'INSERT INTO Picture (ID ,ID_of_Picture, IMG_URL) VALUES (2, "Photo2", "img/main/20121027-IMG_4141.jpg")' );


    tx.executeSql('SELECT * FROM Picture LIMIT 9', [], querySuccess_Picture, errorCB);
}


// Populate Route 

function populate_Loction_Route(tx) {
 //   tx.executeSql( 'DROP TABLE IF EXISTS Route' );

    tx.executeSql( 'CREATE TABLE IF NOT EXISTS Route (ID, City, Latitude, Longitude)' );

//    tx.executeSql( 'INSERT INTO Route (ID, City, Latitude, Longitude) VALUES (0, "Heybrook-Bay",  50.319807, -4.113720 )' );
//    tx.executeSql( 'INSERT INTO Route (ID, City, Latitude, Longitude) VALUES (1, "Heybrook-Bay", 50.320044, -4.118650 )' );
//    tx.executeSql( 'INSERT INTO Route (ID, City, Latitude, Longitude) VALUES (2, "Heybrook-Bay", 50.321606, -4.119036 )' );
//
//    tx.executeSql( 'INSERT INTO Route (ID, City, Latitude, Longitude) VALUES (3, "Heybrook-Bay", 50.321551, -4.119937 )' );
//    tx.executeSql( 'INSERT INTO Route (ID, City, Latitude, Longitude) VALUES (4, "Heybrook-Bay", 50.321992, -4.120114 )' );
//    tx.executeSql( 'INSERT INTO Route (ID, City, Latitude, Longitude) VALUES (5, "Heybrook-Bay", 50.323547, -4.118591 )' );
//    
//    tx.executeSql( 'INSERT INTO Route (ID, City, Latitude, Longitude) VALUES (6, "Heybrook-Bay", 50.324109, -4.120554 )' );
//    tx.executeSql( 'INSERT INTO Route (ID, City, Latitude, Longitude) VALUES (7, "Heybrook-Bay", 50.325028, -4.120721 )' );
//    tx.executeSql( 'INSERT INTO Route (ID, City, Latitude, Longitude) VALUES (8, "Heybrook-Bay", 50.325398, -4.121665 )' );
//    
//    tx.executeSql( 'INSERT INTO Route (ID, City, Latitude, Longitude) VALUES (9, "Heybrook-Bay", 50.326425, -4.120463 )' );
//    tx.executeSql( 'INSERT INTO Route (ID, City, Latitude, Longitude) VALUES (10, "Heybrook-Bay", 50.328097, -4.121450)' );
    

    tx.executeSql('SELECT * FROM Route', [], Route_Success, errorCDRoute);
}







///////////////////////////////////////////////////////////////////
///////////////////// Fill Html Content
///////////////////////////////////////////////////////////////////

// Html Content Items 

function querySuccess(tx, results) {

    console.log( results.rows.item(0) );
    
    len = results.rows.length;
    
    var Element = document.getElementById('main');
    var Page = document.getElementById('app');
    var Rate = document.getElementsByClassName('Rate');

    $( Element ).empty();
    
    for (var i = 0; i < len; i++) {
    
        $( "#"+results.rows.item(i).ID ).remove();
        
        var Rate_N = (results.rows.item(i).Rate_added / results.rows.item(i).Rate_Number);
        
        var location = results.rows.item(i).Loction;
        
        var map_img = "https://maps.googleapis.com/maps/api/staticmap?center="+results.rows.item(i).Loction+"&zoom=13&size=380x150&scale=2";

        $( Element ).append( "<a href='#"+results.rows.item(i).ID+"' onclick='Load_Map("+results.rows.item(i).ID+")' data-roll='"+results.rows.item(i).Loction+"' id='"+results.rows.item(i).ID+"_L' ><section class='wpr' ><div class='img-main' style='background: url("+ results.rows.item(i).Img_Url+") no-repeat center center; background-size: cover;' > <h2 class='Title' > "+ results.rows.item(i).Title +" </h2> </div><div class='info'><div><p> "+results.rows.item(i).Loction+" </p></div><div><p>Rating: "+results.rows.item(i).Rate+"</p></div><div><p>"+results.rows.item(i).Length+" Miles</p></div></section></a>" );


        $( Page ).append( "<section data-role='page' class='panel' id='"+ results.rows.item(i).ID +"'> <div class='img-main-page' style='background: url("+results.rows.item(i).Img_Url+") no-repeat center center; background-size: cover;'><h2 class='Title' >" + results.rows.item(i).Title + "</h2> </div><div class='item-content'><div class='content-wpr info'><h3 class='Rating-Title'>Rating:</h3><div class='Rate'><h2>"+results.rows.item(i).Rate+"</h2></div> </div> <div class='content-wpr info' ><h3>Length: "+results.rows.item(i).Length+" Miles</h3></div> <div class='content-wpr photo'><h3>Most Resent Photo's</h3><div class='PHOTO' id='Photo"+results.rows.item(i).ID+"' ></div></div><div class='content-wpr'><h3>Map</h3><div id='map"+results.rows.item(i).ID+"' class='map' ></div></div><div class='content-wpr'><a href='#"+results.rows.item(i).ID+"_Rate' ><p class='Add-New'>Add new Rating</p></a></div></div></section>" );
        
        
        
        $( Page ).append( "<section data-role='page' class='panel' id='"+results.rows.item(i).ID+"_Rate' ><section class='Update_data' ><form id='theForm' class='simform' autocomplete='off'><ol class='questions'><li class='slider'><label for='slider'>Your Rating</label><input type='range' name='slider' id='slider_"+results.rows.item(i).ID+"' value='0' min='0' max='10' > </li> <img src='' class='Img_in' id='Take_Photo_Edit_"+results.rows.item(i).ID+"' /> <div class='get'> <div onclick='getPicture2("+results.rows.item(i).ID+")' class='Take_Photo_img'><img src='img/slr2.png' /> <label id='Take_Photo_label_"+results.rows.item(i).ID+"'>Take Photo</label> </div></div> </ol></form><div id='submit' onclick='Edit_Item("+results.rows.item(i).ID+")' >Submit</div></section></section>" );

    }
    
}


// Html Content Picture 

function querySuccess_Picture(tx, results) {
    
    len_of_pic = results.rows.length;
    
    var PHOTO = document.getElementsByClassName("PHOTO");
    
    $( PHOTO ).empty();
    
    for (var i = 0; i < len_of_pic; i++) {
        var Photo_id = "Photo"+i;

        var Photo = document.getElementById(Photo_id);

        for(var j = 0; j < len_of_pic; j++){
            if( results.rows.item(j).ID_of_Picture == Photo_id ){
                
                $( Photo ).append( "<div id='Photos_ID_"+results.rows.item(j).ID+"' onclick='showimg("+results.rows.item(j).ID+")' style='background: url("+results.rows.item(j).IMG_URL+") no-repeat center center; background-size: cover;' ></div>" );
                
            }
        }

    }

}


// Html Content Route 


function Route_Success(tx, results) {
    
    var Coordinates = [];
    
    len_of_route_DB = results.rows.length;
    
    console.log( "len_of_route_DB: "+ len_of_route_DB );
    console.log( "Page Location in Route Success "+ Address_R );
    
    
    for(var i = 0; i < len_of_route_DB; i++) {
        route_Latitude = results.rows.item(i).Latitude;
        route_Longitude = results.rows.item(i).Longitude;
        
        ID_of_route = results.rows.item(i).ID;
        
        City = results.rows.item(i).City;
    
        console.log( Address_R +" "+ City );
        
        if( Address_R == City ){
            Coordinates.push( new google.maps.LatLng(route_Latitude, route_Longitude) );
        }
    }

    console.log(Coordinates);
    
    
        var mapOptions = {
            center: new google.maps.LatLng(Lat, Long),
            zoom: 14
        };
        
        console.log(i);
        var map = new google.maps.Map(document.getElementById( "map"+id_for_map ), mapOptions);
        
        var Coord = new google.maps.Polyline({
            path: Coordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        Coord.setMap(map); 
         
}












///////////////////////////////////////////////////////////////////
///////////////////// Take Picture
///////////////////////////////////////////////////////////////////

// Take Picture for item

function getPicture(){ 
    navigator.camera.getPicture(onSuccess, onFail, { quality: 100, destinationType: Camera.DestinationType.FILE_URI });

    function onSuccess(imageURI) {
        var image = document.getElementById('Take_Photo');
        var element = document.getElementById('Take_Photo_label');
        image.src = imageURI;
        element.innerHTML = 'Retake Photo';
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

// Take Picture for edit item

function getPicture2(id){ 
    
    navigator.camera.getPicture(onSuccess, onFail, { quality: 100, destinationType: Camera.DestinationType.FILE_URI });

    function onSuccess(imageURI) {
        var image = document.getElementById('Take_Photo_Edit_'+id);
        var element = document.getElementById('Take_Photo_label_'+id);
        image.src = imageURI;
        element.innerHTML = 'Retake Photo';
    }

    function onFail(message) {
        alert('Failed because:' + message);
    }
}









///////////////////////////////////////////////////////////////////
///////////////////// Get Location
///////////////////////////////////////////////////////////////////

// Get Location

function getGeolocation(){ 
    
    var Options = { enableHighAccuracy: false };
    
    navigator.geolocation.getCurrentPosition(geolocationSuccess, onError, Options);
    
    function geolocationSuccess(position) {
        
        var loc = position.coords.latitude+","+position.coords.longitude;
        codeLatLng(loc);
        
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
    
}


// Convert Location to Readable string

function codeLatLng(loc) {
    var geocoder = new google.maps.Geocoder();

    var input = loc;
    
    var latlngStr = input.split( ",",2 );
    var lat = parseFloat( latlngStr[0] );
    var lng = parseFloat( latlngStr[1] );
    var latlng = new google.maps.LatLng( lat, lng );
    
    geocoder.geocode({ 'latLng': latlng }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                
                var formatted_address_str = results[4].formatted_address;
                
                var formatted_address = formatted_address_str.split( ",",2 );
                var city = formatted_address[0];
                var contry = formatted_address[1];
                                
                var element = document.getElementById('Geolocation');
                element.innerHTML = city;
            }
        } else {
            alert( "Geocoder failed due to: " + status );
        }
    });
    
}


// Start Record Route

$("#Record_route").click(function() {
    
    console.log("Record_route start");
    var Options = { enableHighAccuracy: true };

    $("#Record_route_stop").css( "color", "red" );
    $("#Record_route_stop label").css( "color", "red" );
    
    
    if (timer !== null) return;
    timer = setInterval(function () {
        
        navigator.geolocation.getCurrentPosition(geolocationSuccess, onError, Options);

        function geolocationSuccess(position) {

            Record_Coordinates.push( position.coords.latitude, position.coords.longitude );
            
            console.log( Record_Coordinates );
        }
        

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        } 
        
    }, interval); 
});


// Stop Record Route

$("#Record_route_stop").click(function() {
    console.log("Record_route_stop");
    
    $("#Record_route_stop").css( "color", "Black" );
    $("#Record_route_stop label").css( "color", "Black" );
    
    clearInterval(timer);
    timer = null
    
});












///////////////////////////////////////////////////////////////////
///////////////////// Submit New item to database
///////////////////////////////////////////////////////////////////

// Submit New Items / location

function Submit_New(){
    
    Title = $( "#Title" ).val();
    Length = $( "#Length" ).val();
    Rate = $( "#slider" ).val();
    
    $img = $("#Take_Photo");
    src = $img.attr("src");
    
    loction = $( "#loction" ).val();
    Geolocation = $( "#Geolocation" ).html();
    
    
    if( loction == "" ) {
        console.log("Submit_New ");
        
        if(Title == "" || Length == "" || Rate == "" || Geolocation == "Get Loction" ) {
            
            $(".questions label").addClass("red");
            console.log("Submit_New 2");
            
        }else{
            
            location.href = '#main-page';
            
            $(".questions label").removeClass("red");
            
            db.transaction(Add_New_DB, errorDB);
            
            db.transaction(Add_New_Route, errorDB);
            
            $('input').removeAttr('value');
            console.log("Submit_New 3");
            
        }
        
    } else {
        
            location.href = '#main-page';
            db.transaction(Add_DB, errorDB);
            $('input').removeAttr('value');
        
    }
    
   
    
}










///////////////////////////////////////////////////////////////////
///////////////////// Edit item in database
///////////////////////////////////////////////////////////////////

// Edit  Items / location in Database

function Edit_Item(id){
    
    Id_of = id; 
    
    $img_p = $("#Take_Photo_Edit_"+Id_of );
    src_p = $img_p.attr("src");
    Rate_2 = $( "#slider_"+Id_of ).val();

    Geolocation = $( "#Geolocation" ).html();

    if( Rate_2 == "" ) {

        $(".questions label").addClass("red");
        console.log("Edit_Item "+ id );

    }else{
        location.href = '#main-page';
        
        db.transaction(Add_New_Rating, errorPic);
        
        Picture.transaction(Add_New_Picture, errorCB_Pic);
        
        $(".questions label").removeClass("red");
        $('.questions input').removeAttr('value');
        console.log("Submit_New "+ id );

    }

}








///////////////////////////////////////////////////////////////////
/////////////////////  Load Map
///////////////////////////////////////////////////////////////////


// Get Location from clicking on Item / location

function Load_Map(locat) {
    Picture.transaction(populateDB_Picture, errorCB_Pic);
    
    id_for_map = locat;
    
    var L = $( "#"+locat+"_L" ).attr( "data-roll" );
        
    codeAddress( L );
    
    Address_R = L;
    
    console.log( "Page Location "+ Address_R );

    function codeAddress(address) {

        new google.maps.Geocoder().geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                
                Lat_g = results[0].geometry.location.k; 
                Long_g = results[0].geometry.location.D; 
               
                initialize(); 
            }
            
        });
    }

    
    function initialize() {
        
        Lat = parseFloat(Lat_g);
        Long = parseFloat(Long_g);
        
        
        // Load Map
        Loction_Route.transaction(populate_Loction_Route, errorRoute );
   
    }
    
    
    
}









///////////////////////////////////////////////////////////////////
/////////////////////  New Database Sql Execute
///////////////////////////////////////////////////////////////////


function Add_New_DB(tx) {

    tx.executeSql( 'INSERT INTO Location (ID, Title, Rate, Loction, Img_Url, Length) VALUES ('+(len+1)+',"'+Title+'", '+Rate+', "'+Geolocation+'", "'+src+'", '+Length+'  )' );

    tx.executeSql('SELECT * FROM Location ORDER BY Rate ASC', [], querySuccess, errorCB);

}

function Add_DB(tx) {

    tx.executeSql( 'INSERT INTO Location (ID, Title, Rate, Loction, Img_Url, Length) VALUES ('+(len+1)+',"'+Title+'", '+Rate+', "'+loction+'", "'+src+'", '+Length+'  )' );

    tx.executeSql('SELECT * FROM Location ORDER BY Rate ASC', [], querySuccess, errorCB);

}

function Add_New_Picture(tx) {
   //    tx.executeSql( 'DROP TABLE IF EXISTS Picture' );

    tx.executeSql( 'CREATE TABLE IF NOT EXISTS Picture (ID ,ID_of_Picture, IMG_URL)' );

    tx.executeSql( 'INSERT INTO Picture (ID ,ID_of_Picture, IMG_URL) VALUES ('+(len_of_pic+1)+', "Photo'+Id_of+'", "'+src_p+'")' );

    tx.executeSql('SELECT * FROM Picture LIMIT 9', [], querySuccess_Picture, errorCB );

}

function Add_New_Rating(tx) {

    tx.executeSql( 'UPDATE Location SET Rate='+Rate_2+' WHERE ID='+Id_of+';' );

    tx.executeSql('SELECT * FROM Location ORDER BY Rate ASC', [], querySuccess, errorCB);

}

function Add_New_Route(tx) {

    tx.executeSql( 'CREATE TABLE IF NOT EXISTS Route (ID, City, Latitude, Longitude)' );

    console.log("Record_Coordinates "+  Record_Coordinates.length );

    for(var i = 0; i < Record_Coordinates.length;  i += 2 ){

        console.log(i +": "+  Record_Coordinates[i] +", "+ (i+1) +": "+Record_Coordinates[i+1] +" Geolocation "+ Geolocation);

        tx.executeSql( 'INSERT INTO Route (ID, City, Latitude, Longitude) VALUES (1, "'+Geolocation+'",  '+Record_Coordinates[i]+', '+Record_Coordinates[i+1]+' )' );

    }

    

}







///////////////////////////////////////////////////////////////////
///////////////////// Show big Img
///////////////////////////////////////////////////////////////////

    
function showimg(img_id){
    
    $( "#Photos_ID_"+img_id ).toggleClass("showimg");
}




    
   






































