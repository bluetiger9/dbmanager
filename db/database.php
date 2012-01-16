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
 * Database Object
 * @author Tőkés Attila
 */
class Database
{
	/**
	 * The name of the database
	 * @var string
	 */
	private $name;

	/**
	 * The MySQLServer on that the database is located.
	 * @var MySQLServer
	 */
	private $parent;

	/**
	 * The list of tables in the database
	 * @var Table[]
	 */
	private $tables;
	
	/**
	 * The list of views from the database
	 * @var View[]
	 */
	private $views;

	/**
	 * Constructs a new database object.
	 * @param MySqlServer $parent
	 * @param string $name
	 */
	function __construct($name, $parent = null)
	{
		$this->name = $name;
		$this->parent = $parent;
		$this->tables = array();
		$this->views = array();
		
		if ($parent != null)
			$this->explore();
	}

	/**
	 * Explores the Database (get the list of tables, etc.).
	 */
	private function explore()
	{
		$query = SQLFactory::showTables($this);
		
		if ($result = DBC::query($query))
		{
			$x = 0;
			while ($row = $result->fetch_array())
			{
				if ($row[1] == "BASE TABLE")
					$this->tables[$row[0]] = null;
				else
					$this->views[$row[0]] = null;
			}
		}	
	}
	
	/**
	 * Creates a Table object for the specified table
	 * @param string $name - the name of the table.
	 */
	private function exploreTable($name)
	{
		$this->tables[$name] = new Table($name, $this);
	}

	/**
	 * Returns the specified table.
	 * @param string $name
	 * @return Database
	 */
	public function getTable($name)
	{
		if ($this->tables[$name] == null)
			$this->exploreTable($name);
		
		return $this->tables[$name];
	}
	
	/**
	 * Creates a table with the specified name and fields.
	 * @param $name
	 * @param $fields
	 */
	public function createTable($name, $fields)
	{
		$query = SQLFactory::createTable($this, $name, $fields);	
		
		if (DBC::query($query)) // succes
		{
			$this->tables[$name] = null;
			$this->exploreTable($name);
			return $this->tables[$name];
		}
		else
			return "Unable to create the table: " . DBC::error();
	}
	
	public function createView($name, $sql)
	{
		$query = SQLFactory::createView($name, $sql);
		
		DBC::selectDB($this->name);
		if (DBC::query($query))
		{
			$this->views[$name] = null;
			return "OK";
		}
		else 
			return "Unable to create the view. <br/> " . DBC::error(); 
	}
	
	/**
	 * Deletes a table
	 * @param unknown_type $name
	 */
	public function deleteTable($name)
	{
		$query = SQLFactory::deleteTable($name);
		
		DBC::selectDB($this->name);
		if (DBC::query($query))
		{
			unset($this->tables[$name]);
			return "OK";
		}
		else return "Unable to delete table. <br/>" . DBC::error();
		
	}
	
	/**
	 * Deletes a view
	 * @param unknown_type $name
	 */
	public function deleteView($name)
	{
		$query = SQLFactory::deleteView($name);
		
		DBC::selectDB($this->name);
		if (DBC::query($query))
		{
			unset($this->views[$name]);
			return "OK";
		}
		else return "Unable to delete view.<br/>" . DBC::error();
		
	}
	
	/**
	 * Returns the name of the database.
	 */
	public function getName()
	{
		return $this->name;
	}
	
	/**
	 * Returns the parent MySQL object.
	 * @return MySQLServer
	 */
	function parent()
	{
		return $this->parent;
	}
	
	/**
	 * Return the JSON encoded string of the object
	 * @return string
	 */
	function json_encode() { return json_encode(get_object_vars($this)); }
}

?>