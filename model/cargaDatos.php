<?php

$nombre = $_POST['nombre'];
$seccion = $_POST['seccion'];
$latitud = $_POST['latitud'];
$longitud = $_POST['longitud'];



try{
    include("../sql/conexion.php");
    $stmt = $conn->prepare("INSERT INTO lista (nombre,seccion,latitud,longitud) VALUES(?,?,?,?)");
    $stmt->bind_param("ssss",$nombre,$seccion,$latitud,$longitud);
    $stmt->execute();
$respuesta = array(
    'respuesta'=>"correcto"
);
$stmt->close();
    $conn->close();


} catch (Exception $e) {
    //throw $e;

    $respuesta = array(
      'error' => $e->getMessage()
    );
}

echo json_encode($respuesta);
