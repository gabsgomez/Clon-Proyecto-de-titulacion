<?php
header('Content-Type: application/json; charset=utf-8');

$response = [
    "mensaje" => "Respuesta desde PHP",
    "estado" => "éxito"
];

echo json_encode($response, JSON_UNESCAPED_UNICODE);
?>
