<?php
/*
header('Content-Type: application/json');

// Clave y método de encriptación
$key = 'QuieroComerUnaMaruchanDeHabanero'; // Clave de 32 caracteres para AES-256-CBC
$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('AES-256-CBC'));

// Función para encriptar
function encrypt($data, $key, $iv) {
    return openssl_encrypt($data, 'AES-256-CBC', $key, 0, $iv) . '::' . base64_encode($iv);
}

// Verificar si se recibieron la imagen y el PDF
if (isset($_POST['fotoRostroData']) && isset($_FILES['documentosPDF'])) {
    $carpeta_destino = "DocumentosDeIdentidad/";

    // Validación y generación de nombre único para el PDF
    $nombre_pdf = basename($_FILES["documentosPDF"]["name"]);
    $extension_pdf = strtolower(pathinfo($nombre_pdf, PATHINFO_EXTENSION));
    $nombre_pdf_unico = uniqid() . '.' . $extension_pdf;
    $ruta_pdf = $carpeta_destino . $nombre_pdf_unico;

    // Validación de tipo de archivo para asegurar que sea un PDF
    if ($extension_pdf !== 'pdf' || $_FILES['documentosPDF']['type'] !== 'application/pdf') {
        echo json_encode(["success" => false, "message" => "Solo se permiten archivos en formato PDF."]);
        exit();
    }

    // Procesamiento de la imagen de la foto de rostro
    $fotoRostroData = $_POST['fotoRostroData'];
    $foto_nombre_unico = uniqid() . '.png';
    $foto_ruta = $carpeta_destino . $foto_nombre_unico;

    // Decodificación de datos base64 de la imagen
    if (preg_match('/^data:image\/png;base64,/', $fotoRostroData)) {
        $fotoRostroData = str_replace('data:image/png;base64,', '', $fotoRostroData);
        $fotoRostroData = str_replace(' ', '+', $fotoRostroData);
        $foto_data = base64_decode($fotoRostroData);

        if ($foto_data === false) {
            echo json_encode(["success" => false, "message" => "Error al decodificar la imagen."]);
            exit();
        }

        // Guardar temporalmente la imagen para obtener sus dimensiones
        file_put_contents($foto_ruta, $foto_data);
        list($width, $height) = getimagesize($foto_ruta);

        // Validación de resolución de la imagen (480px mínimo, 720px máximo)
        if ($width < 480 || $height < 480) {
            unlink($foto_ruta); // Eliminar imagen si no cumple con la resolución mínima
            echo json_encode(["success" => false, "message" => "La resolución mínima de la foto es de 480px."]);
            exit();
        } elseif ($width > 720 || $height > 720) {
            // Redimensionar si excede 720px
            $aspectRatio = $width / $height;
            $newWidth = ($width > $height) ? 720 : round(720 * $aspectRatio);
            $newHeight = ($width > $height) ? round(720 / $aspectRatio) : 720;

            // Crear una nueva imagen con las dimensiones ajustadas
            $image = imagecreatefromstring($foto_data);
            $resizedImage = imagecreatetruecolor($newWidth, $newHeight);
            imagecopyresampled($resizedImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

            // Guardar la imagen redimensionada y reemplazar la original
            imagepng($resizedImage, $foto_ruta);
            imagedestroy($image);
            imagedestroy($resizedImage);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Formato de imagen inválido."]);
        exit();
    }

    // Guardar el archivo PDF y actualizar la base de datos
    if (move_uploaded_file($_FILES["documentosPDF"]["tmp_name"], $ruta_pdf)) {
        include "db.php";

        // Función para obtener el último ID de contrato
        function obtenerUltimoIdContrato($conexion) {
            $query = "SELECT MAX(ID_Contrato) as maxId FROM contratos";
            $resultado = mysqli_query($conexion, $query);
            $fila = mysqli_fetch_assoc($resultado);
            return $fila['maxId'] ?? 0;
        }

        $ultimo_id_contrato = obtenerUltimoIdContrato($conexion);

        // Encriptar las rutas antes de guardarlas
        $ruta_pdf_encriptada = encrypt($ruta_pdf, $key, $iv);
        $foto_ruta_encriptada = encrypt($foto_ruta, $key, $iv);

        // Actualizar el registro en la base de datos con las rutas de la foto y el PDF
        $sql = "UPDATE contratos SET Documentos = '$ruta_pdf_encriptada', Foto_Rostro = '$foto_ruta_encriptada' WHERE ID_Contrato = '$ultimo_id_contrato'";
        $resultado = mysqli_query($conexion, $sql);

        if ($resultado) {
            echo json_encode(["success" => true, "message" => "Se subieron correctamente los archivos y se actualizaron en el último contrato."]);
            exit();
        } else {
            echo json_encode(["success" => false, "message" => "Hubo un error al actualizar los archivos en la base de datos."]);
            exit();
        }
    } else {
        echo json_encode(["success" => false, "message" => "Error al mover el archivo PDF a la carpeta de destino."]);
        exit();
    }
} else {
    echo json_encode(["success" => false, "message" => "No se cargaron los archivos correctamente."]);
    exit();
}
?>
*/






