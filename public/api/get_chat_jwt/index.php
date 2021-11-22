<?php
require __DIR__ . '/../constants.php';

session_start();

if(!isset($_SESSION['username'])) {
    echo "Cannot generate JWT for offline user.";
    exit;
}

$private_key = file_get_contents(SENSITIVE_DATA_DIRECTORY . "/jwtRS256.key")
$payload = array(
    "iss" => "thebluekin.com",
    "sub" => $_SESSION['username'],
    "iat" => time(),
    "exp" => time() + 120 // 2 minutes is more than enough to receive the JWT and send it through a websocket connection
);

$jwt = JWT::encode($payload, $privateKey, 'RS256');

echo $jwt;

?>
