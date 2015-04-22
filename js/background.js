// Debug Mode Toggle
DebugMode=false;
if (localStorage['debug']!=DebugMode) localStorage['debug']=DebugMode;

database.open();
database.createTable();

// First run
if (localStorage['firstRun']!='true') {
	// First Run Injection
/*	database.addScript("http://example.com/", 
					   "Example Title", 
					   "alert('Javascript Example Injected');", 
					   "body {background-color: #F00 !important; }", 
					   true, true, false, true);*/
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

function import_db(data) {
	database.dropTable();
	database.createTable();
	for (i=0;i<data.length;i++) {
		database.addScript(
			data[i].url, 
			data[i].description, 
			data[i].script, 
			data[i].style, 
			data[i].autorun, 
			data[i].jquery, 
			data[i].regex,
			data[i].autostyle
		);
	}
}