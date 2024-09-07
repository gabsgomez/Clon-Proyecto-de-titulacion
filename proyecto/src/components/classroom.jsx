import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import './classroom.css';
import { useNavigate } from 'react-router-dom';

function Classroom() {
  const [pdfFile, setPdfFile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const navigate = useNavigate(); // Hook para navegación

  // Handle PDF file upload
  const handlePdfUpload = (e) => {
    setPdfFile(e.target.files[0]);
  };

  // Open the device camera to capture a photo
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error("Error accessing the camera", err);
    }
  };

  // Capture the photo from the camera and convert it to base64
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photoData = canvas.toDataURL("image/png");
    setPhoto(photoData);

    // Stop the video stream after capturing the photo
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile || !photo) {
      alert("Por favor sube un PDF y toma una foto");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    // Convert base64 image data to a Blob
    const photoBlob = await fetch(photo).then((res) => res.blob());
    formData.append("photo", photoBlob);

    try {
      const response = await fetch("http://localhost:5000/api/auth/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Archivos subidos correctamente");
        navigate('/CajaInicio');
      } else {
        alert("Error al subir los archivos");
      }
    } catch (err) {
      console.error("Error al subir los archivos", err);
      alert("Error al subir los archivos");
    }
  };

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit} >
      <h1>Términos y condiciones</h1>
        <div className="terminos-y-condiciones-container">
          
          <p>
            1. Definición de Partes: Este Acuerdo de Confidencialidad
            ("Acuerdo") se celebra entre [Nombre del Instituto], en adelante "El
            Instituto", y el estudiante matriculado, en adelante "El Alumno".
            Conjuntamente se les referirá como "Las Partes". 2. Objetivo: El
            propósito de este Acuerdo es establecer los términos y condiciones
            bajo los cuales El Alumno accede y utiliza la información
            confidencial proporcionada por El Instituto en el marco de los
            cursos de inversión ofrecidos. 3. Información Confidencial: La
            información confidencial incluye, pero no se limita a, contenido
            digital, material didáctico, análisis de información, métodos de
            enseñanza, plataformas online, grabaciones de clases en vivo y
            pregrabadas, así como cualquier otra información proporcionada por
            El Instituto que no esté disponible públicamente. 4. Obligaciones
            del Alumno: El Alumno se compromete a: a. Mantener la
            confidencialidad de toda la información proporcionada por El
            Instituto. b. No divulgar, reproducir, transmitir, o utilizar la
            información confidencial para beneficio personal o de terceros. c.
            No utilizar la información confidencial con fines comerciales o para
            competir directa o indirectamente con El Instituto. d. Tomar las
            medidas razonables para prevenir la divulgación no autorizada de la
            información confidencial. 5. Restricciones de Uso: El Alumno se
            compromete a utilizar la información confidencial únicamente con el
            propósito de participar y mejorar su conocimiento en los cursos
            ofrecidos por El Instituto. Queda expresamente prohibido el uso de
            la información confidencial con fines comerciales, de lucro personal
            o cualquier otro propósito no autorizado. 6. Duración del Acuerdo:
            Este Acuerdo entrará en vigor a partir de la fecha de aceptación por
            parte del Alumno y continuará siendo vinculante incluso después de
            la finalización de los cursos. La obligación de confidencialidad
            persistirá durante un período de [insertar duración] años a partir
            de la finalización de la relación entre El Alumno y El Instituto. 7.
            Excepciones: No se considerará incumplimiento de este Acuerdo si la
            información confidencial es divulgada de manera legalmente
            requerida, siempre que El Alumno notifique inmediatamente a El
            Instituto sobre dicha solicitud legal. 8. Consecuencias por
            Incumplimiento: El incumplimiento de este Acuerdo puede resultar en
            acciones legales, incluyendo pero no limitándose a la búsqueda de
            daños y perjuicios, así como medidas cautelares para prevenir la
            divulgación no autorizada. 9. Ley Aplicable: Este Acuerdo se regirá
            e interpretará de acuerdo con las leyes del [jurisdicción
            aplicable], y cualquier disputa derivada de este Acuerdo se
            resolverá mediante arbitraje de conformidad con las reglas de
            arbitraje de [institución de arbitraje]. 10. Aceptación: Al aceptar
            los términos de este Acuerdo, El Alumno reconoce haber leído,
            entendido y aceptado todas las condiciones establecidas en el
            presente documento. Este Acuerdo de Confidencialidad se firma
            electrónicamente por ambas partes y entrará en vigor a partir de la
            fecha de aceptación por parte del Alumno.
          </p>
        </div>

        <div className="subir-documento-label">
          <label htmlFor="pdfUpload">Subir Documento:</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
          />
        </div>

        <div className="botones-de-camara">
          <label htmlFor="camera">Tomar Foto: </label>
          <button type="button" onClick={openCamera}>
            Abrir Cámara
          </button>
          
          <button type="button" onClick={capturePhoto}>
            Capturar Foto
          </button>
        </div>

         
         <div style={{ marginTop: '20px' }}>
                    <video ref={videoRef} width="640" height="480" style={{ border: '1px solid black' }}></video>
                    <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
                </div>

                {photo && (
                    <div style={{ marginTop: '20px' }}>
                        <p className="p">Foto Capturada:</p>
                        <img src={photo} alt="Captured" width="350" height="250" style={{ border: '1px solid black' }} />
                    </div>
                )}

        
          <button type="submit" className="boton-subir" onClick={handleSubmit}>
            Subir
            
          </button>
        
      </form>
    </div>
  );
}

export default Classroom;






