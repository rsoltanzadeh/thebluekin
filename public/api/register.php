<?php
session_start();
$sensitive_data = "/home/ramin/sensitive_data";

if(!isset($_POST['username']) || !isset($_POST['password'])) {
    echo "Something went wrong.";
    exit;
}

$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];

if (strlen($username) < 1) {
    echo "Username is too short.";
    exit;
} else if (strlen($password) < 1) {
    echo "Password is too short.";
    exit;
} else if (strlen($username) > 20) {
    echo "Username is too long. (Maximum 20 characters)";
    exit;
} else if (strlen($password) > 100) {
    echo "Password is too long. (Maximum 100 characters)";
    exit;
} else if (strlen($email) > 254) {
    echo "Email address is too long. (Maximum 100 characters)";
    exit;
} else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "E-mail address is invalid.";
    exit;
}

if(test_input($username) && test_input($email)) {
    $db_credentials = json_decode(file_get_contents($sensitive_data . "/mysql_credentials.json"), true);
    $pepper = file_get_contents($sensitive_data . "/mafia_password_pepper");
    $conn = mysqli_connect('localhost', $db_credentials["username"], $db_credentials["password"], 'mafia');
    if(!$conn) {
	die("Connection failed: " . mysqli_connect_error());
    }
    $tempSql = "SELECT id FROM player WHERE username = '" . $username . "';";
    $username_result = mysqli_query($conn, $tempSql);
    $tempSql = "SELECT id FROM player WHERE email = '" . $email . "';";
    $email_result = mysqli_query($conn, $tempSql);

    if(!$username_result || !$email_result) {
	die("Data fetch failed: " . mysqli_error($conn));
    } else if(mysqli_num_rows($username_result) == 1) {
	echo "Username already exists.";
	exit;
    } else if(mysqli_num_rows($email_result) == 1){
	echo "E-mail address already exists.";
	exit;
    } else {
        $hashed_password = password_hash($password . $pepper, PASSWORD_DEFAULT);
	$sql = "INSERT INTO player (email, username, password) 
			VALUES ('". $email . "', '" . $username . "', '" . $hashed_password . "');";
	if (mysqli_query($conn, $sql)) {
	    echo "success"; 
	    exit;
	} else {
	    die("Error: " . mysqli_error($conn));
	}
    }
} else {
    echo "Input contains illegal characters.";
    exit;
}

function test_input($data) {
    $originalData = $data;
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    
    if($data == $originalData) {
	return true;
    } else {
	return false;
    }
}
?>
