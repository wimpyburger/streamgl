var express = require('express'),
	app = express();
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

var port = 3000;
server.listen(port);

app.get('/dashboard', function(req, res) {
	res.sendFile(__dirname + '/public/dashboard.html');
});

app.get('/notification', function(req, res) {
	res.sendFile(__dirname + '/public/notification.html');
});

app.get('/logo.png', function(req, res) {
	res.sendFile(__dirname + '/public/img/logo.png');
});

app.get('/wimpy.jpg', function(req, res) {
	res.sendFile(__dirname + '/public/img/wimpy.jpg');
});

app.get('/brenman.jpg', function(req, res) {
	res.sendFile(__dirname + '/public/img/brenman.jpg');
});

io.sockets.on('connection', function(socket) {
	socket.on('headershow', function(data) {
		io.emit('headershow', data);
	});
	
	socket.on('headerhide', function(data) {
		io.emit('headerhide', data);
	});
	
	socket.on('show msg', function(data) {
		io.emit('news', data);
	});
	
	socket.on('hide', function(data) {
		io.emit('hide', data);
	});
	
	socket.on('showimg', function(data) {
		io.emit('showimg', data);
	});
	
	socket.on('hideimg', function(data) {
		io.emit('hideimg', data);
	});
	
	socket.on('transition', function(data) {
		io.emit('transition', data);
	});
	
	socket.on('showmembers', function(data) {
		io.emit('showmembers', data);
	});
	
	socket.on('hidemembers', function(data) {
		io.emit('hidemembers', data);
	});
	
	socket.on('backgroundshow', function(data) {
		io.emit('backgroundshow', data);
	});
	
	socket.on('backgroundhide', function(data) {
		io.emit('backgroundhide', data);
	});
	
	socket.on('followershow', function(data) {
		io.emit('followershow', data);
	});
	
	socket.on('followerhide', function(data) {
		io.emit('followerhide', data);
	});
});