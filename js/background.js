database.open();
database.createTable();

// First run
if (localStorage['firstRun']!='true') {
	// First Run Injection
/*	database.addScript("http://example.com/", 
					   "Example Title", 
					   "alert('Javascript Example Injected');", 
					   "body {background-color: #F00 !important; }", 
					   true, true, false);*/
	localStorage['firstRun']='true';
}
	
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
	//run when the page finished loading, otherwise it fires twice
	if (info.status == "complete") {
		database.getMatchedScript(tab.url.split('?')[0], function(data) {
			console.log("Match found: " + tab.url.split('?')[0]);
			if (data.autorun=="true") {
				if (data.jquery=="true") injector.injectJQuery(tabId, function() {injector.injectScript(tabId, data.script)});
				else injector.injectScript(tabId, data.script);
			}
			if (data.autostyle=="true") injector.injectCSS(tabId, data.style);
			}); 
		}
	});