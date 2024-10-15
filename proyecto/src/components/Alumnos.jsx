import React, { useState, useEffect } from 'react';
import './Alumnos.css';

const Alumnos = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Función para formatear la fecha en día/mes/año
  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    const dia = String(nuevaFecha.getDate()).padStart(2, '0');
    const mes = String(nuevaFecha.getMonth() + 1).padStart(2, '0'); // Mes empieza desde 0
    const año = nuevaFecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  // Función para obtener usuarios por tipo usando fetch
  const obtenerUsuariosPorTipo = () => {
    fetch(`http://localhost:5000/api/auth/usuarios?tipo=${tipoUsuario}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios por tipo');
        }
        return response.json();
      })
      .then(data => {
        setUsuarios(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // Función para buscar usuarios sin importar su tipo
  const buscarUsuarios = () => {
    fetch(`http://localhost:5000/api/auth/usuarios?searchTerm=${searchTerm}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al buscar usuarios');
        }
        return response.json();
      })
      .then(data => {
        setUsuarios(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // Ejecutar la búsqueda cada vez que cambie el searchTerm
  useEffect(() => {
    if (searchTerm) {
      buscarUsuarios();
    } else if (tipoUsuario) {
      obtenerUsuariosPorTipo();
    }
  }, [tipoUsuario, searchTerm]);

  return (
    <div className="alumnos-container">
      <h1>Filtrar Usuarios</h1>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por Nombre o Apellido"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '10px',
          width: '300px',
          marginBottom: '20px',
          fontSize: '16px'
        }}
      />

      {/* Botones de filtro */}
      <div className="botones-container">
        <button onClick={() => { setTipoUsuario('Av'); setSearchTerm(''); }}>Usuarios Avanzados</button>
        <button onClick={() => { setTipoUsuario('P'); setSearchTerm(''); }}>Usuarios Principiantes</button>
        <button onClick={() => { setTipoUsuario('F'); setSearchTerm(''); }}>Asesorías Financieras</button>
        <button onClick={() => { setTipoUsuario('adm'); setSearchTerm(''); }}>Administradores</button>
      </div>

      <div>
        <h2>Usuarios {tipoUsuario || 'Todos'}</h2>
        <table>
          <thead>
            <tr>
              <th>ID Usuario</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Fecha Creación</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.ID_Usuario}>
                <td>{usuario.ID_Usuario}</td>
                <td>{usuario.Nombres}</td>
                <td>{usuario.ApellidoPaterno} {usuario.ApellidoMaterno}</td>
                <td>{usuario.Correo}</td>
                <td>{formatearFecha(usuario.fecha_creacion)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Alumnos;
