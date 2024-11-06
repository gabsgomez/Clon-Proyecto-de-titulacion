<?php
/*
include "db.php";

// Clave y método de encriptación
$key = 'QuieroComerUnaMaruchanDeHabanero'; // Clave de 32 caracteres para AES-256-CBC

// Función para desencriptar
function decrypt($data, $key) {
    list($encrypted_data, $iv) = explode('::', $data, 2);
    return openssl_decrypt($encrypted_data, 'AES-256-CBC', $key, 0, base64_decode($iv));
}

$id = $_GET['id'];
$file_type = $_GET['file'];

$sql = "SELECT * FROM contratos WHERE ID_Contrato = '$id'";
$resultado = mysqli_query($conexion, $sql);

if (mysqli_num_rows($resultado) == 1) {
    $fila = mysqli_fetch_assoc($resultado);

    if ($file_type === 'documento') {
        $archivo = decrypt($fila['Documentos'], $key);
        $content_type = 'application/pdf';
    } elseif ($file_type === 'foto') {
        $archivo = decrypt($fila['Foto_Rostro'], $key);
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
*/




include "db.php";

// Clave y método de encriptación
$key = 'QuieroComerUnaMaruchanDeHabanero'; // Clave de 32 caracteres para AES-256-CBC

// Función para desencriptar
function decrypt($data, $key) {
    list($encrypted_data, $iv) = explode('::', $data, 2);
    return openssl_decrypt($encrypted_data, 'AES-256-CBC', $key, 0, base64_decode($iv));
}

$id = $_GET['id'];
$file_type = $_GET['file'];
$view_mode = $_GET['view_mode'] ?? 'normal'; // Valores posibles: 'normal', 'encrypted', 'decrypted'

$sql = "SELECT * FROM contratos WHERE ID_Contrato = '$id'";
$resultado = mysqli_query($conexion, $sql);

if (mysqli_num_rows($resultado) == 1) {
    $fila = mysqli_fetch_assoc($resultado);

    if ($file_type === 'documento') {
        // Obtener la ruta desencriptada del archivo
        $ruta_encriptada = decrypt($fila['Documentos'], $key);
        $ruta_archivo = __DIR__ . '/' . $ruta_encriptada;

        if (file_exists($ruta_archivo)) {
            if ($view_mode === 'encrypted') {
                // Mostrar contenido encriptado    &file=documento&view_mode=encrypted
                $contenido_pdf_encriptado = file_get_contents($ruta_archivo);
                header('Content-Type: text/plain');
                echo $contenido_pdf_encriptado;
                exit;
            } elseif ($view_mode === 'decrypted') {
                // Mostrar contenido desencriptado    &file=documento&view_mode=decrypted
                $contenido_pdf_encriptado = file_get_contents($ruta_archivo);
                $contenido_pdf = decrypt($contenido_pdf_encriptado, $key);

                if ($contenido_pdf !== false) {
                    header('Content-Type: application/pdf');
                    header('Content-Disposition: inline; filename="documento_desencriptado.pdf"');
                    header('Content-Length: ' . strlen($contenido_pdf));
                    echo $contenido_pdf;
                    exit;
                } else {
                    echo 'Error al desencriptar el archivo.';
                }
            } else {
                // Modo normal: enviar archivo desencriptado para visualización en el navegador
                $contenido_pdf_encriptado = file_get_contents($ruta_archivo);
                $contenido_pdf = decrypt($contenido_pdf_encriptado, $key);

                if ($contenido_pdf !== false) {
                    header('Content-Type: application/pdf');
                    header('Content-Disposition: inline; filename="documento.pdf"');
                    header('Content-Length: ' . strlen($contenido_pdf));
                    echo $contenido_pdf;
                    exit;
                } else {
                    echo 'Error al desencriptar el archivo.';
                }
            }
        } else {
            echo 'El archivo no existe en el servidor.';
        }
    } elseif ($file_type === 'foto') {
        $archivo = decrypt($fila['Foto_Rostro'], $key);
        $ruta_archivo = __DIR__ . '/' . $archivo;

        if (file_exists($ruta_archivo)) {
            header('Content-Description: File Transfer');
            header('Content-Type: image/png');
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
        echo 'Tipo de archivo no válido.';
        exit;
    }
} else {
    echo 'El archivo no está en la base de datos.';
}
?>
