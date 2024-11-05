import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const PDFViewer = ({ userId }) => {
  const [formulariosData, setFormulariosData] = useState([]);
  const [selectedFormulario, setSelectedFormulario] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormularios = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Solicitando formularios para:", userId);

        const response = await fetch(
          `http://localhost:5000/api/form/user/${userId}`,
          {
            headers: {
              'Accept': 'application/json',
            }
          }
        );

        const contentType = response.headers.get("content-type");
        if (!response.ok) {
          const errorText = contentType?.includes("application/json")
            ? (await response.json()).message
            : await response.text();
          throw new Error(errorText || "Error al cargar formularios");
        }

        const data = await response.json();
        console.log("Datos recibidos:", data);

        if (data.success && Array.isArray(data.formularios)) {
          setFormulariosData(data.formularios);
          setError(null);
        } else {
          throw new Error("Formato de respuesta inválido");
        }
      } catch (err) {
        console.error("Error en fetchFormularios:", err);
        setError(err.message);
        setFormulariosData([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchFormularios();
    }
  }, [userId]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const previousPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const nextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages));
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Cargando formularios...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Visor de Formularios PDF</h2>

        <select
          className="w-full p-2 border rounded mb-4"
          value={selectedFormulario || ""}
          onChange={(e) => setSelectedFormulario(e.target.value)}
        >
          <option value="">Selecciona un formulario</option>
          {formulariosData.map((formulario) => (
            <option
              key={formulario.ID_Formulario}
              value={formulario.ID_Formulario}
            >
              {formulario.nombre_archivo}
            </option>
          ))}
        </select>
      </div>

      {selectedFormulario && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <Document
              file={`http://localhost:5000/api/form/${selectedFormulario}/pdf`}
              onLoadSuccess={onDocumentLoadSuccess}
              error={
                <div className="text-red-500">
                  Error al cargar el PDF. Por favor, intenta de nuevo.
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                className="shadow-lg"
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </Document>
          </div>

          <div className="flex items-center justify-between px-4 mt-4">
            <button
              onClick={previousPage}
              disabled={pageNumber <= 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Anterior
            </button>

            <div className="text-sm">
              Página {pageNumber} de {numPages}
            </div>

            <button
              onClick={nextPage}
              disabled={pageNumber >= numPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;