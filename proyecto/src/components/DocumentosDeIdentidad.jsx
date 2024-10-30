import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DocumentosDeIdentidad = () => {
  const [contratos, setContratos] = useState([]);

  // Función para obtener los contratos desde la API
  useEffect(() => {
    const fetchContratos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contratos');
        console.log('Datos recibidos:', response.data); // Verificar datos en consola
        setContratos(response.data);
      } catch (error) {
        console.error('Error al obtener los contratos:', error);
      }
    };

    fetchContratos();
  }, []);

  // Función para descargar un archivo local
  const downloadFile = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = `http://localhost:5000/${fileUrl}`; // Ruta local del archivo
    link.download = fileName;
    link.click();
  };

  // Función para manejar la descarga de documentos y foto de rostro
  const handleDownload = (contrato) => {
    // Descargar Documentos
    if (contrato.Documentos) {
      downloadFile(contrato.Documentos, 'documentos.pdf');
    }

    // Descargar Foto_Rostro
    if (contrato.Foto_Rostro) {
      downloadFile(contrato.Foto_Rostro, 'foto_rostro.jpg');
    }
  };

  return (
    <div>
      <h1>Contratos de Identidad</h1>
      <table>
        <thead>
          <tr>
            <th>ID Contrato</th>
            <th>Documentos</th>
            <th>Foto Rostro</th>
            <th>Descargar</th>
          </tr>
        </thead>
        <tbody>
          {contratos.map((contrato) => (
            <tr key={contrato.ID_Contrato}>
              <td>{contrato.ID_Contrato}</td>
              <td>
                {contrato.Documentos ? (
                  <a
                    href={`http://localhost:5000/${contrato.Documentos}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Documento
                  </a>
                ) : (
                  'No hay documento'
                )}
              </td>
              <td>
                {contrato.Foto_Rostro ? (
                  <img
                    src={`http://localhost:5000/${contrato.Foto_Rostro}`}
                    alt="Foto de Rostro"
                    style={{ width: '200px', height: 'auto', objectFit: 'contain' }}
                  />
                ) : (
                  'No hay imagen'
                )}
              </td>
              <td>
                <button onClick={() => handleDownload(contrato)}>
                  Descargar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentosDeIdentidad;
