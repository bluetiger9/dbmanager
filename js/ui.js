function UI() {};

/**
 * Updates the location bar.
 */
UI.updateLocation = function (db, table)
{
	var html = '<span class="text12" ><span class="ui-icon ui-icon-home" style="float: left; margin-right: .3em;"></span>';
	html += '<a class href="javascript: UI.showHomePage();" > Home Page </a>';
	
	if (db !== undefined){
		html += '<span class="ui-icon ui-icon-triangle-1-e" style="float: left; margin-right: .3em;"></span>' +
				'<span class="ui-icon ui-icon-bookmark" style="float: left; margin-right: .3em;"></span>' +
				'<a href="javascript: UI.showDatabasePage(\'' + db + '\');">' + db + '</a>';
		if (table !== undefined)
			html += '<span class="ui-icon ui-icon-triangle-1-e" style="float: left; margin-right: .3em;"></span>' +
					'<span class="ui-icon ui-icon-calculator" style="float: left; margin-right: .3em;"></span>' +
					'<a href="javascript: UI.showTablePage(\'' + db + '\', \'' + table + '\');">' + table + '</a>';
	}
	
	html += "&nbsp</span>";
	$('#location').html(html);
	
};

/**
 * Invoked when the server object is updated.
 */
UI.serverUpdated = function()
{
	var db_list = "";
		
	$.each(server.databases, function(key, value){
		db_list += '<a href="javascript: UI.showDatabasePage(\'' + key + '\');">' +  key + "</a><br/>"; 
	});
	
	$("#databases").html(db_list);
	
	var user_list = "";
	
	$.each(server.users, function(key, value){
		user_list += '<a href="javascript: UI.showUserPage(\'' + key + '\');" title="' + key + '">'+ value.user + '</a><br/>'; 
	});
	
	$("#users").html(user_list);
	
	UI.showHomePage();
	
	$('.menu-button').button();
};

/**
 * Shows an error message on the page.
 */
UI.showError = function(str)
{
	$('#error-message').html(str);
	$('#error-messages').show();
	UI.hideMessage();
};

/**
 * Hides the current error message if displayed.
 */
UI.hideError = function()
{
	$('#error-messages').hide();
};

/**
 * Shows a message on the page.
 */
UI.showMessage = function(str)
{
	$('#status-message').html(str);
	$('#status-messages').show();
	UI.hideError();
};

/**
 * Hides the current message if displayed.
 */
UI.hideMessage = function()
{
	$('#status-messages').hide();
}


UI.setContent = function(html) 
{
	$("#content").html(html);
	UI.hideMessage();
	UI.hideError();
};

UI.showHomePage = function()
{
	UI.updateLocation();
	
	cdb = "";
	var html;
	UI.setContent(html_home_page);
	
	// MySQL server info
	html = "<li> <b>Server version: </b>" + server.info['server_info'] + "</li>" +
		   "<li> <b> Client version: </b>" + server.info['client_info'] + "</li>" +
		   "<li> <b> Protocolo version: </b>" + server.info['protocol_version'] + "</li>" +
		   "<li> <b> Host information: </b>" + server.info['host_info'] + "</li>" + 
		   "<li> <b> Current user: </b>" + server.info['user'] + "</li>";

	$("#home-page-info-list").html(html);
	
	// Databases
	html = "";
	$.each(server.databases, function(key, value){
		html += '<li>' +
		        '<a href="javascript: UI.showDatabasePage(\'' + key + '\');">' + key + "</a>" + 
		        "</li>";
	});
	
	$("#home-page-db-list").html(html);
	
	// Users
	html = "";
	$.each(server.users, function(key, value){
		html += '<li><a href="javascript: UI.showUserPage(\'' + key + '\');">' + key + "</a></li>"; 
	});
	
	$("#home-page-user-list").html(html);
	
		
	$("#new-database")
		.button()
		.click(UI.showNewDatabaseDialog);

	$("#new-user")
		.button()
		.click(UI.showNewUserDialog);
};


