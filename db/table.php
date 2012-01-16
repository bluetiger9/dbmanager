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
 * Table Object
 * @author Tőkés Attila
 *
 */
class Table
{
	/**
	 * The Database containing the table.
	 * @var Database
	 */
	private $parent;
	
	/**
	 * The list of fields.
	 * @var Field[]
	 */
	private $fields;
	
	/**
	 * The name of the table.
	 * @var string
	 */
	private $name;

	/**
	 * Constructs a new Table object.
	 * @param unknown_type $name - the name of the table
	 * @param string $parent - the database containing this table
	 */
	function __construct($name, &$parent)
	{
		$this->parent = $parent;
		$this->name = $name;
		$this->fields =  array();
		
		if ($parent != null)
			$this->explore();		
	}
	
	
	private function explore()
	{
		$query = SQLFactory::showColumns($this);
	
		if ($result = DBC::query($query))
		{
			while ($row = $result->fetch_array())
			{
				$field = new Field($row['Field'], $this);
				$field->type = $row['Type'];
				$field->key = $row['Key'];
				$field->cNull = $row['Null'];
				$field->defaultV = $row['Default'];
				$field->extra = $row['Extra'];

				$this->fields[$field->name] = $field;
			}
		}
	}
	
	public function getName()
	{
		return $this->name;
	}
	
	/**
	 * Returns the list of fields.
	 * @return Field[]
	 */
	public function getFields()
	{
		return $this->fields;	
	}

	/**
	 * Deletes a field from table
	 * @param $name
	 */
	public function deleteField($name)
	{
		$sql = SQLFactory::deleteColumn($this->parent->getName(), $this->name, $name);
		
		DBC::selectDB($this->parent->getName());
		if (DBC::query($sql))
			return 'OK';
		else
			return 'Failed to delete the column. <br />' . DBC::error();
	}
	
	/**
	 * Returns the parent Database object.
	 * @return Database
	 */
	function parent()
	{
		return $this->parent;
	}
	
	
	/**
	 * Return the JSON encoded string of the object
	 * @return string
		*/
	public function json_encode() { 
		return json_encode(get_object_vars($this)); 
	}
}
?>