function saveOptions() {
	browser.storage.sync.set({
		homescreen: document.getElementById("homescreen").checked,
		comments: document.getElementById("comments").checked,
		next: document.getElementById("next").checked,
		playlist: document.getElementById("playlist").checked,
		toolbar: document.getElementById("toolbar").checked
	});
}

function restoreOptions() {

	function setHome(result) {
		if(result.homescreen == undefined)
				document.getElementById("homescreen").checked = true;
		else
				document.getElementById("homescreen").checked = result.homescreen;
	}
	function setComments(result) {
		document.getElementById("comments").checked = result.comments;
	}
	function setNext(result) {
		if(result.next == undefined)
				document.getElementById("next").checked = true;
		else
				document.getElementById("next").checked = result.next;
	} 
	function setPlaylist(result) {
		if(result.playlist == undefined)
				document.getElementById("playlist").checked = true;
		else
				document.getElementById("playlist").checked = result.playlist;
	}
	function setToolbar(result) {
		document.getElementById("toolbar").checked = result.toolbar;
	}

	function onError(error) {
		console.log(`Error: ${error}`);
	}

	var getHome = browser.storage.sync.get("homescreen");
	var getComments = browser.storage.sync.get("comments");
	var getNext = browser.storage.sync.get("next");
	var getPlaylist = browser.storage.sync.get("playlist");
	var getToolbar = browser.storage.sync.get("toolbar");
	getHome.then(setHome, onError);
	getComments.then(setComments, onError);
	getNext.then(setNext, onError);
	getPlaylist.then(setPlaylist, onError);
	getToolbar.then(setToolbar,onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);

window.addEventListener('load', function() {
	for(checkboxes of document.querySelectorAll("input[type=checkbox]"))
	{
		checkboxes.addEventListener('change', function(){
			saveOptions();
			let success = document.getElementById("success");
			success.style.opacity = 1;
			success.innerHTML = "Saved!";
			setTimeout(() => {  success.style.opacity = 0; }, 3000);
		});
	}
}, false);