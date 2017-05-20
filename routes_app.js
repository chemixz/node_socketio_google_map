var express = require("express");
var router = express.Router();
var redis = require("redis");
var client = redis.createClient();


var mainRoute = "dashboard";
router.get("/", function(req,res){
	// client.publish("mapCoords",JSON.stringify({clat: 7.771357200000001 , clng: -72.22614659999999}));
	res.render(mainRoute+"/track" , {mainRoute: "/"+mainRoute  , title: "track"});
});

router.post("/send_report", function(req,res){

	client.publish("mapCoords",JSON.stringify({lat: req.body.lat , lng: req.body.lng}));
	res.send("recibe algo q noc");
});
router.get("/report", function(req,res){
	res.render(mainRoute+"/report" , {mainRoute: "/"+mainRoute  , title: "reporter"});
});

module.exports = router;