UI.showDatabasePage = function(name)
{
	UI.updateLocation(name);
	cdb = name;
	if (server.databases[name] == null){
		server.getDatabase(name); return;
	}
	var html = "";
	var db = server.databases[name];
	UI.setContent(html_db_page);
	
	$('#new-table')
		.button()
		.click(function() {
			UI.showNewTableDialog(name);			
		});
	$('#new-view')
		.button()
		.click(function() {
			UI.showNewViewDialog(name);
		});
	$('#delete-database')
		.button()
		.click(function() {
			UI.showDeleteDatabaseDialog(name);
		});
	
	// Tables
	if (Object.keys(db.tables).length > 0) {
		$.each(db.tables, function(key, value){
			html += '<tr><td><b><span class="text12">' +  key + '</span></b></td>';
			html += '<td><a href="javascript: UI.showDeleteTableDialog(\''+ db.name + "\', \'" + key + '\');" class="del-button"> Delete</a>' +
					'<a href="javascript: UI.showSqlPage(\'SELECT * FROM ' + key + '\');" class="browse-button"> Browse</a>' +
					'<a href="javascript: UI.showTablePage(\''+ db.name + "\', \'" + key + '\');" class="edit-button"> Edit</a></td></tr>';	
		});
		
		$('#db-table-list').append(html);
	} else {
		$('#db-table-list').replaceWith('<span class="text12">There are no tables in the database</span>');
	};
	
	
	html = "";
	
	if (Object.keys(db.views).length > 0) {
		$.each(db.views, function(key, value){
			html += '<tr><td><b><span class="text12">' +  key + '</span></b></td>';
			html += '<td><a href="javascript: UI.showDeleteViewDialog(\''+ db.name + "\', \'" + key + '\');" class="del-button" > Delete</a>' +
					'<a href="javascript: UI.showSqlPage(\'SELECT * FROM ' + key + '\');"  class="browse-button"> Browse</a></td></tr>';	
		});
		
		$('#db-view-list').append(html);
	} else {
		$('#db-view-list').replaceWith('<span class="text12">There are no views in the database</span>');		
	};

	
	$('.db-page .del-button').button({
		icons: {
			primary: 'ui-icon-trash'
		}
	});
	
	$('.db-page .browse-button').button({
		icons: {
			primary: 'ui-icon-folder-open'
		}
	});
	
	$('.db-page .edit-button').button({
		icons: {
			primary: 'ui-icon-pencil'
		}
	});
};

UI.showTablePage = function(db, table) {
	if (server.databases[db].tables[table] == null)	{
		server.databases[db].getTable(table); return;
	}
	
	UI.updateLocation(db, table);
	
	var tb = server.databases[db].tables[table];
	
	UI.setContent(html_table_page);
	
	$('#table-delete')
		.button()
		.click(function() {
			UI.showDeleteTableDialog(db, table);
		});
	
	$('#table-browse')
		.button()
		.click(function() {
			UI.showSqlPage("SELECT * FROM " + table);
		});
	
	$('#table-new-fields')
		.button()
		.click(function() {
			UI.showSqlPage("ALTER TABLE " + table + " ADD COLUMN (\n\n)");			
		});
	
	$('#table-delete-fields')
		.button()
		.click(function() {
			UI.showSqlPage("ALTER TABLE " + table + " DROP COLUMN");			
		});
	
	$('#table-constraint')
		.button()
		.click(function() {
			UI.showSqlPage("ALTER TABLE " + table + " ADD CONSTRAINT");
		});
	
	$('#table-insert-data')
		.button()
		.click(function() {
			UI.showSqlPage("INSERT INTO " + table + "() VALUES \n(   )\n");
		});
	
	$('#table-delete-data')
		.button()
		.click(function() {
			UI.showSqlPage("DELETE FROM " + table + " WHERE ");
		});


	
	if (Object.keys(tb.fields).length > 0) 
	{
		$.each(tb.fields, function(key, value) {
			var html = 
				'<tr>' +
				'	<td class="text12">' + value.name + '</td>' +
				'	<td class="text12">' + value.type + '</td>' +
				'	<td class="text12">' + value.key + '</td>' +
				'	<td class="text12">' + value.cNull + '</td>' +
				'	<td class="text12">' + value.defaultV + '</td>' +
				'	<td class="text12">' + value.extra + '</td>' +
				'	<td> <a href="javascript: UI.showDeleteFieldDialog(\'' +  db + '\', \'' + table + '\', \'' +  key + '\');"> Delete </a> </td>' +
				'</tr>';
			$('.table-page #table-field-list').append(html);
		});
	};
	
	$('.table-page a').button();
	
	
};

