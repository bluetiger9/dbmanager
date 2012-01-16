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
 * Contains a set of functions that generates SQL commands for different purposes.
 * @author Tőkés Attila *
 */
class SQLFactory
{
	/**
	 * Generates SQL for querying the list of databases.
	 */
	static public function showDatabases()
	{
		return "SHOW DATABASES";
	}

	/**
	 * Generates SQL for querying the list of tables.
	 * @param Database $db
	 */
	static public function showTables($db)
	{
		return "SHOW FULL TABLES FROM " . $db->getName();		
	}
	
	/**
	 * Generates SQL for querying the structure of a table.
	 * @param Table $table
	 */
	static public function showColumns($table)
	{
		return "SHOW COLUMNS FROM " . $table->parent()->getName() . "." . $table->getName();
	}
	
	/**
	 * Generates SQL for querying the list of users
	 */
	static public function showUsers()
	{
		return "SELECT * FROM mysql.user";
	}
	
	/**
	 * Generates SQL for creating a new database.
	 * @param string name - the name of the database to create.
	 */
	static public function createDatabase($name)
	{
		return "CREATE DATABASE " . $name;
	}
	
	/**
	 * Generates SQL for creatign a user.
	 * @param unknown_type $name
	 * @param unknown_type $host
	 * @param unknown_type $password
	 */
	static public function createUser($name, $host, $password)
	{
		return 'CREATE USER ' . $name . '@' . $host . ' IDENTIFIED BY \'' . $password . '\'';
	}
	
	/**
	 * Generates SQL for creating a new table.
	 * @param $db
	 * @param $tname
	 * @param $fields
	 */
	static public function createTable($db, $tname, $fields)
	{
		$sql = "CREATE TABLE " . $db->getName() . "." . $tname . "(\n";
		
		$nr = count($fields);
		$i = 0;
		foreach ($fields as $f) {
			$sql .= $f->name . " " . $f->type;
			if ($f->def != "")
				$sql .= " DEFAULT $f->def";
			if ($f->primaryKey == true)
				$sql .= " PRIMARY KEY";
			if ($f->cNull == false)
				$sql .= " NOT NULL";
			$i++;
			if ($i < $nr)
				$sql .= ",\n";
		};
		$sql .= "\n);";
		
		return $sql;
	}
	
	/**
	 * Generates SQL for creating a view.
	 * @param unknown_type $name
	 * @param unknown_type $sql
	 */
	static public function createView($name, $sql)
	{
		return "CREATE VIEW " . $name . " AS " . $sql;
	}
	
	/**
	 * Generates SQL for deleting a database
	 * @param unknown_type $name
	 */
	static public function deleteDatabase($name)
	{
		return "DROP DATABASE " . $name;
	}
	
	static public function deleteTable($name)
	{
		return "DROP TABLE " . $name;
	}
	
	static public function deleteView($name)
	{
		return "DROP View " . $name;
	}
	
	static public function deleteColumn($db, $table, $column)
	{
		return 'ALTER TABLE ' . $table . ' DROP COLUMN ' . $column;
	}
	
	static public function deleteUser($user)
	{
		return 'DROP USER ' . $user;
	}
}

?>