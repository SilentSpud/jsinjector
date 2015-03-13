$("input,textarea").keyup(function() {
	if($(this).val()=="") $(this).parent().find("label").removeClass("hasome");
	else $(this).parent().find("label").addClass("hasome");
});

var background = chrome.extension.getBackgroundPage();
var saved = false;
var savedId;

chrome.windows.getCurrent(function(window) {
	chrome.tabs.getSelected(window.id, function(tab){
		$("div.url>input").val(tab.url.split('?')[0]).parent().find("label").addClass("hasome");;
		background.database.getMatchedScript(tab.url.split('?')[0], function(data) {
			console.log(data);
			saved = true;
			savedId = data.id;
			$("div.url>input").val(data.url).parent().find("label").addClass(data.url!=""?"hasome":"");
			$("div.description>input").val(data.description).parent().find("label").addClass(data.description!=""?"hasome":"");
			$("div.script>textarea").val(data.script).parent().find("label").addClass(data.script!=""?"hasome":"");
			$("div.style>textarea").val(data.style).parent().find("label").addClass(data.style!=""?"hasome":"");
			$("div.autorun>input")[0].checked=(data.autorun=="true")?true:false;
			$("div.jquery>input")[0].checked=(data.jquery=="true")?true:false;
			$("div.regex>input")[0].checked=(data.regex=="true")?true:false;
			$("div.autostyle>input")[0].checked=(data.autostyle=="true")?true:false;
		}); 
	});
});

$("div.inject").click(function() {
	chrome.windows.getCurrent(function(window) {
		chrome.tabs.getSelected(window.id, function(tab){
			if ($("div.jquery>input").checked=="true") background.injector.injectJQuery(tab.id);
			if ($("div.script>textarea").val()!='') background.injector.injectScript(tab.id, $("div.script>textarea").val());
			if ($("div.style>textarea").val()!='') background.injector.injectCSS(tab.id, $("div.style>textarea").val());
		});
	});
	if (saved && ($("div.script>textarea").val()!='' || $("div.style>textarea").val()!='')) {
		background.database.updateScript(savedId,
										 $("div.url>input").val(), 
										 $("div.description>input").val(), 
										 $("div.script>textarea").val(), 
										 $("div.style>textarea").val(), 
										 $("div.autorun>input")[0].checked?true:false, 
										 $("div.jquery>input")[0].checked?true:false, 
										 $("div.regex>input")[0].checked?true:false, 
										 $("div.autostyle>input")[0].checked?true:false
		);
	}
	else if ($("div.script>textarea").val()!='' || $("div.style>textarea").val()!='') {
		background.database.addScript($("div.url>input").val(), 
									  $("div.description>input").val(), 
									  $("div.script>textarea").val(), 
									  $("div.style>textarea").val(), 
									  $("div.autorun>input")[0].checked?true:false, 
									  $("div.jquery>input")[0].checked?true:false, 
									  $("div.regex>input")[0].checked?true:false, 
									  $("div.autostyle>input")[0].checked?true:false
		);
		database.getLastInsertId(function(id) { savedId = id });
		saved = true;
	}
	else chrome.error("Empty Inject. Entry deleted, injection cancelled.");
});