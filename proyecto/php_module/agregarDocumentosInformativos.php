<!-- Modal para agregar documento -->
<div class="modal fade" id="addDocumentModal" tabindex="-1" aria-labelledby="addDocumentModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addDocumentModalLabel">Agregar Documento</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="addDocumentForm" enctype="multipart/form-data">
                    <div class="mb-3">
                        <label for="documentName" class="form-label">Nombre del Documento</label>
                        <input type="text" class="form-control" id="documentName" name="nombre_documento" required>
                    </div>
                    <div class="mb-3">
                        <label for="documentDescription" class="form-label">Descripción</label>
                        <textarea class="form-control" id="documentDescription" name="descripcion" rows="3" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="documentFile" class="form-label">Documento PDF</label>
                        <input type="file" class="form-control" id="documentFile" name="documento" accept=".pdf" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Guardar Documento</button>
                </form>
            </div>
        </div>
    </div>
</div>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        const addDocumentForm = document.getElementById("addDocumentForm");

        addDocumentForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const formData = new FormData(addDocumentForm);

            fetch('subirDocumentosInformativos.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert(data); // Muestra el mensaje de respuesta
                if (data.includes("correctamente")) {
                    location.reload();  // Recarga la página para actualizar la tabla
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Hubo un error al subir el documento.");
            });
        });
    });
</script>
