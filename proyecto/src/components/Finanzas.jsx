import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Finanzas.css';

const Finanzas = () => {
  const [data, setData] = useState([]);
  
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Datos recibidos:", result);
      setData(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  // Cargar datos completos al inicio
  useEffect(() => {
    fetchData('http://localhost:5000/api/auth/finanzas');
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["ID Pago", "Metodo Pago", "Monto", "Fecha De Pago", "Estado Pago", "Alumno"];
    const tableRows = data.map(item => [
      item.ID_Pago,
      item.Metodo_Pago,
      item.Monto,
      item.Fecha_De_Pago.split('T')[0], // Formatear fecha
      item.Estado_Pago,
      `${item.Nombres} ${item.ApellidoPaterno} ${item.ApellidoMaterno}`
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("informe_finanzas.pdf");
  };

  return (
    <div className="finanzas-container">
      <h1>Informe de Finanzas</h1>

      {/* Botones */}
      <div className="botones-container">
        <button onClick={generatePDF}>Generar PDF</button>
        <button onClick={() => fetchData('http://localhost:5000/api/auth/finanzas')}>Reporte Completo</button>
        <button onClick={() => fetchData('http://localhost:5000/api/auth/finanzas/semanal')}>Reporte Semanal</button>
        <button onClick={() => fetchData('http://localhost:5000/api/auth/finanzas/mensual')}>Reporte Mensual</button>
        <button onClick={() => fetchData('http://localhost:5000/api/auth/finanzas/semestral')}>Reporte Semestral</button>
      </div>

      {/* Tabla de finanzas */}
      <table>
        <thead>
          <tr>
            <th>ID Pago</th>
            <th>Método de Pago</th>
            <th>Monto</th>
            <th>Fecha de Pago</th>
            <th>Estado de Pago</th>
            <th>Alumno</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((row) => (
              <tr key={row.ID_Pago}>
                <td>{row.ID_Pago}</td>
                <td>{row.Metodo_Pago}</td>
                <td>{row.Monto}</td>
                <td>{row.Fecha_De_Pago.split('T')[0]}</td> {/* Formateo de la fecha */}
                <td>{row.Estado_Pago}</td>
                <td>{`${row.Nombres} ${row.ApellidoPaterno} ${row.ApellidoMaterno}`}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay datos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Finanzas;
