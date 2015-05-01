var injector = {};
var i=0;

// Javascript Injector
injector.injectScript = function(tabId, code) {
    chrome.tabs.executeScript(tabId, {code:code}, function() {
		console.log("Script injected: \n" + code);
    });
}

// jQuery Injector
injector.injectJQuery = function(tabId, callback) {
    chrome.tabs.executeScript(tabId, {file:"js/lib/jquery-2.1.3.min.js"}, function() {
        console.log("jQuery injected.");
		callback();
    });
}

// CSS Injector
injector.injectCSS = function(tabId, code) {
    chrome.tabs.insertCSS(tabId, {code:code}, function() {
		console.log("CSS injected: \n" + code);
    });
}

// LESS Injector
injector.injectCSS = function(tabId, code) {
	less.render(code, function (e, output) {
		chrome.tabs.insertCSS(tabId, {code:output.css}, function() {
			console.log("LESS injected: \n" + code);
		});
	});
}