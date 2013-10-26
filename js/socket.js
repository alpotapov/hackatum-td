var server = "hcr.io";
var port = "8993";

var socket;
var counter = 0;

function init_socket(){
	log_this("Trying to connect... ");

	socket = new WebSocket("ws://"+server+":"+port+"/", []);

	socket.onopen = function(){
		log_this("Connected");
	};

	socket.onclose = function(){
		log_this("Disconnect");
	};

	socket.onmessage = function(msg){
		parse_msg(msg.data);
	};
}

function socket_send(){
	socket.send(new_response(jm, apelli_id));
}


function parse_msg(msg){
	eval(msg);
}

function log_this(str){
	console.log(str);
	//return;
}