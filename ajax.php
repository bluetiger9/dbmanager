<?php

require_once 'ajax_session.php';
require_once 'db/dbcore.php';

DBC::init();
DBC::connect();

$server = unserialize($_SESSION['server']);

//print_r($_POST);

if (isset($_POST['action']))
{
	switch ($_POST['action'])
	{
		case 'GET_SERVER':
			echo $server->json_encode();
			break;

		case 'GET_DATABASE':
			echo $server->getDatabase($_POST['database'])->json_encode();
			break;

		case 'GET_TABLE':
			echo $server->getDatabase($_POST['database'])->getTable($_POST['table'])->json_encode();
			break;

		case 'GET_USER':
			echo $server->getUser($_POST['user'])->json_encode();
			break;

		case 'CREATE_DATABASE':
			if (($x = $server->createDatabase($_POST['database'])) instanceof Database)
				echo $x->json_encode();
			else // error
				echo $x; // error message
			break;

		case 'CREATE_TABLE':
			if (($x = $server
						->getDatabase($_POST['database'])
							->createTable($_POST['table'], json_decode($_POST['fields']))) instanceof Table) 
			{
				echo $x->json_encode();							
			}
			else // error
				echo $x;
			break;

		case 'CREATE_USER':
			if (($x = $server->createUser($_POST['user'], $_POST['host'], $_POST['password'])) instanceof User)
				echo $x->json_encode();
			else // error
				echo $x;
			break;
			
		case 'CREATE_VIEW':
			echo $server->getDatabase($_POST['database'])->createView($_POST['view'], $_POST['sql']);
			break;
			
		case 'DELETE_DATABASE':
			echo $server->deleteDatabase($_POST['database']);
			break;
			
		case 'DELETE_TABLE':
			echo $server->getDatabase($_POST['database'])->deleteTable($_POST['table']);
			break;
			
		case 'DELETE_USER':
			echo $server->deleteUser($_POST['user']);
			break;
			
		case 'DELETE_VIEW':
			echo $server->getDatabase($_POST['database'])->deleteView($_POST['view']);
			break;
		case 'SQL':
			DBC::selectDB($_POST['database']);
			if ($x = DBC::query($_POST['sql']))	{
				if ($x instanceof mysqli_result) {
					$res->rows = array();
					$res->num_rows = $x->num_rows;
					while($row = $x->fetch_array(MYSQLI_ASSOC))
					{
						array_push($res->rows, $row);
					}
					echo json_encode($res);				
				}
				else echo '0';
			}
			else echo 'Unable to execute your code: <br/>' . DBC::error();
			break;
		
		case 'DELETE_COLUMN':
			echo $server->getDatabase($_POST['database'])->getTable($_POST['table'])->deleteField($_POST['column']);
			//echo $_POST['database'];//$server->getDatabase($_POST['database'])->json_encode();
			break;

	}
}
?>