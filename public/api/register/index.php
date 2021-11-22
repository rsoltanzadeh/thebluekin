<?php
require __DIR__ . '/../constants.php';

session_start();

/*
 *  if(!isset($_POST['username']) || !isset($_POST['password'])) {
 *  echo "Something went wrong.";
 *  exit;
 *  }
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
$email = $decoded_params->email;

if (strlen($username) < 1) {
    echo "Username is too short.";
    exit;
} else if (strlen($password) < 1) {
    echo "Password is too short.";
    exit;
} else if (strlen($username) > 20) {
    echo "Username is too long. (Maximum 20 characters)";
    exit;
} else if (strlen($password) > 1024) {
    echo "Password is too long. (Maximum 1024 characters)";
    exit;
} else if (strlen($email) > 255) {
    echo "Email address is too long. (Maximum 255 characters)";
    exit;
} else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "E-mail address is invalid.";
    exit;
} else if(!test_input($email)) {
    echo "E-mail contains illegal characters.";
    exit;
} else if(!test_input($username)) {
    echo "Username contains illegal characters.";
    exit;
}

$db_credentials = json_decode(file_get_contents(SENSITIVE_DATA_DIRECTORY . "/mysql_credentials.json"));
$pepper = file_get_contents(SENSITIVE_DATA_DIRECTORY . "/mafia_password_pepper");
$mysqli = new mysqli('localhost', $db_credentials->username, $db_credentials->password, 'mafia');

$statement = $mysqli->prepare("SELECT id FROM user WHERE username=?");
$statement->bind_param("s", $username);
$statement->execute();
$result = $statement->get_result();
if($result->num_rows > 0) {
    echo("Username already exists.");
    exit;
} else {
    $statement = $mysqli->prepare("SELECT id FROM user WHERE email=?");
    $statement->bind_param("s", $email);
    $statement->execute();
    $result = $statement->get_result();
    if($result->num_rows > 0) {
        echo("E-mail already exists.");
        exit;
    } else {
        $hashed_password = password_hash($pepper . $password, PASSWORD_DEFAULT);
        $statement = $mysqli->prepare("INSERT INTO user (username,email,password) VALUES (?,?,?)");
        $statement->bind_param("sss", $username, $email, $hashed_password);
        $statement->execute();
        echo("success");
        exit;
    }
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
