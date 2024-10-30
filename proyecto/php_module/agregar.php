<!-- Modal para agregar estudiante -->
<div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addModalLabel">Agregar Estudiante</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="addStudentForm" enctype="multipart/form-data">
                    <!-- Contenido del formulario, cámara y captura de foto -->
                    <div class="mb-3">
                        <label class="form-label">Foto del Rostro (Tomada con la cámara)</label>
                        <div>
                            <video id="video" width="100%" autoplay></video>
                            <button type="button" class="btn btn-primary mt-2" id="captureBtn">Capturar Foto</button>
                        </div>
                        <input type="hidden" id="fotoRostroData" name="fotoRostroData">
                        <img id="capturedImage" style="display: none; width: 100%; margin-top: 10px;" alt="Foto Capturada">
                    </div>
                    <div class="mb-3">
                        <label for="studentDocument" class="form-label">Documento PDF</label>
                        <input type="file" class="form-control" id="studentDocument" name="documentosPDF" accept=".pdf" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- JavaScript para manejar la cámara, capturar foto y enviar datos con AJAX -->
<script>
    document.addEventListener("DOMContentLoaded", function () {
        const video = document.getElementById("video");
        const canvas = document.createElement("canvas");
        const captureBtn = document.getElementById("captureBtn");
        const capturedImage = document.getElementById("capturedImage");
        const fotoRostroData = document.getElementById("fotoRostroData");
        const studentDocument = document.getElementById("studentDocument");
        const addStudentForm = document.getElementById("addStudentForm");
        let stream;

        function startCamera() {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(function (mediaStream) {
                        stream = mediaStream;
                        video.srcObject = mediaStream;
                        video.play();
                    })
                    .catch(function (err) {
                        console.error("Error al acceder a la cámara: " + err);
                    });
            }
        }

        function stopCamera() {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                video.srcObject = null;
            }
        }

        const addModal = document.getElementById('addModal');
        addModal.addEventListener('shown.bs.modal', function () {
            if (confirm("¿Permite el uso de la cámara para capturar una foto?")) {
                startCamera();
            } else {
                const modalInstance = bootstrap.Modal.getInstance(addModal);
                modalInstance.hide();
            }
        });

        addModal.addEventListener('hidden.bs.modal', function () {
            stopCamera();
            capturedImage.style.display = "none";
        });

        captureBtn.addEventListener("click", function () {
            const maxResolution = 720;
            const minResolution = 480;

            // Obtener dimensiones del video
            let width = video.videoWidth;
            let height = video.videoHeight;

            // Redimensionar si excede la resolución máxima
            if (width > maxResolution || height > maxResolution) {
                const aspectRatio = width / height;
                if (width > height) {
                    width = maxResolution;
                    height = Math.round(maxResolution / aspectRatio);
                } else {
                    height = maxResolution;
                    width = Math.round(maxResolution * aspectRatio);
                }
            }

            // Asegurarse de que la resolución mínima sea alcanzada
            if (width < minResolution || height < minResolution) {
                alert(`La resolución mínima es de ${minResolution}px. Por favor ajuste su cámara o posición.`);
                return;
            }

            // Dibujar la imagen en el canvas y convertirla a base64
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, width, height);

            const dataUrl = canvas.toDataURL("image/png");
            fotoRostroData.value = dataUrl;
            capturedImage.src = dataUrl;
            capturedImage.style.display = "block";
            stopCamera();
        });

        addStudentForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Validación para verificar que se haya capturado la foto y subido un archivo PDF
            if (!fotoRostroData.value || !studentDocument.files.length) {
                alert("Debe capturar una foto y subir un documento PDF antes de guardar.");
                return;
            }

            const formData = new FormData(addStudentForm);
            fetch('upload.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    if (data.success) {
                        location.reload();  // Recargar la página para actualizar la tabla
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Hubo un error al subir los archivos");
                });
        });
    });
</script>
