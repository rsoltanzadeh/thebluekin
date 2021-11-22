<?php
require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../constants.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

session_start();

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
$token = $decoded_params->token;

if (strlen($username) < 1) {
    echo "Username is too short.";
    exit;
} else if (strlen($password) < 1) {
    echo "Password is too short.";
    exit;
}

if(!hash_equals($token, $_SESSION['token'])) { // prevent timing attack on the CSRF token
    echo "Wrong token. Possible login CSRF attack!";
    exit;
}

unset($_SESSION['token']);

$db_credentials = json_decode(file_get_contents(SENSITIVE_DATA_DIRECTORY . "/mysql_credentials.json"));
$pepper = file_get_contents(SENSITIVE_DATA_DIRECTORY . "/mafia_password_pepper");
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
	echo("bind_param failed.");
    }
    if(!$statement->execute()) {
	echo($statement->error);
    } else {
	// login success

	$_SESSION['username'] = $username;
	
	session_regenerate_id(); // prevent session fixation attack
	
	echo("success");
    }
    exit;
}

function insert_failed_login($mysqli, $username) {
    $statement = $mysqli->prepare("INSERT INTO login (username, success) VALUES (?,?)");
    $failed = 0;
    if($statement->bind_param("si", $username, $failed) == false) {
	echo("bind_param failed.");
    }
    if(!$statement->execute()) {
	echo($statement->error);
    }
}
?>
