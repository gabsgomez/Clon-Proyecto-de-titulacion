import React, { useState, useRef, useEffect } from 'react';
import './DocumentosAdmins.css';

function DocumentosAdmins() {
  const [pdfFile, setPdfFile] = useState(null);
  const [documentos, setDocumentos] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Fetch the existing documents from the server
  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/get', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token JWT esté guardado en el localStorage
          }
        });
        const data = await response.json();
        setDocumentos(data);
      } catch (err) {
        console.error("Error fetching documentos", err);
      }
    };
    fetchDocumentos();
  }, []);

  // Handle PDF file upload
  const handlePdfUpload = (e) => {
    setPdfFile(e.target.files[0]);
  };

  // Submit the form with PDF
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile) {
      alert("Por favor sube un PDF");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      const response = await fetch('http://localhost:5000/api/auth/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token JWT esté guardado en el localStorage
        },
        body: formData,
      });

      if (response.ok) {
        alert('Archivos subidos correctamente');
        // Recargar los documentos después de subir
        const updatedDocs = await response.json();
        setDocumentos(updatedDocs);
      } else {
        alert('Error al subir los archivos');
      }
    } catch (err) {
      console.error('Error al subir los archivos', err);
      alert('Error al subir los archivos');
    }
  };

  // Handle document deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token JWT esté guardado en el localStorage
        },
      });

      if (response.ok) {
        alert('Documento eliminado correctamente');
        setDocumentos(documentos.filter(doc => doc.id !== id));
      } else {
        alert('Error al eliminar el documento');
      }
    } catch (err) {
      console.error('Error al eliminar el documento', err);
    }
  };

  return (
    <div className="documentos-admins">
      <h1>Administrar Documentos</h1>
      <form onSubmit={handleSubmit}>
        <div className="subir-documento">
          <label>Subir Documento PDF:</label>
          <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
        </div>

        <video ref={videoRef} style={{ display: 'none' }}></video>
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

        <button type="submit">Subir</button>
      </form>

      <h2>Documentos Subidos</h2>
      <ul>
        {documentos.map(doc => (
          <li key={doc.id}>
            <a href={`http://localhost:5000/uploads/documentos_pdf/${doc.fileName}`} target="_blank" rel="noopener noreferrer">
              {doc.fileName}
            </a>
            <button onClick={() => handleDelete(doc.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DocumentosAdmins;
