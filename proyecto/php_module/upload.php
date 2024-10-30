<?php
// upload.php funciona para classroom.php e index.php
header('Content-Type: application/json');

if (isset($_POST['fotoRostroData']) && isset($_FILES['documentosPDF'])) {
    $carpeta_destino = "DocumentosDeIdentidad/";

    $nombre_pdf = basename($_FILES["documentosPDF"]["name"]);
    $extension_pdf = strtolower(pathinfo($nombre_pdf, PATHINFO_EXTENSION));
    $nombre_pdf_unico = uniqid() . '.' . $extension_pdf;
    $ruta_pdf = $carpeta_destino . $nombre_pdf_unico; // Ruta completa del PDF

    $fotoRostroData = $_POST['fotoRostroData'];
    $foto_nombre_unico = uniqid() . '.png';
    $foto_ruta = $carpeta_destino . $foto_nombre_unico;

    // Decodificación de datos base64 de la imagen
    if (preg_match('/^data:image\/png;base64,/', $fotoRostroData)) {
        $fotoRostroData = str_replace('data:image/png;base64,', '', $fotoRostroData);
        $fotoRostroData = str_replace(' ', '+', $fotoRostroData); // Reemplaza espacios por "+"
        $foto_data = base64_decode($fotoRostroData);

        if ($foto_data === false) {
            echo json_encode(["success" => false, "message" => "Error al decodificar la imagen."]);
            exit();
        }
    } else {
        echo json_encode(["success" => false, "message" => "Formato de imagen inválido."]);
        exit();
    }

    // Guardar la foto y el documento PDF en la carpeta destino
    if (file_put_contents($foto_ruta, $foto_data) !== false &&
        move_uploaded_file($_FILES["documentosPDF"]["tmp_name"], $ruta_pdf)) {

        include "db.php";

        // Función para obtener el último ID de contrato
        function obtenerUltimoIdContrato($conexion) {
            $query = "SELECT MAX(ID_Contrato) as maxId FROM contratos";
            $resultado = mysqli_query($conexion, $query);
            $fila = mysqli_fetch_assoc($resultado);
            return $fila['maxId'] ?? 0;
        }

        $ultimo_id_contrato = obtenerUltimoIdContrato($conexion);

        // Actualizar el registro en la base de datos con las rutas completas
        $sql = "UPDATE contratos SET Documentos = '$ruta_pdf', Foto_Rostro = '$foto_ruta' WHERE ID_Contrato = '$ultimo_id_contrato'";
        $resultado = mysqli_query($conexion, $sql);

        if ($resultado) {
            echo json_encode(["success" => true, "message" => "Se subieron correctamente los archivos y se actualizaron en el último contrato."]);
            exit();
        } else {
            echo json_encode(["success" => false, "message" => "Hubo un error al actualizar los archivos en la base de datos."]);
            exit();
        }
    } else {
        echo json_encode(["success" => false, "message" => "Error al mover los archivos a la carpeta de destino."]);
        exit();
    }
} else {
    echo json_encode(["success" => false, "message" => "No se cargaron los archivos correctamente."]);
    exit();
}
?>
