var onlyWhatsapp = {
	conditions: [
		new chrome.declarativeContent.PageStateMatcher({
			pageUrl: {
				hostEquals: 'web.whatsapp.com',
				schemes: ['https']
			}
		})
	],
	actions: [ new chrome.declarativeContent.ShowPageAction() ]
};


chrome.runtime.onInstalled.addListener(function(details) {

	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([onlyWhatsapp]);
	});

    chrome.storage.sync.set({whatsUpStatus: "off"}, function() {
      	// console.log("whatsUpStatus is off.");
    });

});

chrome.pageAction.onClicked.addListener(function(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  	chrome.tabs.executeScript(
	      	tabs[0].id,
	      	{ file: "whatsup.js" }
	    );
	});
})

function checkForValidUrl(tabId, changeInfo, tab) {
	if (tab.url.indexOf('https://web.whatsapp.com') === 0) {
		//chrome.pageAction.show(tabId);
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  	chrome.tabs.executeScript(
		      	tabId,
		      	{ file: "whatsup.js" }
		    );
		});
	}
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
