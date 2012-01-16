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

require_once 'db/dbconnection.php';

error_reporting(E_ALL);
ini_set('display_errors', '1');


// Login / Logout
if (isset($_GET['action'])) 
{
	// Login
	if ($_GET['action'] == 'login')
	{
		// Save posted data in session
		$_SESSION['host'] = $_POST['host'];
		$_SESSION['user'] = $_POST['user'];
		$_SESSION['password'] = $_POST['password'];

		DBC::init();
		// Try to connect to database
		if (DBC::connect()){
			// Connection failed -> Login failed
			session_unset();
			session_destroy();
			
			//Redirect to index.php
			Header('Location: index.php?action=login&error=Unable+to+connect+to+database');
			exit;
		}
							
		// Generate first token
		$_SESSION['token'] = md5(uniqid(rand(), true));
		setcookie('request_token', $_SESSION['token']);
	
		// Capture the user_agent
		$_SESSION['user_agent'] = md5($_SERVER['HTTP_USER_AGENT']);
	
		Header("Location: dbmanager.php");
		exit;
	}
	else if ($_GET['action'] == 'logout')
	{
		session_unset();
		session_destroy();
		setcookie ("request_token", "", time() - 3600);
		Header('Location: index.php?action=login');
		exit;
	}
	
}

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
		header("Location: index.php?action=login");
		exit;
	}

	// Generate new token
	$_SESSION['token'] = md5(uniqid(rand(), true));
	setcookie('request_token', $_SESSION['token']);

	$_SESSION['last_request'] = time();
		
}
else
{
	Header("Location: index.php?action=login");
	exit;
}
?>