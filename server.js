var express = require('express'),
	app = express();
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	fs = require('fs');

var port = 3000;
server.listen(port);
app.set('views', './views');
app.set('view engine', 'ntl');

var leftside = '';
var rightside = '';
var notificationhtml = '';

var listento = [];

// get extensions
fs.readdir(__dirname + '/modules/', function(err, files) {
	var halfoftotal = Math.ceil(files.length / 2);
	files.forEach(function(fileName, index) {
		fs.readFile(__dirname + '/modules/' + fileName + '/dashboard.html', 'utf8', function(err, data) {
			if(err) return console.log(err);
			if(index < halfoftotal) {
				leftside += data;
			} else {
				rightside += data;
			}
		});
		
		fs.readFile(__dirname + '/modules/' + fileName + '/notification.html', 'utf8', function(err, data) {
			if(err) return console.log(err);
			notificationhtml += data;
		});
		
		fs.readFile(__dirname + '/modules/' + fileName + '/socket.txt', 'utf8', function(err, data) {
			if(err) return console.log(err);
			listento = listento.concat(data.split("\n")); // add all lines to array
			console.log(listento);
		});
		
	});
});

// set up template engine for steamGL modules
app.engine('ntl', function (filePath, options, callback) { // define the template engine
	fs.readFile(filePath, function (err, content) {
		if (err) return callback(new Error(err));
		// this is an extremely simple template engine
		var rendered = content.toString().replace('#LEFT_SIDE#', leftside).replace('#RIGHT_SIDE#', rightside).replace('#NOTIFICATION#', notificationhtml);
		return callback(null, rendered);
	})
});

app.get('/dashboard', function(req, res) {
	res.render('dashboard');
});

app.get('/notification', function(req, res) {
	res.render('notification');
});

app.use(express.static('public'));

io.sockets.on('connection', function(socket) {
	listento.forEach(function(name) {
		socket.on(name, function(data) {
			io.emit(name, data);
		});
	});
});