header('Content-Type: application/json');

// Clave y método de encriptación
$key = 'QuieroComerUnaMaruchanDeHabanero'; // Clave de 32 caracteres para AES-256-CBC
$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('AES-256-CBC'));

// Función para encriptar
function encrypt($data, $key, $iv) {
    return openssl_encrypt($data, 'AES-256-CBC', $key, 0, $iv) . '::' . base64_encode($iv);
}

// Verificar si se recibieron la imagen y el PDF
if (isset($_POST['fotoRostroData']) && isset($_FILES['documentosPDF'])) {
    $carpeta_destino = "DocumentosDeIdentidad/";

    // Validación y generación de nombre único para el PDF
    $nombre_pdf = basename($_FILES["documentosPDF"]["name"]);
    $extension_pdf = strtolower(pathinfo($nombre_pdf, PATHINFO_EXTENSION));
    $nombre_pdf_unico = uniqid() . '.' . $extension_pdf;
    $ruta_pdf = $carpeta_destino . $nombre_pdf_unico;

    // Validación de tipo de archivo para asegurar que sea un PDF
    if ($extension_pdf !== 'pdf' || $_FILES['documentosPDF']['type'] !== 'application/pdf') {
        echo json_encode(["success" => false, "message" => "Solo se permiten archivos en formato PDF."]);
        exit();
    }

    // Encriptar el contenido del archivo PDF
    $pdf_data = file_get_contents($_FILES["documentosPDF"]["tmp_name"]);
    $pdf_data_encrypted = encrypt($pdf_data, $key, $iv);

    // Guardar el archivo encriptado en el servidor
    file_put_contents($ruta_pdf, $pdf_data_encrypted);

    // Encriptar la ruta antes de guardarla en la base de datos
    $ruta_pdf_encriptada = encrypt($ruta_pdf, $key, $iv);

    // Procesamiento de la imagen de la foto de rostro
    $fotoRostroData = $_POST['fotoRostroData'];
    $foto_nombre_unico = uniqid() . '.png';
    $foto_ruta = $carpeta_destino . $foto_nombre_unico;

    // Decodificación de datos base64 de la imagen
    if (preg_match('/^data:image\/png;base64,/', $fotoRostroData)) {
        $fotoRostroData = str_replace('data:image/png;base64,', '', $fotoRostroData);
        $fotoRostroData = str_replace(' ', '+', $fotoRostroData);
        $foto_data = base64_decode($fotoRostroData);

        if ($foto_data === false) {
            echo json_encode(["success" => false, "message" => "Error al decodificar la imagen."]);
            exit();
        }

        // Guardar temporalmente la imagen para obtener sus dimensiones
        file_put_contents($foto_ruta, $foto_data);
        list($width, $height) = getimagesize($foto_ruta);

        // Validación de resolución de la imagen (480px mínimo, 720px máximo)
        if ($width < 480 || $height < 480) {
            unlink($foto_ruta); // Eliminar imagen si no cumple con la resolución mínima
            echo json_encode(["success" => false, "message" => "La resolución mínima de la foto es de 480px."]);
            exit();
        } elseif ($width > 720 || $height > 720) {
            // Redimensionar si excede 720px
            $aspectRatio = $width / $height;
            $newWidth = ($width > $height) ? 720 : round(720 * $aspectRatio);
            $newHeight = ($width > $height) ? round(720 / $aspectRatio) : 720;

            // Crear una nueva imagen con las dimensiones ajustadas
            $image = imagecreatefromstring($foto_data);
            $resizedImage = imagecreatetruecolor($newWidth, $newHeight);
            imagecopyresampled($resizedImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

            // Guardar la imagen redimensionada y reemplazar la original
            imagepng($resizedImage, $foto_ruta);
            imagedestroy($image);
            imagedestroy($resizedImage);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Formato de imagen inválido."]);
        exit();
    }

    // Encriptar la ruta de la foto antes de guardarla en la base de datos
    $foto_ruta_encriptada = encrypt($foto_ruta, $key, $iv);

    // Guardar la información en la base de datos
    include "db.php";
    function obtenerUltimoIdContrato($conexion) {
        $query = "SELECT MAX(ID_Contrato) as maxId FROM contratos";
        $resultado = mysqli_query($conexion, $query);
        $fila = mysqli_fetch_assoc($resultado);
        return $fila['maxId'] ?? 0;
    }

    $ultimo_id_contrato = obtenerUltimoIdContrato($conexion);

    $sql = "UPDATE contratos SET Documentos = '$ruta_pdf_encriptada', Foto_Rostro = '$foto_ruta_encriptada' WHERE ID_Contrato = '$ultimo_id_contrato'";
    $resultado = mysqli_query($conexion, $sql);

    if ($resultado) {
        echo json_encode(["success" => true, "message" => "Se subieron correctamente los archivos y se actualizaron en el último contrato."]);
        exit();
    } else {
        echo json_encode(["success" => false, "message" => "Hubo un error al actualizar los archivos en la base de datos."]);
        exit();
    }
} else {
    echo json_encode(["success" => false, "message" => "No se cargaron los archivos correctamente."]);
    exit();
}
?>

