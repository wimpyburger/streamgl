var express = require('express'),
	app = express();
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

var port = 3000;
server.listen(port);

app.get('/dashboard', function(req, res) {
	res.sendfile(__dirname + '/public/dashboard.html');
});

io.sockets.on('connection', function(socket) {
	socket.on('show msg', function(data) {
		console.log(data);
	});
});

app.get('/notification', function(req, res) {
	res.sendfile(__dirname + '/public/notification.html');
});