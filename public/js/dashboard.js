var updated = false;

function resize() {
	if($('.leftside').width() < 300) {
		updated = true;
		$('.leftside').css("display", "block");
		$('.rightside').css("float", "none");
		$('.rightside').css("width", "100%");
		$('.leftside').css("width", "100%");
	} else if($('.leftside').width() > 600) {
			$('.leftside').css("display", "inline-block");
			$('.rightside').css("float", "right");
			$('.rightside').css("width", "49%");
			$('.leftside').css("width", "49%");
			updated = false;
	}
}
// window resize script
window.onresize = function(event) {
	resize();
};

setInterval(function(){resize();},500);

var socket = io.connect('http://localhost:3000');
var obs = new OBSRemote();

// get settings
socket.emit('getsettings', '');

socket.on('getsettings', function(data) {
	obs.connect(data.obs_url, data.obs_password);
});