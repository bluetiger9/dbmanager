<?php
/**
  Copyright (c) 2011 - Tőkés Attila
  
  This software is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 2 of the License, or
  (at your option) any later version.
   
  This software is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY.
 
  See the license.txt file for more details.
*/

require_once 'session.php';
require_once 'db/dbcore.php';
	
DBC::init();
DBC::connect();
	
$_SESSION['server'] = serialize(new MySQLServer());

?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="css/uniform.default.css" />
<link rel="stylesheet" type="text/css" href="css/absolution.blue.css" />
<link rel="stylesheet" type="text/css" href="css/style.css" />
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script src="js/jquery-ui-1.8.16.custom.min.js"></script>
<script src="js/jquery.uniform.min.js"></script>
<script src="js/database.js"></script>
<script src="js/ui-templates.js"></script>
<script src="js/ui.js"></script>
<script src="js/application.js"></script>
<title> DB Manager</title>
</head>
<body>
  <div id="wrapper">
    <div id="header-container">
      <div id="header">
      	<img src="images/logo.png" alt="Database Manager" id="logo"/>
      	<div id="menu-buttons">
      		<a class="menu-icon sql-button" href="javascript: UI.showSqlPage()" title="SQL Editor"> </a>
      		<a class="menu-icon refresh-button" href="javascript: location.reload();" title="Reload data"> </a>
      		<a class="menu-icon logout-button" href="index.php?action=logout" title="Logout"> </a>
      		
      	</div>
      </div>
    </div>
    
    <div id="content-row-wrapper">
      <div id="content-cell-wrapper">
        <div id="content-table-container">
		  <div id="left-menu-wrapper">
		    <div id="left-menu">
		      <span class="padding-clear">&nbsp;</span>
		   	  <div id="left-menu-content">
		   		<h1 style="margin-top:0px;"> Databases</h1>
		    	<div id="databases" class="text12"></div>
		    	<br /> <br /><br /> <br /><br /> <br />
		    	<h1> Users </h1>
		    	<div id="users" class="text12"> </div>
		      </div>
		    	
		    </div>
		  </div>
		  <div id="content-wrapper-cell">
		  	<div id="content-wrapper">
		  		<span class="padding-clear">&nbsp;</span>
		    	<div id="location"></div>
		    	<div id="error-messages" class="ui-state-error ui-corner-all text12"> 
		    		<span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>
		    		<strong> Error: </strong>
		    		<span id="error-message"> Can not load the database. </span>
		    	</div>
		    	<div id="status-messages" class="ui-state-highlight ui-corner-all text12"> 
		    		<span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>
		    		<span id="status-message"> Database created succesfully. </span>
		    	</div>				
		    	<div id="content">
	    		</div>
	    	</div>	
		  </div>
		</div>
      </div>
    </div>
    
    <div id="footer-container">
      <div id="footer">
      </div>
    </div>  
  </div>
  
  <div id="dialog">
  </div>
  
</body>
</html>
