<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Classroom - Términos y Condiciones</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        /* Estilos generales de la página */
        body {
            font-family: Arial, sans-serif;
            background-color: #ece6f5;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .container {
            background-color: #7d98a1;
            border: 2px solid #333;
            border-radius: 5px;
            width: 100%;
            max-width: 800px;
            padding: 20px;
            padding-bottom: 50px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
            position: relative;
        }

        h1 {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #000;
        }

        .terms-box {
            background-color: #dcd1e1;
            width: 95%;
            height: 300px;
            overflow-y: auto;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }

        .terms-box p {
            margin: 0;
            font-size: 16px;
            color: #333;
        }

        .button-container {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
        }

        .btn-primary {
            background-color: #007bff;
            border: none;
            color: white;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
        }

        .btn-primary:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Términos y Condiciones</h1>
        <div class="terms-box">
            <!-- Aquí puedes agregar los términos y condiciones -->
            <p>
            1. Definición de Partes: Este Acuerdo de Confidencialidad
            ("Acuerdo") se celebra entre [Nombre del Instituto], en adelante "El
            Instituto", y el estudiante matriculado, en adelante "El Alumno".
            Conjuntamente se les referirá como "Las Partes". <br><br>2. Objetivo: El
            propósito de este Acuerdo es establecer los términos y condiciones
            bajo los cuales El Alumno accede y utiliza la información
            confidencial proporcionada por El Instituto en el marco de los
            cursos de inversión ofrecidos. <br><br>3. Información Confidencial: La
            información confidencial incluye, pero no se limita a, contenido
            digital, material didáctico, análisis de información, métodos de
            enseñanza, plataformas online, grabaciones de clases en vivo y
            pregrabadas, así como cualquier otra información proporcionada por
            El Instituto que no esté disponible públicamente. <br><br>4. Obligaciones
            del Alumno: El Alumno se compromete a: a. Mantener la
            confidencialidad de toda la información proporcionada por El
            Instituto. b. No divulgar, reproducir, transmitir, o utilizar la
            información confidencial para beneficio personal o de terceros. c.
            No utilizar la información confidencial con fines comerciales o para
            competir directa o indirectamente con El Instituto. d. Tomar las
            medidas razonables para prevenir la divulgación no autorizada de la
            información confidencial. <br><br>5. Restricciones de Uso: El Alumno se
            compromete a utilizar la información confidencial únicamente con el
            propósito de participar y mejorar su conocimiento en los cursos
            ofrecidos por El Instituto. Queda expresamente prohibido el uso de
            la información confidencial con fines comerciales, de lucro personal
            o cualquier otro propósito no autorizado. <br><br>6. Duración del Acuerdo:
            Este Acuerdo entrará en vigor a partir de la fecha de aceptación por
            parte del Alumno y continuará siendo vinculante incluso después de
            la finalización de los cursos. La obligación de confidencialidad
            persistirá durante un período de [insertar duración] años a partir
            de la finalización de la relación entre El Alumno y El Instituto. <br><br>7.
            Excepciones: No se considerará incumplimiento de este Acuerdo si la
            información confidencial es divulgada de manera legalmente
            requerida, siempre que El Alumno notifique inmediatamente a El
            Instituto sobre dicha solicitud legal. <br><br>8. Consecuencias por
            Incumplimiento: El incumplimiento de este Acuerdo puede resultar en
            acciones legales, incluyendo pero no limitándose a la búsqueda de
            daños y perjuicios, así como medidas cautelares para prevenir la
            divulgación no autorizada. <br><br>9. Ley Aplicable: Este Acuerdo se regirá
            e interpretará de acuerdo con las leyes del [jurisdicción
            aplicable], y cualquier disputa derivada de este Acuerdo se
            resolverá mediante arbitraje de conformidad con las reglas de
            arbitraje de [institución de arbitraje]. <br><br>10. Aceptación: Al aceptar
            los términos de este Acuerdo, El Alumno reconoce haber leído,
            entendido y aceptado todas las condiciones establecidas en el
            presente documento. Este Acuerdo de Confidencialidad se firma
            electrónicamente por ambas partes y entrará en vigor a partir de la
            fecha de aceptación por parte del Alumno.
            </p>
        </div>
        <div class="button-container">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">Subir documentos</button>
        </div>
    </div>

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
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
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
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext("2d");
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const dataUrl = canvas.toDataURL("image/png");
                fotoRostroData.value = dataUrl;
                capturedImage.src = dataUrl;
                capturedImage.style.display = "block";
                stopCamera();
            });

            addStudentForm.addEventListener("submit", function (event) {
                event.preventDefault();

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
                            window.location.href = "http://localhost:3000/CajaInicio";
                        }
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        alert("Hubo un error al subir los archivos");
                    });
            });
        });
    </script>
</body>
</html>
