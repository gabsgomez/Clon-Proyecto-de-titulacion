<?php
//abre los pdf sin la necesidad de descargarlos
if (isset($_GET['file'])) {
    $file = $_GET['file'];
    $safe_file = basename($file);
    $path = "DocumentosInformativos/" . $safe_file;

    if (file_exists($path)) {
        ?>
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Visualizador de PDF</title>
            <style>
                body, html {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                    overflow: hidden;
                }
                #pdfViewer {
                    width: 100%;
                    height: 100vh;
                    border: none;
                }
            </style>
        </head>
        <body>
            <!-- Embed the PDF directly in an iframe -->
            <iframe id="pdfViewer" src="<?php echo $path; ?>" type="application/pdf"></iframe>
        </body>
        </html>
        <?php
    } else {
        echo "El archivo no existe.";
    }
} else {
    echo "No se especificó ningún archivo.";
}
?>
