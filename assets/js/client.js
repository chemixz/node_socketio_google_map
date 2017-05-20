var socket = io();
var clat =  9.2479972;
var clng = -68.3866351;
var map;
var infoWindow;
var vlat=7.771357200000001;
var vlng=-72.22614659999999;
var marker ;
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var icons = {
  parking: {
    icon: iconBase + 'parking_lot_maps.png'
  },
  library: {
    icon: iconBase + 'library_maps.png'
  },
  bus: {
    icon: iconBase + 'bus-i_maps.png'
  }
};


	$(function() {
		map = new google.maps.Map(document.getElementById('map'), {
			  center: {lat:clat, lng:clng },
			  zoom: 6
		})
		infoWindow = new google.maps.InfoWindow();
	});


	socket.on("new mapcoords",function(data){
		var dataCoords = JSON.parse(data);
		console.log("desde el ciente ",dataCoords);
		createMarker(dataCoords.lat ,dataCoords.lng, "", "");


	});

	 function createMarker(plat,plng,place ,desc, inconImg){
      vlat = vlat + plat;
      vlng = vlng + plng;

      console.log("entro y es Lat: "+ plat + "Long: " + plng);
      marker= new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(vlat, vlng),
          icon: iconBase + 'bus_maps.png',
          title: place
      });
      marker.content = '<div class="infoWindowContent">' + desc + '<br />' +plat + ' E,' +plng +  ' N, </div>';
      
      google.maps.event.addListener(marker, 'click', function(){
          infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
          infoWindow.open(map, marker);
      });
     
                  
   } 

  function setMarker(slat,slng,place,desc){
    console.log("asignando lat: "+slat+ "lng:"+slng)
     marker= new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(slat, slng),
          title: place
      });
      marker.content = '<div class="infoWindowContent">' + desc + '<br />' +slat + ' E,' +slng +  ' N, </div>';
  }
 		// function openInfoWindow(e, selectedMarker){
   //                e.preventDefault();
   //                google.maps.event.trigger(selectedMarker, 'click');
   //  }


