<?php

class User {
	
	private $host;
	public $user;
	private $rights;
	
	/**
	 * Constructor
	 * @param $props
	 * @param $parent
	 */
	public function __construct($props, $parent) 
	{		
		$this->host = $props['Host'];
		$this->user = $props['User'];
		
		$this->rights = $props;
		
		unset($this->rights['Host']);
		unset($this->rights['User']);
		unset($this->rights['Password']);
					
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