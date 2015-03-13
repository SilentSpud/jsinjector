var background = chrome.extension.getBackgroundPage();

function create(tag) { return $(document.createElement(tag)) }

background.database.getAllScripts(function(rows) {
	for (var i=0;i<rows.length; i++) {
		var data = rows.item(i);
		var element = $(".template").clone().removeClass("template").attr("data-id",data.id);
		
		element.find("div.save").click(updateRecord);
		element.find("div.delete").click(deleteRecord);
		element.find("div.url>input").val(data.url)
				.parent().find("label").addClass(data.url!=""?"hasome":"").removeClass(data.url==""?"hasome":"");
		element.find("div.description>input").val(data.description)
				.parent().find("label").addClass(data.description!=""?"hasome":"").removeClass(data.description==""?"hasome":"");
		element.find("div.script>textarea").val(data.script)
				.parent().find("label").addClass(data.script!=""?"hasome":"").removeClass(data.script==""?"hasome":"");
		element.find("div.style>textarea").val(data.style)
				.parent().find("label").addClass(data.style!=""?"hasome":"").removeClass(data.style==""?"hasome":"");
		element.find("div.autorun>input")[0].checked=(data.autorun=="true")?true:false;
		element.find("div.jquery>input")[0].checked=(data.jquery=="true")?true:false;
		element.find("div.regex>input")[0].checked=(data.regex=="true")?true:false;
		element.find("div.autostyle>input")[0].checked=(data.autostyle=="true")?true:false;
		$("#content").append(element);
	}
	$("#content").trigger('change');
});

$("#content").change(function(e) {
	if ($(".row").length<=1) {
		$("#content").addClass("empty");
	}
	else {
		$("#content").removeClass("empty");
	}
});

$("div.add").click(function() {
	var element = $("div.row.template").clone().removeClass("template");
/*    	background.database.addScript("http://example.com/", 
								  "Example", 
								  "alert('Example Script Injected');", 
								  "body {background-color: #F00 !important; }", 
								  true, 
								  true, 
								  false,
								  true
	);*/
	background.database.getLastInsertId(function(id) { element.attr("data-id",id+1) });
	element.find("div.save").click(updateRecord);
	element.find("div.delete").click(deleteRecord);
	element.hide().appendTo("#content").slideDown('slow');
	$("#content").trigger('change');
});

$("div.delete-all").click(function() {
	background.database.dropTable();
	background.database.createTable();
	$("div.row:not(.template)").slideUp('slow', function() { 
		$(this).remove();
		$("#content").trigger('change');
	});
});

function updateRecord() {
	var element = $(this).parent().parent();
	background.database.updateScript(element.attr("data-id"),
									 element.find("div.url>input").val(), 
									 element.find("div.description>input").val(), 
									 element.find("div.script>textarea").val(), 
									 element.find("div.style>textarea").val(), 
									 element.find("div.autorun>input")[0].checked, 
									 element.find("div.jquery>input")[0].checked,
									 element.find("div.regex>input")[0].checked,
									 element.find("div.autostyle>input")[0].checked
	);
}

function deleteRecord() {
	var element = $(this).parent().parent();
	background.database.deleteScript(element.attr("data-id"));
	element.slideUp('slow', function() { 
		$(this).remove();
		$("#content").trigger('change');
	});
}