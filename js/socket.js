var server = "hcr.io";
var port = "8993";

var socket;
var counter = 0;

function init_socket(){
	log_this("Trying to connect... ");

	protocol_array = [];
	protocol_array[0] = 'tumdefense';
	protocol_array[1] = '1234';

	socket = new WebSocket("ws://"+server+":"+port+"/", protocol_array);

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

function socket_send(msg){
	log_this(msg);
	socket.send(msg);
}


function parse_msg(msg){
	log_this(msg);
	eval(msg);
}

function log_this(str){
	console.log(str);
	//return;
}