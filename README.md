streamgl
========

Graphics system for OBS streams using NodeJS, Express, Socket.IO

The global view is found at http://localhost:3000/notification

To view an individual module, go to http://localhost:3000/moduleview/[ModuleName]

module files:
	dashboard.html		-	Will be added to the controlling dashboard
	notification.html	-	Will be added to the "notification" panel, shown on the stream
	socket.txt			-	Line separated list of socketIO outputs used by the module
	
To delete a module, delete its entire folder in /modules
To add a module, add its containing folder to /modules