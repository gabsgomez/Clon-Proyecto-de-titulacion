import React, { useState, useEffect } from 'react';
import './Etiquetas.css';

const Etiquetas = () => {
  const [generaciones, setGeneraciones] = useState([]);
  const [nuevaGeneracion, setNuevaGeneracion] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [administrador, setAdministrador] = useState('');
  const [ultimaGeneracion, setUltimaGeneracion] = useState('');

  // Obtener generaciones existentes
  const obtenerGeneraciones = () => {
    fetch('http://localhost:5000/api/auth/etiquetas/generaciones')
      .then(response => response.json())
      .then(data => setGeneraciones(data))
      .catch(error => console.error('Error al obtener generaciones:', error));
  };

  // Obtener la última generación creada
  const obtenerUltimaGeneracion = () => {
    fetch('http://localhost:5000/api/auth/etiquetas/ultima-generacion')
      .then(response => response.json())
      .then(data => setUltimaGeneracion(data.ultimaGeneracion))
      .catch(error => console.error('Error al obtener la última generación:', error));
  };

  // Crear nueva generación con validación
  const crearGeneracion = async () => {
    // Extraer la primera letra de nuevaGeneracion y convertirla a mayúscula
    const primeraLetraNuevaGen = nuevaGeneracion.charAt(0).toUpperCase();
    console.log("Primera letra de la nueva generación ingresada:", primeraLetraNuevaGen);

    // Verifica que la nueva generación siga el orden alfabético esperado
    const siguienteGeneracion = ultimaGeneracion
      ? String.fromCharCode(ultimaGeneracion.charCodeAt(0) + 1)
      : 'A';
    console.log("Letra esperada para la siguiente generación:", siguienteGeneracion);

    if (primeraLetraNuevaGen !== siguienteGeneracion) {
      alert(`La siguiente generación debe comenzar con la letra ${siguienteGeneracion}`);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/etiquetas/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nombre_Gen: nuevaGeneracion,
          Administrador: administrador,
          alumnos: alumnos,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Generación creada exitosamente');
        setNuevaGeneracion('');
        setAlumnos([]);
        obtenerGeneraciones();
        obtenerUltimaGeneracion();  // Actualizar la última generación
      } else {
        alert(data.message || 'Error al crear la generación');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor');
    }
};


  // Obtener generaciones y la última generación al cargar el componente
  useEffect(() => {
    obtenerGeneraciones();
    obtenerUltimaGeneracion();
  }, []);

  return (
    <div className="etiquetas-container">
      <h1>Crear Nueva Generación</h1>
  
      <input
        type="text"
        className="etiquetas-input"
        placeholder="Nombre de la generación"
        value={nuevaGeneracion}
        onChange={e => setNuevaGeneracion(e.target.value)}
      />
      <input
        type="text"
        className="etiquetas-input"
        placeholder="ID del Administrador"
        value={administrador}
        onChange={e => setAdministrador(e.target.value)}
      />
  
      <textarea
        className="etiquetas-textarea"
        placeholder="IDs de alumnos separados por comas"
        value={alumnos.join(',')}
        onChange={e => setAlumnos(e.target.value.split(',').map(id => id.trim()))}
      />
  
      <button className="etiquetas-button" onClick={crearGeneracion}>Crear Generación</button>
    
      <h2>Generaciones Existentes</h2>
      <ul className="generaciones-list">
        {generaciones.map((generacion, index) => (
          <li key={index}>{generacion.Nombre_Gen}</li>
        ))}
      </ul>
    </div>
  );  
};

export default Etiquetas;