UI.showSqlPage = function(sql) {
	if (sql === undefined)
		var sql = "";
	
	UI.setContent(html_sql_editor);
	
	$('#sql-editor #sql-text').html(sql);
	
	$('#sql-editor #execute')
		.button()
		.click(function(){
			server.sql(
				$('#sql-editor #sql-text').val(),
				function ret(data) {
					if (data == 0) {
						UI.showMessage("Your command was executed successfully. No rows returned.");
						$('#sql-editor #sql-result').html("");
					} else if (typeof(data) == 'string') {
						UI.showError(data);
						$('#sql-editor #sql-result').html("");
					}
					else
					{
						UI.showMessage('Your command was executed succesfully. ' + data.num_rows + ' rows returned.');
						var html = "<h1> Result </h1>" +
							   '<table class="text12" style="text-align: center;">';
						first = true;
						$.each(data.rows, function(key, value) {
							if (first) {
								html += "<tr>";
								$.each(value, function(key1, value1) {
									html += "<th>" + key1 + "</th>";									
								});
								html += "</tr>";
							};
							html += "<tr>";
							first = false;
							$.each(value, function(key1, value1) {
								html += "<td>" + value1 + "</td>";									
							});
							html += '</tr>';
						});
						
						$('#sql-editor #sql-result').html(html);
					}	
						
				}
			);
		});
};

/**
 * Creates and shows the "New Database" dialog. 
 */
UI.showNewDatabaseDialog = function() {
	$("#dialog")
		.html(dialog_new_database)
		.dialog({
			title: "New Database",
			autoOpen: true,
			width: 300,
			buttons: {
				"Create Database": function() {
					server.createDatabase(
						$('#dialog #new-database-name').val()					
					);
				}, 
				"Cancel": function() { 
					$(this).dialog("close"); 
				} 
			}
		});
};

/**
 * Creates and show a "New Table" dialog 
 */
UI.showNewTableDialog = function(database) {
	$('#dialog')
		.html(dialog_new_table)
		.dialog({
			title: "New Table",
			autoOpen: true,
			width: 300,
			buttons: {
				"Create Table": function() {
					UI.closeDialog();
					UI.showNewTablePage(
						database,
						$('#dialog #new-table-name').val()					
					);
				}, 
				"Cancel": function() { 
					UI.closeDialog();
				} 
			}
		});
};

UI.showNewTablePage = function (db, name)
{
	UI.setContent(html_new_table_page);
	
	$('#new-table-page #new-table-name').html("New Table: " + name);
	$('#new-table-page #new-table-submit')
		.button()
		.click(function(){
			var fields = new Array();
			$("#new-table-page #table-field-list .new-table-column")
				.each(function(key, value){
					var x = new Object();
					x.name = $(this).find(".column-name").val();
					x.type = $(this).find(".column-type").val();
					x.def = $(this).find(".column-default-value").val();
					x.primaryKey = $(this).find(".column-primary-key").is(':checked');
					x.cNull = $(this).find(".column-null").is(':checked');
					fields.push(x);
				});
			server.databases[db].createTable(name, fields);
		});
	
	$('#new-table-page #new-column')
		.button()
		.click(function(){
			$('#new-table-page #table-field-list')
				.append(html_new_table_field_row);
		});
	
};

UI.showNewViewDialog = function(db) {
	$('#dialog')
		.html(dialog_new_view)
		.dialog({
			title: "New View",
			autoOpen: true,
			width: 300,
			buttons: {
				"Create View": function() {
					UI.closeDialog();
					server.databases[db].createView(
						$('#dialog #new-view-name').val(),
						$('#dialog #new-view-sql').val()
					);
				}, 
				"Cancel": function() { 
					UI.closeDialog();
				} 
			}
		});
		
};

UI.showDeleteDatabaseDialog = function(db) {
	$('#dialog')
		.html(dialog_delete_db)
		.dialog({
			title: "Delete Database",
			autoOpen: true,
			width: 300,
			buttons: {
				"Delete Database": function() {
					UI.closeDialog();
					server.deleteDatabase(db);
				}, 
				"Cancel": function() { 
					UI.closeDialog();
				} 
			}
		});
	
};

