var database = {};

database.db = null;

database.open = function() {
	database.db = openDatabase("JsInjector", 
							   "1.0", 
							   "JsInjector Database", 
							   10 * 1024 * 1024); // 10MB
}

database.createTable = function() {
	database.db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS Scripts (" +
					  "id INTEGER PRIMARY KEY ASC, "+
					  "url TEXT, " + 
					  "description TEXT, " + 
					  "script TEXT, " + 
					  "style TEXT, " + 
					  "autorun BOOLEAN, " + 
					  "jquery BOOLEAN, " +
					  "regex BOOLEAN, " +
					  "autostyle BOOLEAN)",
					  []);
	});
}

database.dropTable = function() {
	database.db.transaction(function(tx) {
		tx.executeSql("DROP TABLE Scripts");
	});
}

database.addScript = function(url, description, script, style, autorun, jquery, regex, autostyle) {
	database.db.transaction(function(tx){
		tx.executeSql("INSERT INTO Scripts " +
					  "(url, description, script, style, autorun, jquery, regex, autostyle) " +
					  "VALUES (?,?,?,?,?,?,?,?)",
					  [url, description, script, style, autorun, jquery, regex, autostyle],
					  database.onSuccess,
					  database.onError);
	});
}

database.getLastInsertId = function(callback) {
	database.db.transaction(function(tx) {
		tx.executeSql("SELECT MAX(id) AS id FROM Scripts", 
					  [], 
					  function(tx, rs) { 
						  callback(rs.rows.item(0).id); 
						  console.log(rs.rows.item(0).id);
					  },
					  database.onError);
	});
}

database.updateScript = function(id, url, description, script, style, autorun, jquery, regex, autostyle) {
	database.db.transaction(function(tx){
		tx.executeSql("UPDATE Scripts SET " + 
					  "url = ?, " +
					  "description = ?, " +
					  "script = ?, " +
					  "style = ?, " +
					  "autorun = ?, " +
					  "jquery = ?, " +
					  "regex = ?, " + 
					  "autostyle = ? " +
					  "WHERE id = ?",
					  [url, description, script, style, autorun, jquery, regex, autostyle, id],
					  database.onSuccess,
					  database.onError);
	});
}

database.getAllScripts = function(callback) {
	database.db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM Scripts", 
					  [], 
					  function(tx, rs) { callback(rs.rows) },
					  database.onError);
	});
}

database.logAllScripts = function() {
	database.db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM Scripts", 
					  [], 
					  function(tx, rs) { console.log(rs.rows) },
					  database.onError);
	});
}

database.dlAllScripts = function(callback) {
	database.db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM Scripts", 
					  [], 
					  function(tx, rs) { callback(JSON.stringify(rs.rows)) },
					  database.onError);
	});
}

database.deleteScript = function(id) {
	database.db.transaction(function(tx){
		tx.executeSql("DELETE FROM Scripts WHERE id=?", 
					  [id],
					  database.onSuccess,
					  database.onError);
	});
}

database.getMatchedScript = function(url, callback) {
	database.getAllScripts(function(rows) {
		for (var i=0; i<rows.length; i++) {
			if ((rows.item(i).regex=="true" && url.match(rows.item(i).url)) || (rows.item(i).regex=="false" && url==rows.item(i).url)) {
			//if (url.match(rows.item(i).url)) {
				callback(rows.item(i));
				break; // Get only the first one
			}
		}
	});
}

database.logMatchedScript = function(url) {
	database.getAllScripts(function(rows) {
		for (var i=0; i<rows.length; i++) {
			success=false;
			if ((rows.item(i).regex=="true" && url.match(rows.item(i).url)) || (rows.item(i).regex=="false" && url==rows.item(i).url)) {
			//if (url.match(rows.item(i).url)) {
				console.log(rows.item(i));
				success=true;
				break; // Get only the first one
			}
			console.log(success);
		}
	});
}

database.onSuccess = function(tx, r) {
	//console.log("database.onSuccess");
	//database.getAllTodoItems(loadTodoItems);
}

database.onError = function(tx, e) {
	console.log("database.onError: " + e.message);
	console.log("database.onError: " + JSON.stringify(e));
	alert("There has been an error: " + e.message);
}