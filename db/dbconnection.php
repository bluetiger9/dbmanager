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

/**
 * Database Connection.
 */
class DBC {
	/**
	 * The Mysqli Connection
	 * @var mysqli
	 */
	public static $mysqli;

	/**
	 * The host of the MySQL server.
	 * @var string
	 */
	public static $host;

	/**
	 * The list of users on server
	 * @var string User
	 */
	public static $user;

	/**
	 * The password of the user
	 */
	public static $password;

	/**
	 * Initializes the varibiles from the SESSION.
	 */
	public static function init()
	{
		self::$host = $_SESSION['host'];
		self::$user = $_SESSION['user'];
		self::$password = $_SESSION['password'];
	}

	/**
	 * Connects to the mysqli server.
	 * @return the connection error code (0 if no error)
	 */
	public static function connect()
	{
		self::$mysqli = new mysqli(self::$host, self::$user, self::$password);
		return self::$mysqli->connect_error;
	}

	/**
	 * Closes the connection.
	 */
	public static function disconnect()
	{
		self::$mysqli->close();
	}
	
	/**
	 * Executes a query using the MySQLi connection.
	 */
	public static function query($sql)
	{
		return self::$mysqli->query($sql);
	}
	
	/**
	 * Selects a specified database
	 */
	public static function selectDB($dbname)
	{
		return self::$mysqli->select_db($dbname);
	}
	
	/**
	 * Return the mysqli error.
	 */
	public static function error()
	{
		return self::$mysqli->error;
	}
}
?>