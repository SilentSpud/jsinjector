var injector = {};
var i=0;

// Javascript Injector
injector.injectScript = function(tabId, code) {
    chrome.tabs.executeScript(tabId, {code:code}, function() {
        //console.log("Script injected: "+code.substr(0,20).replace("\n"," "));
		console.log("Script injected: \n" + code);
    });
}

// Experimental CSS Injector
injector.injectCSS = function(tabId, code) {
    chrome.tabs.insertCSS(tabId, {code:code}, function() {
        //console.log("Script injected: "+code.substr(0,20).replace("\n"," "));
		console.log("CSS injected: \n" + code);
    });
}

injector.injectJQuery = function(tabId, callback) {
    chrome.tabs.executeScript(tabId, {file:"inc/jquery-2.1.0.min.js"}, function() {
        console.log("jQuery injected.");
		callback();
    });
}
