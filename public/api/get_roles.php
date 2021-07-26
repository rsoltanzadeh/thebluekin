<?php
   
$conn = mysqli_connect('localhost', 'ramin', 'password', 'mafia');

if(!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM roles;";
$result = mysqli_query($conn, $sql);
$rows = array();
while($row = mysqli_fetch_assoc($result)) {
    $rows[] = $row;
}
$encoded_rows = json_encode($rows);
echo $encoded_rows;
?>
