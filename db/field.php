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
 * Represents a field (or column) of a table.
 * @author Tőkés Attila
 */
class Field
{
	/**
	 * The name of the field.
	 * @var string
	 */
	public $name;

	/**
	 * The type of the field.
	 * @var string
	 */
	public $type;
	
	/**
	 * True if the NULL values are allowed in this column.
	 * @var bool
	 */
	public $cNull;
	
	/**
	 * The default value for the column.
	 * @var same as the type of field ($type).
	 */
	public $defaultV;
	
	/**
	 * Extra information.
	 * @var string
	 */
	public $extra;
	
	/**
	 * The table containing this field. Null for new fields.
	 * @var Table 
	 */
	private $parent;
	
	/**
	 * This variabile has value if this field is primary key, unique, etc.
	 * @var unknown_type
	 */
	public $key;

	/**
	 * Constructs a new Field object.
	 * @param Table $parent - the table containing this field
	 * @param string $name - the name of the table.
	 */
	public function __construct($name, $parent)
	{
		$this->name = $name;
		$this->parent = $parent;	
	}

	/**
	 * Returns the parent Table object.
	 * @return Table
	 */
	function parent()
	{
		return $parent;
	}

}
?>
