<?php
require_once 'db.php';
// subir los documentos a la tabla documentos
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre_documento = $_POST['nombre_documento'];
    $descripcion = $_POST['descripcion'];
    
    // Verificar si se subió un archivo
    if (isset($_FILES['documento']) && $_FILES['documento']['error'] == 0) {
        $documento = $_FILES['documento']['name'];
        $rutaDestino = 'DocumentosInformativos/' . basename($documento);
        
        // Mover el archivo a la carpeta de destino
        if (move_uploaded_file($_FILES['documento']['tmp_name'], $rutaDestino)) {
            $query = "INSERT INTO documentos (Nombre_Documento, Descripcion, Documento) VALUES ('$nombre_documento', '$descripcion', '$documento')";
            
            if (mysqli_query($conexion, $query)) {
                echo "Documento agregado correctamente.";
            } else {
                echo "Error al agregar el documento.";
            }
        } else {
            echo "Error al subir el archivo.";
        }
    } else {
        echo "Por favor, selecciona un archivo válido.";
    }
}
?>
