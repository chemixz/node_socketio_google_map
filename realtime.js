module.exports = function(server,session_redis_middleware){
	var io = require("socket.io")(server);
	var redis = require("redis");
	var client = redis.createClient();


	client.subscribe("mapCoords");


	io.use(function(socket,next){
		session_redis_middleware(socket.request, socket.request.res, next)
		// configuramos para que utilice la misma session cn express
	})
	io.sockets.on("connection",function(socket){
		console.log("desde socket realtime");
	});

	client.on("message", function(channel,message){
		console.log("desde socket io canal -->"+channel,message);
		if (channel == "mapCoords")
		{
			io.emit("new mapcoords" , message);
		}
		
	});
}