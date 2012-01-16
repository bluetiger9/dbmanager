function MySqlServer() {};
function Database() {};
function Table() {};

server = new MySqlServer();

/**
 * Requests database information from server.
 * @param name - the name of the database
 * @param callback - success callback function
 * @returns void
 */
MySqlServer.prototype.getDatabase = function(name, callback) {
	if (this.databases[name] !== undefined) {
		var options = {
			action: 'GET_DATABASE',
			database: name
		};
		
		if (callback === undefined)
			var callback = function () {UI.showDatabasePage(name);};
		
		ajax(options, function(data){
			if (res = $.parseJSON(data)) {
				server.databases[name] = $.extend(res, new Database());
				// execute call-back
				if (typeof(callback) === "function")
					callback();
			}
			else {
				// show error message
				UI.showError(data);
			}
		});
	}
	else return "No such as database: " + name;
};

/**
 * Requests from server information about a user.
 * @param name - the username in user@host form.
 */
MySqlServer.prototype.getUser = function(name) {
	var options = {
		action: 'GET_USER',
		user: name
	};
	
	ajax(options, function(data) {
		try {
			res = $.parseJSON(data)
			server.users[name] = res;
			server.users[name].getted = true;
			UI.showUserPage(name);
		}
		catch (e) { // error
			UI.showError(data);
			UI.closeDialog();
		}
	})
};

/**
 * Send a request to server to create a database.
 * @param name - the name of database to create.
 */
MySqlServer.prototype.createDatabase = function(name) {
	if (this.databases[name] === undefined)
	{
		var options = {
				action: 'CREATE_DATABASE',
				database: name
		};
		
		ajax(options, function(data) {
			try {
				res = $.parseJSON(data)
				// receive the new database object
				server.databases[name] = $.extend(res, new Database());
				server.databases[name].tables = Object();
				server.databases[name].views = Object();
				UI.closeDialog();
				UI.serverUpdated();
				UI.showDatabasePage(name);
				UI.showMessage('The database was created successfully.');
			}
			catch (e) { // error
				UI.showError(data);
				UI.closeDialog();
			}
		});
	}
	else
	{
		UI.showError("ERROR: The database " + name + "already exists.");		
	}
};

/**
 * Send a request to server to delete a database.
 * @param db - the name of the database to delete.
 */
MySqlServer.prototype.deleteDatabase = function(db) {
	var options = {
		action: 'DELETE_DATABASE',
		database: db
	};
	
	ajax(options, function(data) {
		if (data == "OK")
		{
			delete server.databases[db];
			UI.serverUpdated();
			UI.showMessage("Database deleted successfully.");
		}
		else
			UI.showError(data);
	});
	
	
};

/**
 * Sends a request to server to create a new user.
 * @param name - the username
 * @param host - the host of user
 * @param password - the password of the user
 * @returns void
 */
MySqlServer.prototype.createUser = function(name, host, password)
{
	var options = {
		action: 'CREATE_USER',
		user: name,
		host: host,
		password: password
	};
	
	ajax(options, function(data) {
		try {
			res = $.parseJSON(data)
			// recive the new user object
			server.users[name + '@' + host] = res;
			server.users[name + '@' + host].getted = true;
			UI.serverUpdated();
			UI.showUserPage(name + '@' + host);
			UI.showMessage("User created successfully.");
		}
		catch (e) { // error
			UI.showError(data);
			UI.closeDialog();
		}
	});
};

/**
 * Requests the server to execute a SQL command.
 * @param sql - the SQL command requested to be executed. 
 * @param callback - the function called on success
 * @returns void
 */
MySqlServer.prototype.sql = function(sql, callback)
{
	var options = {
			action: 'SQL',
			sql: sql, 
			database: cdb
			
	};
	
	ajax(options, function(data) {
		if (data == '0')
		{
			callback(0);
			return;
		}
		try {
			var x = $.parseJSON(data);
			callback(x);
		}
		catch (e) {
			callback(data);
		}
	});
};

/**
 * Sends a request to server to delete a user. 
 */
MySqlServer.prototype.deleteUser = function (user) {
	var options = {
		action: 'DELETE_USER',
		user: user
	};
	
	ajax(options, function(data) {
		if (data == 'OK') {
			delete server.users[user];
			UI.serverUpdated();
			UI.showMessage('User deleted successfully.');
		}
		else
			UI.showError(data);	
	});
};

/**
 * Requests table data from server.
 * @param name - the name of the table
 * @param callback - success callback function
 * @returns void
 */
