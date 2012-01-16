// HTML templates

// Home page
html_home_page = 
'<div id="home-page">' +
'	<div id="home-page-top">' +
'		<div id="home-page-actions">' +
'			<h1> Actions: </h1>' +
'			<button type="button" id="new-database"> New Database </button>' +
'			<button type="button" id="new-user"> New User </button><br /><br />' +
'		</div>' +
'		<div id="home-page-info">' +
'			<h1> MySQL Info:</h1>' +
'				<ul id="home-page-info-list"> </ul>' +
'		</div>' +
'	</div>' + 
'	<div id="home-page-bottom">' +
'		<div id="home-page-databases">' +
'			<h1> Databases:</h1>' +
'				<ul id="home-page-db-list"> </ul>' +
'		</div>' +
'		<div id="home-page-users"> '+
'			<h1> Users: </h1>' +
'				<ul id="home-page-user-list"> </ul>' +
'		</div>' +
'	</div>' +
'</div>';

// Database page
html_db_page =
'<div class="db-page column-layout">' +
'   <div class="column first">' +
'	<div class="db-page-tables">' +
'   	<h1> Tables </h1>' +
'		<table id="db-table-list">' +
'		<tr style="font-size: 12pt"> <th> Name </th> <th> Actions </th> </tr>' +	
'		</table>' +
'   </div>' +
'   </div>' +
'   <div class="column">' +
'	<div class="db-page-actions">' +
'		<h1> Actions </h1>' +
'		<button type="button" id="new-table"> New Table </button>' +
'		<button type="button" id="new-view"> New View </button>' +
'		<button type="button" id="delete-database"> Delete Database </button>' +
'	</div><br/>' +
'	<div class="db-page-views">' +
'		<h1> Views </h1>' +
'		<table id="db-view-list">' +
'		<tr style="font-size: 12pt"> <th> Name </th> <th> Actions </th> </tr>' +	
'		</table>' +
'	</div>' +
' 	</div>' +
'</div>';

// Table page
html_table_page =
'<div class="table-page">' +
'	<div id="table-actions">' +
'		<h1> Actions </h1>' +
'		<button type="button" id="table-browse"> Browse Table </button>' +
'		<button type="button" id="table-delete"> Delete Table </button>' +
'		<button type="button" id="table-new-fields"> Add New Fields </button>' +
'		<button type="button" id="table-delete-fields"> Delete Fields </button>' +
'		<button type="button" id="table-constraint"> Add Constraint </button>' +
'		<button type="button" id="table-insert-data"> Insert Data </button>' +
'		<button type="button" id="table-delete-data"> Delete Data </button>' +
'	</div>' +
'	<div id="table-fields">'+
'		<h1> Fields </h1>' +
'		<table id="table-field-list">' +
'			<tr style="font-size: 10pt">' +
'				<th> Name </th>' +
'				<th> Type </th>' +
'				<th> Key </th>' +
'				<th> Null </th>' +
'				<th> Default </th>' +
'				<th> Extra </th>' +
'				<th> Actions </th>' +
'			</tr>' +
'		</table>' +
'	</div>' +
'</div>';

html_new_table_field_row = 
'		<tr class="text12 new-table-column">' +
'			<td> <input type="text" class="column-name" value="column"/> </td>' +
'			<td> <select class="column-type">' + 
'					<option value="int">Integer</option>' +
'					<option value="varchar(30)">Varchar</option>' +
'					<option value="date">Date</option>' +
'					<option value="text">Text</option>' +
'				 <select>' + 	
'			</td> ' +
'			<td> <input type="text" class="column-default-value"/> </td>' +
'			<td> <input type="checkbox" class="column-primary-key"/> </td>' +
'			<td> <input type="checkbox" class="column-null"/> </td>' +
'		</tr>';

html_new_table_page =
'<div id="new-table-page">' +
'	<h1 id="new-table-name"> New Table </h1>' +
'	<button type="button" id="new-table-submit"> Submit </button>' + 
'	<h1> Columns </h1>' +
'   <table id="table-field-list">' +
'		<tr style="font-size: 10pt">' + 
'			<th> Name </th>' +
'			<th> Type </th>' +
'			<th> Default Value </th>' +
'			<th> Pirmary Key </th>' +
'			<th> Null <th>' +
'		</tr>' +
		html_new_table_field_row +
'	</table>' +
'	<button type="button" id="new-column"> Add column </button>' +
'<div>';

html_sql_editor = 
'<div id="sql-editor">' +
'<h1> SQL Editor </h1>' +
'<textarea style="width: 500px; height:100px;" id="sql-text"> </textarea>' +
'<br/> <button type="button" style="width:500px;" id="execute"> Execute </button>' +
'<div id="sql-result"> </div>' +
'</div>';

// New Database Dialog
dialog_new_database =
'	<p>' +
'		<label> Name: </label> <input id="new-database-name" type="text"/>' +
'	</p>';

// New Table Dialog
dialog_new_table =
'	<p>' +
'		<label> Name: </label> <input id="new-table-name" type="text"/>' +
'	</p>';

// New View Dialog
dialog_new_view =
'<p>' +
'		<label> Name: </label> <input id="new-view-name" type="text"/><br/>' +
'		<label> Select statement: </label> <br/><textarea style="width:250px; height:100px;" id="new-view-sql"></textarea>' +
'</p>';

// Database delete confirm dialog
dialog_delete_db =
'<p>' +
'Are you sure that you want to delete the database?' +
'</p>';

// Table delete confirm dialog
dialog_delete_table =
'<p>' +
'Are you sure that you want to delete the table?' +
'</p>';

// View delete confirm dialog
dialog_delete_view =
'<p>' +
'Are you sure that you want to delete the table?' +
'</p>';

// New user dialog
dialog_new_user = 
'<p>' +
'		<label> Name: </label> <input id="new-user-name" type="text"/><br/>' +
'		<label> Host: </label> <input id="new-user-host" type="text"/><br/>' +
'		<label> Password: </label> <input id="new-user-password" type="password"/><br/>' +
'</p>';

dialog_delete_field = 
'<p>' +
'Are you sure that you want to delete the field?' +
'</p>';

dialog_delete_user = 
'<p>' +
'Are you sure that you want to delete the user?' +
'</p>';

html_user_page =
'<div id="user-page">' +
'<div>';
	