UI.showDeleteTableDialog = function(db, table) {
	$('#dialog')
		.html(dialog_delete_table)
		.dialog({
			title: "Delete Table",
			autoOpen: true,
			width: 300,
			buttons: {
				"Delete Table": function() {
					UI.closeDialog();
					server.databases[db].deleteTable(table);
				}, 
				"Cancel": function() { 
					UI.closeDialog();
				} 
			}
		});
	
};

UI.showDeleteViewDialog = function(db, view) {
	$('#dialog')
		.html(dialog_delete_view)
		.dialog({
			title: "Delete View",
			autoOpen: true,
			width: 300,
			buttons: {
				"Delete View": function() {
					UI.closeDialog();
					server.databases[db].deleteView(view);
				}, 
				"Cancel": function() { 
					UI.closeDialog();
				} 
			}
		});
	
};

UI.showNewUserDialog = function() {
	$('#dialog')
		.html(dialog_new_user)
		.dialog({
			title: "Create User",
			autoOpen: true,
			width: 300,
			buttons: {
				"Create User": function() {
					UI.closeDialog();
					server.createUser(
						$('#dialog #new-user-name').val(),
						$('#dialog #new-user-host').val(),
						$('#dialog #new-user-password').val()
					);
				}, 
				"Cancel": function() { 
					UI.closeDialog();
				} 
			}
		});
		
};

UI.showDeleteFieldDialog = function(db, table, name) {
	$('#dialog')
		.html(dialog_delete_field)
		.dialog({
			title: "Delete Column",
			autoOpen: true,
			width: 300,
			buttons: {
				"Delete Column": function() {
					UI.closeDialog();
					server.databases[db].tables[table].deleteColumn(name);
				}, 
				"Cancel": function() { 
					UI.closeDialog();
				} 
			}
		});
}


UI.showUserPage = function(user_host) {
	if (server.users[user_host].getted != true)
	{
		server.getUser(user_host);
		return;
	}
	
	UI.setContent(html_user_page);
	
	var user = server.users[user_host];
	html = "<h1>User: " + user_host + "</h1>" +
		   '<h1> Actions </h1>' +
		   '<button id="user-delete"> Delete user </button>' +
		   '<button id="user-change-password"> Change password </button>' +
		   '<button id="user-grant-rights"> Grant rights </button>' +
		   '<button id="user-revoke-rights"> Revoke rights </button>';
	html += "<h1> Rights: </h1>" +
			'<table class="text12"><tr>';
	

	
	var i = 0;
	$.each(user.rights, function(key, value) {
		if (i++ % 3 == 0) html += '</tr> <tr>';
		html += '<td style="padding-left: 30px;"><b>'+ key + "</b>: " + value + "<br/></td>";
	});
	
	html += '<tr> </table>';
	$('#user-page').html(html);
	
	$('#user-delete')
		.button()
		.click(function(){
			UI.showDeleteUserDialog(user_host);
		});

	$('#user-change-password')
		.button()
		.click(function(){
			UI.showSqlPage('SET PASSWORD FOR ' + user_host + ' = PASSWORD(\'newpassword\')');
		});	

	$('#user-grant-rights')
		.button()
		.click(function(){
			UI.showSqlPage('GRANT right ON *.* TO ' + user_host);
		});

	$('#user-revoke-rights')
		.button()
		.click(function(){
			UI.showSqlPage('REVOKE right ON *.* FROM ' + user_host);
		});	
}

UI.showDeleteUserDialog = function(name_host) {
	$('#dialog')
		.html(dialog_delete_user)
		.dialog({
			title: "Delete User",
			autoOpen: true,
			width: 300,
			buttons: {
				"Delete User": function() {
					UI.closeDialog();
					server.deleteUser(name_host);
				}, 
				"Cancel": function() { 
					UI.closeDialog();
				} 
			}
		});
}


/**
 * Closes and destroys, the current dialog box.
 */
UI.closeDialog = function() {
	$('#dialog')
		.dialog("close")
		.dialog("destroy");
};




