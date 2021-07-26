<?php

session_start();

$array = array(
       "username" => $_SESSION['username'],
       "password" => $_SESSION['password']
);

echo json_encode($array);

?>
