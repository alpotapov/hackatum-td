#!/usr/bin/env node

//dependencies
var WebSocketServer = require('websocket').server;
var http = require('http');
var fs = require('fs');
var Log = require('log');

//global vars
//TODO delete checkdesk!!!
//     AND TERMINAL (standalone)
var accepted_protocols = ["tumdefense"];
var logger = new Log('info', fs.createWriteStream(__dirname + '/logs/main_log.log', { flags: 'a' }));
var connected = [];
var id_runner = 1;

var server = http.createServer(function (request, response) {
	console.log((new Date()) + ' Received request for ' + request.url);
	response.writeHead(404);
	response.end();
});

//constructor functions
function connected_client(rid, request) {
	this.id = rid;
	this.state = 'online';
	this.connection = request.accept(client_type, request.origin);

	log_this('New connected client, IP: '+this.connection.remoteAddress);

	this.connection.on('message', function (message) {
		if (message.type === 'utf8') {
			log_this('New message from client '+rid+': '+message.utf8Data);

			/*
			try {
				jmessage = JSON.parse(message.utf8Data);
			} catch (e) {
				logger.warn('Client '+rid+' ('+client_type+') send invalid JSON!!');
				return;
			}
			*/

			connected.forEach(function (entry) {
				if(entry.rid != rid && connected[rid].state == 'online'){
					entry.connection.sendUTF(message);
				}
			});
		}
	});
	
	this.connection.on('close', function (reasonCode, description) {
		log_this('Client disconnected, reason: '+reasonCode+'; desc: '+description);
		connected[rid].state = 'offline';
	});
}

//functions
function log_this(msg){
	logger.info(msg);
	console.log(new Date()+': '+msg);
}


//start the webserver
server.listen(8993, function () {
	log_this('Instance of tumdefense is listening on port 8993');
});

//start the websocket
//please do not change this unless u know what u are doing ~cvp
wsServer = new WebSocketServer({
	httpServer: server,
	autoAcceptConnections: false,
	disableNagleAlgorithm: false
});


wsServer.on('request', function (request) {
	//use to debug
	//console.log(request);
	//console.log(request.requestedProtocols);

	//validate the request
	/*
	if (!origin_is_allowed(request.origin)) {
		request.reject();
		log_this('Connection from origin ' + request.origin + ' and ip '+request.remoteAddress+' rejected: origin test failed');
		console.log((new Date()) + ' Connection from origin ' + request.origin + ' and ip '+request.remoteAddress+' rejected.');
		return;
	}
	*/

	connected[id_runner] = new connected_client(id_runner, accepted_protocols[protocol], request, offered_protocol[1]);
	id_runner++;
});




//make the consol input usable
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
	if(chunk.charAt(0) == '/'){
		eval(chunk.substr(1));
	}
});

//console.log(connected);