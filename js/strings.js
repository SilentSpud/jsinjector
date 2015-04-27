function replace(item,msg) {if (item) return item.innerText=chrome.i18n.getMessage(msg); };

replace($("div.title")[0],"extTitle");
replace($("div.subtitle1")[0],"subtitle1");
replace($("div.subtitle2")[0],"subtitle2");
if (localStorage['debug']=="false") {
	replace($("title")[0],"extName");
	replace($("p.intro")[0],"introText");
	replace($("p.feat")[0],"featText");
	replace($("ul.feat_list>li")[0],"featureA");
	replace($("ul.feat_list>li")[1],"featureB");
	replace($("ul.feat_list>li")[2],"featureC");
	replace($("ul.feat_list>li")[3],"featureD");
}
replace($("div.url>label")[0],"url");
replace($("div.description>label")[0],"desc");
replace($("div.script>label")[0],"script");
replace($("div.style>label")[0],"style");
replace($("div.autorun>label")[0],"autorun");
replace($("div.jquery>label")[0],"jQuery");
replace($("div.regex>label")[0],"RegEx");
replace($("div.autostyle>label")[0],"autostyle");
replace($("div.less>label")[0],"less");
replace($("div.inject>label")[0],"inject");
replace($("div.save>label")[0],"save");
replace($("div.delete>label")[0],"delete");
replace($("div.empty-msg")[0],"emptyDb");
replace($("div.unsaved")[0],"unsaved");
replace($("div.add>label")[0],"add");
replace($("div.delete-all>label")[0],"delAll");
replace($("div.import")[0],"import");
replace($("div.export")[0],"export");