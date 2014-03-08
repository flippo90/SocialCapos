<?php
$host = "localhost";
$user = "root";
$pass = "";
$databaseName = "capos";
$tableName = "locations";

$con = mysql_connect($host, $user, $pass);
$dbs = mysql_select_db($databaseName, $con);
    
        $sql = "INSERT INTO locations VALUES ('0', '1', '2', '3', '4', '5')";//sql string command
          $result=mysql_query($sql);//execute SQL string command
  
//mysqli_close($con);

?>