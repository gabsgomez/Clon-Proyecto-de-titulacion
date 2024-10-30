<?php
include "db.php";

$id = $_GET['id'];
$file_type = $_GET['file'];

$sql = "SELECT * FROM contratos WHERE ID_Contrato = '$id'";
$resultado = mysqli_query($conexion, $sql);

if (mysqli_num_rows($resultado) == 1) {
    $fila = mysqli_fetch_assoc($resultado);

    if ($file_type === 'documento') {
        $archivo = $fila['Documentos'];
        $content_type = 'application/pdf';
    } elseif ($file_type === 'foto') {
        $archivo = $fila['Foto_Rostro'];
        $content_type = 'image/png';
    } else {
        echo "Tipo de archivo no válido.";
        exit;
    }

    $ruta_archivo = __DIR__ . '/' . $archivo;

    if (file_exists($ruta_archivo)) {
        header('Content-Description: File Transfer');
        header('Content-Type: ' . $content_type);
        header('Content-Disposition: attachment; filename="' . basename($archivo) . '"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($ruta_archivo));
        flush();
        readfile($ruta_archivo);
        exit;
    } else {
        echo 'El archivo no existe en el servidor.';
    }
} else {
    echo 'El archivo no está en la base de datos.';
}
?>