Database.prototype.getTable = function(name, callback)
{
	if (this.tables[name] !== undefined) {
		var options = {
			action: 'GET_TABLE',
			database: this.name,
			table: name
		};

		var db = this;
		if (callback === undefined)
			var callback = function() { UI.showTablePage(db.name, name);};
		

		ajax(options, function(data){
			try {
				res = $.parseJSON(data);
				db.tables[name] =$.extend(res, new Table());
				db.tables[name].parent = db;
				if (typeof(callback) === "function")
					callback();
			}
			catch (e) {
				UI.showDatabasePage(db.name);
				UI.showError("Failed to load the table data.");
				
			}
		});
	}
	else
		return "No such as table: " + name;
};

/**
 * Send a request to server to create a new table.
 * @param name - the name of the new table
 * @param fields - the list of table's fields (name, type, etc.) 
 * @returns void 
 */
Database.prototype.createTable = function(name, fields) {
	//alert(name + JSON.stringify(fields));
	if (this.tables[name] === undefined) {
	    var options = {
			action: 'CREATE_TABLE',
			database: this.name,
			table: name,
			fields: JSON.stringify(fields)
		};
		var db = this;
		ajax(options, function(data) {
			try {
				res = $.parseJSON(data);
				db.tables[name] =$.extend(res, new Table());
				db.tables[name].parent = db; 
				UI.showTablePage(db.name, name);
				UI.showMessage("The table was created succesfully.");
			}
			catch (e) {
				UI.showDatabasePage(db.name);
				UI.showError(data);				
			}
		});
	}
	else {
		UI.showDatabasePage(db.name);
		UI.showError("ERROR: The table " + name + " already exists in database.");
		
	}
};

/**
 * Send a request to server delete a table.
 * @param table - the name of table to delete
 * @returns void
 */
Database.prototype.deleteTable = function(table) {
	var options = {
		action: 'DELETE_TABLE',
		database: this.name,
		table: table
	};
	
	var db = this;
	ajax(options, function(data) {
		if (data != "OK")
			UI.showError(data);
		else
		{	delete db.tables[table];
			UI.showDatabasePage(db.name);
			UI.showMessage("The table was deleted successfully");
		}
	});
};

/**
 * Send a request to server to delete a view.
 * @param view - the name of view to delete
 * @returns void
 */
Database.prototype.deleteView = function(view) {
	var options = {
		action: 'DELETE_VIEW',
		database: this.name,
		view: view
	};
	
	var db = this;
	ajax(options, function(data) {
		if (data != "OK")
			UI.showError(data);
		else
		{	delete db.views[view];
			UI.showDatabasePage(db.name);
			UI.showMessage("The view was deleted successfully.");
		}
	});
}

/**
 * Sends a request to server to create a view.
 * @param name - the name of the view
 * @param sql - the SQL statement of the view
 * @returns void
 */
Database.prototype.createView = function(name, sql) {
	if (this.views[name] === undefined) {
		var options = {
			action: 'CREATE_VIEW',
			database: this.name,
			view: name,
			sql: sql
		};
		var db = this;
		ajax(options, function(data){
			UI.showDatabasePage(db.name);
			if (data != "OK")
				UI.showError(data);
			else {
				db.views[name] = null;
				UI.showDatabasePage(db.name);
				UI.showMessage("The view was created succesfully.");
				
			}			
		});
		
	}
	else {
		UI.showError("The view " + name + " already exists in database");
	}
};

Table.prototype.deleteColumn = function(name) {
	var options = {
		action: 'DELETE_COLUMN',
		database: this.parent.name,
		table: this.name,
		column: name		
	};
	
	var table = this;
	
	ajax(options, function(data) {
		if (data != "OK")
			UI.showError(data);
		else {
			delete table.fields[name];
			UI.showTablePage(table.parent.name, table.name);
			UI.showMessage("Column deleted successfully.");
		}
	});
};


/**
 * Requests the MySqlServer object from server
 */
function getServer()
{
	var options = {
		action: 'GET_SERVER'
	};
	
	// Request the server object from server
	ajax(options, function(data) {
		if (res = $.parseJSON(data)) {
			$.extend(server, res);
			UI.serverUpdated();
		}
		else {
			UI.showError("Incorrect data recived from server.");
		}
	});
}

/**
 * Executes an AJAX POST request.
 * @param data - the data to send
 * @param callback - the success callback function
 */
function ajax(options, callback)
{
	$.ajax({
		url: 'ajax.php',
		type: 'POST',
		data: options,
		error: function(xhr, status, error)	{
			UI.showError("Ajax error (" + status +"):" + error);
		},
		success: function (data) {
			if (data === "Session error.")
				window.location = "index.php?action=login&error=Your session was expired.";
			else
				callback(data);
		},
		error: function () {
			UI.showError("Unable to connect to server.");
		}
	});
}
