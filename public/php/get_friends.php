<?php

session_start();

$conn = mysqli_connect('localhost', 'ramin', 'password', 'mafia');
if(!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$sql = 
    "SELECT friend_users.username " . 
    "FROM users AS friend_users " . 
    "INNER JOIN friends ON friend_users.id = friends.friend_id " . 
    "INNER JOIN users AS this_user ON this_user.id = friends.user_id " . 
    "WHERE this_user.username = '" . $_SESSION['username'] . "';";
$result = mysqli_query($conn, $sql);
$friends = array();
while($row = mysqli_fetch_assoc($result)) {
    $friends[] = $row['username']; 
}
echo json_encode($friends);
?>
