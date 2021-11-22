<?php
session_start();

if(empty($_SESSION['token'])) {
    $_SESSION['token'] = bin2hex(random_bytes(32)); // CSRF token
}

echo $_SESSION['token'];
?>
