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
 * MySql Server Object
 */
class MySQLServer
{
	/**
	 * Contains information about the MySQl server and client. 
	 */
	private $info;
	
	/**
	 * The list of databases on server.
	 * @var Database
	 */
	private $databases;

	/**
	 * The list of users on server
	 * @var string User
	 */
	private $users;

	/**
	 * Constructs a new MySqlServer object.
	 */
	public function __construct()
	{
		$this->explore();

		$this->info['server_info'] = DBC::$mysqli->server_info;
		$this->info['server_version'] = DBC::$mysqli->server_version;
		$this->info['client_info'] = DBC::$mysqli->client_info;
		$this->info['client_version'] = DBC::$mysqli->client_version;
		$this->info['host_info'] = DBC::$mysqli->host_info;
		$this->info['protocol_version'] = DBC::$mysqli->protocol_version;
		$this->info['user'] = DBC::$user . '@' . DBC::$host;
	}
	
	/**
	 * Explores the MySQL Servers
	 */
	private function explore()
	{
		$this->databases = array();
		$query = SQLFactory::showDatabases();
		if ($result = DBC::query($query))
		{
			while ($row = $result->fetch_array())
			{
				$this->databases[$row[0]] = null;
			}
		}
		
		$this->users = array();
		$query = SQLFactory::showUsers();
		if ($result = DBC::query($query))
		{
			while ($row = $result->fetch_array(MYSQLI_ASSOC))
			{
				$this->users[$row['User'].'@'.$row['Host']] = new User($row, $this);
			}						
		}		
		
	}

	/**
	 * Creates a Database object for the requested database.
	 * @param string $name - the name of database to explore
	 */
	private function exploreDB($name)
	{
		$this->databases[$name] = new Database($name, $this);
	}
	
	private function exploreUser($name_host)
	{
		//$this->users[$name_host] = new User($name_host);
		$this->explore();
	}
	
	/**
	 * Returns the Database object for the requested database.
	 * @param string $name - the name of requested database
	 * @return Database
	 */
	public function getDatabase($name)
	{
		if ($this->databases[$name] == null)
			$this->exploreDB($name);

		return $this->databases[$name];
	}
	
	public function getUser($name_host)
	{
		if ($this->users[$name_host] == null)
			$this->exploreUser($name_host);
			
		return $this->users[$name_host];
	}
	
	/**
	 * Creates a new database. Returns the database object on succes, othervise an error message.
	 * @param string $name - the name of the database to create
	 * @return Database or string
	 */
	public function createDatabase($name)
	{
		$query = SQLFactory::createDatabase($name);

		if (DBC::query($query))
		{
			$this->databases[$name] = null;
			return $this->getDatabase($name);
		}
		else
			return "Failed to create database: " . DBC::error();
	}
	
	/**
	 * 
	 * Enter description here ...
	 * @param $name
	 * @param $host
	 * @param $password
	 */
	public function createUser($name, $host, $password)
	{
		$sql = SQLFactory::createUser($name, $host, $password);
		
		if (DBC::query($sql))
		{
			$this->users[$name.'@'.$host] = null;
			return $this->getUser($name.'@'.$host);			
		}
		else {
			return "ERROR: Failed to create user: " . DBC::error();
		}
	}

	/**
	 * Deletes a database
	 * @param unknown_type $name
	 */
	public function deleteDatabase($name)
	{
		$query = SQLFactory::deleteDatabase($name);

		if (DBC::query($query))
			return "OK";
		else
			return "Unable to delete the database. <br/> " . DBC::error();
	}
	
	/**
	 * Deletes a user
	 * @param unknown_type $user
	 */
	public function deleteUser($user)
	{
		$query = SQLFactory::deleteUser($user);
		
		if (DBC::query($query))
		{
			unset($this->users[$user]);
			return 'OK';
		}
		else
			return 'Unable to delete the user. <br />' . DBC::error();
	}

	public function sql($sql)
	{
		$result = DBC::query($sql);
		
		if ($result instanceof mysqli_result)
		{
			$first = true;
			$a = array();
			while ($row = $result->fetch_array(MYSQLI_ASSOC))
			{
				array_push($a, $row);				
			}
			return json_encode($a);			
		}
		else 
			return $result;
	}
	/**
	 * Return the JSON encoded string of the object
	 * @return string - the JSON encoded form of the object.
	 */
	function json_encode() { return json_encode(get_object_vars($this)); }
}
?>
