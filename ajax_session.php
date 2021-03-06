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
session_start();

// Check for existing session
if (isset($_SESSION['user_agent']) && isset($_SESSION['token']))
{
	//print_r($_SESSION);
	//print_r($_COOKIE);
	// Check user agent and the request token
	if (($_SESSION['user_agent'] != md5($_SERVER['HTTP_USER_AGENT']))
	||	(!isset($_COOKIE['request_token']))
	||	($_SESSION['token'] != $_COOKIE['request_token']))
	{
		// Invalid token or user_agent
		session_unset();
		session_destroy();
		echo "Session error.";
		exit;
	}

	// Generate new token
	$_SESSION['token'] = md5(uniqid(rand(), true));
	setcookie('request_token', $_SESSION['token']);

	$_SESSION['last_request'] = time();
		
}
else
{
	echo 'Session error.';
	exit;
}

?>