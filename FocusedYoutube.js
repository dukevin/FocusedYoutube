function implementComments(saved)
{
	if(saved.comments) {
		document.getElementById("comments").style.display = "none";
		document.getElementById("comments").style.opacity = "0";
	}
}
function implementHomescreen(saved)
{
	if(saved.homescreen || saved.homescreen == undefined) {
		document.querySelector('[page-subtype="home"]').style.display = "none";
		document.querySelector('[page-subtype="home"]').style.opacity = "0";
		document.querySelector('[href="/feed/explore"]').style.display = "none";
	}
}
function implementNext(saved)
{
	if(saved.next || saved.next == undefined)
	{
		var next = document.getElementsByTagName("ytd-compact-autoplay-renderer")[0];
		if(next != undefined)
			document.getElementById("secondary-inner").append(next);
	}
}
function implementPlaylist(saved)
{
	if(saved.playlist || saved.playlist == undefined)
	{
		var playlist = document.getElementsByTagName("ytd-compact-playlist-renderer")[0];
		if(playlist != undefined)
			document.getElementById("secondary-inner").append(playlist);
	}
}
function implementToolbar(saved)
{
	if(saved.toolbar) {
		document.getElementById("contentContainer").style.display = "none";
		document.getElementsByTagName("ytd-mini-guide-renderer")[0].style.display = "none";
		document.getElementById("start").style.display = "none";
		document.getElementById("end").style.display = "none";
		document.getElementById("center").style.flex = "0 1 100%";
	}
}
function onError(error) {
	console.log(`Error: ${error}`);
}

var loadHomescreen = browser.storage.sync.get("homescreen");
var loadComments = browser.storage.sync.get("comments");
var loadNext = browser.storage.sync.get("next");
var loadPlaylist = browser.storage.sync.get("playlist");
var loadToolbar = browser.storage.sync.get("toolbar");

loadHomescreen.then(implementHomescreen, onError);
loadComments.then(implementComments, onError);
loadToolbar.then(implementToolbar, onError);

var loaded = false;

window.addEventListener('load', function() {
	loadPlaylist.then(implementPlaylist, onError);
	loadNext.then(implementNext, onError);
	loaded = true;
}, false);

window.addEventListener('DOMSubtreeModified', function() {
	if(!loaded)
		return;
	loadHomescreen.then(implementHomescreen, onError);
	loadComments.then(implementComments, onError);
	loadToolbar.then(implementToolbar, onError);
}, false);