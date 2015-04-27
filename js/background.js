// Debug Mode Toggle
localStorage['debug']=false;

database.open();
database.createTable();

var manifest = chrome.runtime.getManifest();

if (localStorage['version']!=manifest.version) {
	database.dropTable();
	database.createTable();
	localStorage['version']=manifest.version;
}

// First run
if (localStorage['firstRun']!='true') {
	// First Run Injection
/*	database.addScript("http://example.com/", 
					   "Example Title", 
					   "alert('Javascript Example Injected');", 
					   "body {background-color: #F00 !important; }", 
					   true, true, false, true);*/
	localStorage['firstRun']='true';
	localStorage['version']=manifest.version;
}
	
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
	//run when the page finishes loading, otherwise it fires twice
	if (info.status == "complete") {
		database.getMatchedScript(tab.url.split('?')[0], function(data) {
			console.log("Match found: " + tab.url.split('?')[0]);
			if (data.autorun=="true") {
				if (data.jquery=="true") injector.injectJQuery(tabId, function() {injector.injectScript(tabId, data.script)});
				else injector.injectScript(tabId, data.script);
			}
			if (data.autostyle=="true") {
				if (data.less=="true") less_parse(data.style,function(css){injector.injectCSS(tabId, css)});
				else injector.injectCSS(tabId, data.style);
			}
		});
	}
});

function import_db(data) {
	if (data.version==manifest.version) {
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
				data[i].autostyle,
				data[i].less
			);
		}
	}
}

function read(file,callback) {
	r=new FileReader();
	r.onload = function(e) {
		callback(e.target.result);
	};
	r.onerror = function(stuff) {
		console.log("error", stuff);
		console.log (stuff.getMessage());
	};
	r.readAsText(file);
}

function less_parse(data,callback) {
	less.render(data, function (e, output) {
		callback(output.css);
	});
}