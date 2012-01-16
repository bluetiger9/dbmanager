<?php

	class JSON_Encodable
	{
		private $x = 5;
		
		public function toArray($obj)
		{
			$properties = $obj;
			$result = array();
			
			print_r($properties);
			
			foreach ($properties as $k => $x)
			{
				print_r($k);
				print_r($x);
				echo "\n";
				
				if (is_array($x))
				{
					//$x = $this->toArray($x);
					$result[$k] = $this->toArray($x);					
				}else				
				if ($x instanceof JSON_Encodable)
				{
					$kk = substr($k, 0, strpos($k, ":"));
					echo "\n\n\n The old key: " . $k;
					echo "\n The new key: " . $kk ."\n\n";
					//echo "\n Trililu \n";
					$result[$kk] = $this->toArray($x);
				}
			}
			
			return $properties;
		}
		
		public function json_encode($obj)
		{
			echo "\n RETURN \n" . $this->toArray($obj);
			return json_encode($this->toArray($obj));			
		}
	}
?>