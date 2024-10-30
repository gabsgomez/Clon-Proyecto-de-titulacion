<?php

$host = "localhost";
$user = "root";
$password = "";
$database = "marathon_institudee";

$conexion = mysqli_connect($host,$user,$password,$database);
if(!$conexion){
    echo "No se pudon conectar a la bd. El error fue: ",mysqli_connect_error();

}else{
    //echo "Se conecto a la bd.";
}

?>