'use strict';

var button = document.getElementById("init");

chrome.storage.sync.get('whatsUpStatus', function(data) {

	var status = data.whatsUpStatus;

	if (status == "On") {
		button.classList.remove("stoped");
		button.classList.add("started");
		button.innerHTML = "Working...";
	} else if (status == "Off") {
		button.classList.remove("started");
		button.classList.add("stoped");
		button.innerHTML = "Stoped";
	}

    chrome.storage.sync.set({whatsUpStatus: status}, function() {
      	console.log(status);
    });

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  	chrome.tabs.executeScript(
	      	tabs[0].id,
	      	{ file: "whatsup.js" }
	    );
	});

	button.addEventListener("click", function() { on_off(status) });
});

function on_off(whatsUpStatus){
	//console.log(whatsUpStatus);

	if(button.classList.contains("stoped")) {
		button.classList.remove("stoped");
		button.classList.add("started");
		button.innerHTML = "Working...";

	    chrome.storage.sync.set({whatsUpStatus: "On"}, function() {
      		console.log("Opened.");
	    });

	} else if(button.classList.contains("started")) {
		button.classList.remove("started");
		button.classList.add("stoped");
		button.innerHTML = "Stoped";

	    chrome.storage.sync.set({whatsUpStatus: "Off"}, function() {
	      	console.log("Closed.");
        	// location.reload();
	    });

	}

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  	chrome.tabs.executeScript(
	      	tabs[0].id,
	      	{ file: "whatsup.js" }
	    );
	});
}

/*

console.log(document.getElementsByClassName("_2wP_Y"));

var status = "off";

var button = document.getElementById("init");
button.addEventListener("click", on_off);

function on_off() {

	console.log("on_off");
	(button.classList.contains("stoped")) ? (button.classList.remove("stoped"), document.getElementById("init").innerHTML = "On", status = "on") : button.classList.add("stoped");
	(button.classList.contains("started")) ? (button.classList.remove("started"), document.getElementById("init").innerHTML = "Off", status = "off") : button.classList.add("started");

	init(status);
}

*/