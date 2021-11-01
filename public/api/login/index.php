<?php
session_start();
$sensitive_data = "/home/ramin/sensitive_data";

/*
 * if(!isset($_POST['username']) || !isset($_POST['password'])) {
 * echo "Something went wrong.";
 *   exit;
 * }
 */

function isValidJSON($str) {
    json_decode($str);
    return json_last_error() == JSON_ERROR_NONE;
}

$json_params = file_get_contents("php://input");

if (strlen($json_params) > 0 && isValidJSON($json_params))
    $decoded_params = json_decode($json_params);
else {
    echo "dafuq";
    exit;
}
$username = $decoded_params->username;
$password = $decoded_params->password;

if (strlen($username) < 1) {
    echo "Username is too short.";
    exit;
} else if (strlen($password) < 1) {
    echo "Password is too short.";
    exit;
}

$db_credentials = json_decode(file_get_contents($sensitive_data . "/mysql_credentials.json"));
$pepper = file_get_contents($sensitive_data . "/mafia_password_pepper");
$mysqli = new mysqli('localhost', $db_credentials->username, $db_credentials->password, 'mafia');

$statement = $mysqli->prepare("SELECT username,password FROM user WHERE username=?");
$statement->bind_param("s", $username);
$statement->execute();
$result = $statement->get_result();
if($result->num_rows > 1) {
    throw new Exception("Duplicate entry for username '" . $username . "'.");
} else if($result->num_rows == 0) {
    insert_failed_login($mysqli, $username);
    echo("Incorrect username or password.");
    exit;
} else {
    $statement = $mysqli->prepare("INSERT INTO login (username,success) VALUES (?,?)");
    $success = 1;
    if($statement->bind_param("si", $username, $success) == false) {
	echo("Something else went wrong.");
    }
    echo($statement->execute());
    exit;
}

function insert_failed_login($mysqli, $username) {
    $statement = $mysqli->prepare("INSERT INTO login (username, success) VALUES (?,?)");
    $failed = 0;
    if($statement->bind_param("si", $username, $failed) == false) {
	echo("Something went wrong.");
    }
    
    echo($statement->execute())
}
?>
