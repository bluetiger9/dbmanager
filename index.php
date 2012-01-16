<?php
	session_start();
	
	error_reporting(E_ALL);
	ini_set('display_errors', '1');
	
	if (!isset($_GET['action']))
	{	
		Header("Location: dbmanager.php");
	}
	else
	{
		if ($_GET['action'] == 'login')
		{
?>
<html>
<head>
	<title> Database Manager</title>
	<link rel="stylesheet" type="text/css" href="css/uniform.default.css" />
	<link rel="stylesheet" type="text/css" href="css/absolution.blue.css" />
	<link rel="stylesheet" type="text/css" href="css/index.css" />
</head>
<body>
	<div id="header">
		<img src="images/logo.png" alt="Database Manager" id="logo"/>
	</div>
	<div id='login_form'>
		<form method="POST" action="session.php?action=login" style="width: 200px;">
			<table>
				<tr> <td><b> Host </b></td> </tr>
				<tr> 
					<td> <input type="text" name="host" value="localhost" style="width: 100%"/> </td>
				</tr>
				<tr> <td> <b>User</b> </td> </tr>
				<tr> 
					<td> <input type="text" name="user" style="width: 100%"/> </td>
				</tr>
				<tr> <td> <b>Password</b> </td> </tr>
				<tr> 
					<td> <input type="password" name="password" style="width: 100%"/> </td>
				</tr>
				<tr>
					<td> <input type="submit" name="Login" value="Login" style="margin-top: 5px; height:30px; width:100%"/> </td>
				</tr>					
				
			</table>
		</form>
		<?php
			if (isset($_GET['error']))
			{
				echo '<b> ERROR: ' . $_GET['error'] . '</b>';
			} 
		?>								
	</div>
</body>
</html>
<?php 
		}
		else if ($_GET['action'] == 'logout')
		{
			header("Location: session.php?action=logout");
			
		}
	}
?>
		