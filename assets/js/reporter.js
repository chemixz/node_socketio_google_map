var cities = [
    {lat: 7.771357200000001 , lng: -72.22614659999999 , title: 'Valera' , desc: 'Ciudad de compromisos'},
    {lat: 8.5833333333333 , lng: -71.133333333333 ,title: 'Merida' , desc: 'Cudad del frio'},
    {lat:10.066666666667 ,  lng:-69.333333333333 , title:'Barquisimeto' ,desc: 'Ciudad llana'},
    {lat: 10.166666666667 ,lng: -68 , title: 'Valencia' , title: 'Valencia', desc: 'Ciudad Esdrujula'}
];

var cities_two = [
  {lat: 0.01 , lng: 0.05, title: "unknow",  desc: "second unknow" , icon: "bus"}
]
var cont = 0;
var run = true;
window.onload=function(){

  setInterval(function() {
      if (run)
      {
          if (cont >= 4)
          {
              cont =0;
          }
        $.ajax({
              url: '/dashboard/send_report', 
              type: 'POST', 
              contentType: 'application/json', 
              data: JSON.stringify(cities_two[0])
          })
        console.log('enviando '+cont);
        cont++;
        console.log('ahora vale '+cont);
      }
  }, 3000);
  

}
function stop(){
    run = false;
    cont = 0;
}
function start(){
    run = true;
}
function sendFormData(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            var dataCoords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            console.log("enviando",position);
            // $.post( "http://localhost:8080/dashboard/send_report", function(dataCoords ) {
            //   console.log(dataCoords);
            // });
            $.ajax({
                url: '/dashboard/send_report', 
                type: 'POST', 
                contentType: 'application/json', 
                data: JSON.stringify(dataCoords)
            })
          
        });
    } else 
    {
        console.log("Geolocation is not supported by this browser");
    }
} 