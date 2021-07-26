<?php
session_start();
$sensitive_data = "/home/ramin/sensitive_data";

if(!isset($_POST['username']) || !isset($_POST['password'])) {
    echo "Something went wrong.";
    exit;
}

$username = $_POST['username'];
$password = $_POST['password'];

if (strlen($username) < 1) {
    echo "Username is too short.";
    exit;
} else if (strlen($password) < 1) {
    echo "Password is too short.";
    exit;
}

if(test_input($username)) {
    $db_credentials = json_decode(file_get_contents($sensitive_data . "/mysql_credentials.json"), true);
    $pepper = file_get_contents($sensitive_data . "/mafia_password_pepper");
    $conn = mysqli_connect('localhost',  $db_credentials['username'], $db_credentials['password'], 'mafia');
    if(!$conn) {
	die("Connection failed: " . mysqli_connect_error());
    }
    $sql = "SELECT username,password FROM player WHERE username = '" . $username . "';";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);
    $password_hash = $row['password'];
    if(mysqli_num_rows($result) == 0) {
	echo "Username does not exist.";
	exit;
    } else if (!password_verify($password . $pepper, $password_hash)) {
	echo "Password is incorrect.";
	exit;
    } else {
	$sql = "UPDATE player SET last_visit_date = CURRENT_TIMESTAMP WHERE username = '" . $username . "';";
	mysqli_query($conn, $sql);
	$_SESSION['username'] = $row['username'];
	$_SESSION['password'] = $password_hash;
	echo "success"; // not a message to the user; interpreted as boolean
	exit;
    }
} else {
    echo "Username contains illegal characters.";
    exit;
}

function test_input($data) {
    $originalData = $data;
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);

    return $data == $originalData;
}
?>
