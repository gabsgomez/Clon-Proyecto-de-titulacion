<!DOCTYPE html>
<html lang="en">
<!-- Este puede funcionar para el modulo de administradores de ver y descargar los documentos de los usuarios. -->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Estudiantes</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>

    <div class="container mt-5">
        <h2 class="mb-4">Lista de Documentos</h2>

        <!-- Botón para abrir el modal -->
       <button type="button" class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#addDocumentModal">
            Agregar documento a los alumnos.
        </button>

        <!-- Tabla -->
        <table class="table table-bordered table-hover">
    <thead class="table-dark">
        <tr>
            <th>ID del Documento</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Documento</th>
            <th>Ver Documento</th>
        </tr>
    </thead>
    <tbody id="studentTableBody">
        <?php
        require_once 'db.php';
        $consulta = mysqli_query($conexion, "
            SELECT * FROM documentos
        ");

        while ($fila = mysqli_fetch_assoc($consulta)):
            ?>
            <tr>
                <td><?php echo $fila['ID_Documento']; ?></td>
                <td><?php echo $fila['Nombre_Documento']; ?></td>
                <td><?php echo $fila['Descripcion']; ?></td>
                <td><?php echo $fila['Documento']; ?></td>
                <td>
                    <!-- Botón para ver el documento PDF -->
                    <a href="view_pdf.php?file=<?php echo urlencode($fila['Documento']); ?>" target="_blank" class="btn btn-primary">
                        Ver
                    </a>
                </td>
            </tr>
        <?php endwhile; ?>
    </tbody>
</table>


    </div>

    <!-- Incluir el modal desde agregar.php -->
    <?php include 'agregarDocumentosInformativos.php'; ?>

    <!-- Bootstrap JS and dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

</body>

</html>
