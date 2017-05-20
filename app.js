var express = require("express");
var session = require("express-session"); // para  trabajar con redis
var router_app = require("./routes_app"); // rutas modulares ,
var bodyParser = require('body-parser');
var RedisStore = require("connect-redis")(session); // le pasamos session al redis
var http = require("http"); // socket io tiene q ser una instancia de http
var realtime = require("./realtime");


var app = express(); // instansia del express
var server = http.Server(app); // nuevo servidor para pasar app expres en server


app.use(bodyParser.json());


var session_redis_middleware = session({
	store: new RedisStore({}),
	secret: "Subarashi watashin o himitsu"
});

realtime(server,session_redis_middleware); 

app.use(express.static('assets')); //datos staticos

app.use(session_redis_middleware); //para almasenar sessiones en redis
app.set("view engine", "pug"); // seleccionar el motor de vistas


app.get("/",function(req,res){ 
	res.render("index" , {title: "Inicio Proyecto"})
});


app.use("/dashboard",router_app); // rutas modulares, ruta dashboard ,

server.listen(8080,function(){ 
 	console.log("Corriendo proyecto gps redis");
});