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
        <h2 class="mb-4">Lista de Estudiantes</h2>

        <!-- Botón para abrir el modal -->
       <!-- <button type="button" class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#addModal">
            Agregar Estudiante
        </button>-->

        <!-- Tabla -->
        <table class="table table-bordered table-hover">
            <thead class="table-dark">
                <tr>
                    <th>ID del Contrato</th>
                    <th>Alumno</th>
                    <th>Documento PDF</th>
                    <th>Foto del Rostro</th>
                    <th>Descargas</th>
                </tr>
            </thead>
            <tbody id="studentTableBody">
                <?php
                require_once 'db.php';
                $consulta = mysqli_query($conexion, "
                    SELECT contratos.ID_Contrato, alumnos.Nombres, alumnos.ApellidoPaterno, alumnos.ApellidoMaterno,
                           contratos.Documentos, contratos.Foto_Rostro
                    FROM alumnos
                    JOIN contratos ON alumnos.Contrato = contratos.ID_Contrato
                ");

                while ($fila = mysqli_fetch_assoc($consulta)):
                    ?>
                    <tr>
                        <td><?php echo $fila['ID_Contrato']; ?></td>
                        <td><?php echo $fila['Nombres'] . ' ' . $fila['ApellidoPaterno'] . ' ' . $fila['ApellidoMaterno']; ?></td>
                        <td><?php echo $fila['Documentos']; ?></td>
                        <td>
    <?php if (!empty($fila['Foto_Rostro'])): ?>
        <img src="<?php echo $fila['Foto_Rostro']; ?>" alt="Foto del Rostro" width="50" height="50">
    <?php else: ?>
        No disponible
    <?php endif; ?>
</td>

                        <td>
                            <a href="download.php?id=<?php echo $fila['ID_Contrato']; ?>&file=documento" class="btn btn-primary">
                                <i class="fas fa-download"></i> Documento
                            </a>
                            <a href="download.php?id=<?php echo $fila['ID_Contrato']; ?>&file=foto" class="btn btn-primary">
                                <i class="fas fa-download"></i> Foto
                            </a>
                        </td>
                    </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
    </div>

    <!-- Incluir el modal desde agregar.php -->
    <?php include 'agregar.php'; ?>

    <!-- Bootstrap JS and dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

</body>

</html>
