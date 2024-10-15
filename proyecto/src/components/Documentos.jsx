import React, { useState, useEffect } from 'react';

const Documentos = () => {
  const [documents, setDocuments] = useState([]);

  // Listar archivos
  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents/list');
      const data = await response.json();
      if (response.ok) {
        setDocuments(data.files);
      } else {
        alert(data.error || 'Error al obtener archivos');
      }
    } catch (error) {
      console.error('Error al obtener archivos:', error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div>
      <h2>Documentos Disponibles</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc}>
            <a href={`/uploads/${doc}`} target="_blank" rel="noopener noreferrer">
              {doc}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Documentos;
