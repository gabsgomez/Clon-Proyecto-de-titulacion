import React, { useState, useEffect } from 'react';

const Habilitacion = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [estatus, setEstatus] = useState('');

  const obtenerUsuariosPorEstatus = (estatus) => {
    fetch(`http://localhost:5000/api/auth/usuarios/estatus/${estatus}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios por estatus');
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

  // Función para habilitar un usuario
  const habilitarUsuario = (id) => {
    fetch(`http://localhost:5000/api/auth/usuarios/habilitar/${id}`, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        obtenerUsuariosPorEstatus(estatus); // Actualizar la lista de usuarios
      })
      .catch(error => {
        console.error('Error al habilitar usuario:', error);
      });
  };

  // Función para deshabilitar un usuario
  const deshabilitarUsuario = (id) => {
    fetch(`http://localhost:5000/api/auth/usuarios/deshabilitar/${id}`, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        obtenerUsuariosPorEstatus(estatus); // Actualizar la lista de usuarios
      })
      .catch(error => {
        console.error('Error al deshabilitar usuario:', error);
      });
  };

  // Efecto para obtener los usuarios cada vez que se cambia el estatus
  useEffect(() => {
    if (estatus) {
      obtenerUsuariosPorEstatus(estatus);
    }
  }, [estatus]);

  return (
    <div className="alumnos-container">
      <h1>Usuarios por Estatus: {estatus}</h1>

      {/* Botones de filtro por estatus */}
      <div className="botones-container">
        <button onClick={() => setEstatus('Primer Ingreso')}>Primer Ingreso</button>
        <button onClick={() => setEstatus('Habilitado')}>Habilitado</button>
        <button onClick={() => setEstatus('Deshabilitado')}>Deshabilitado</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID Usuario</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Tipo</th>
            <th>Habilitar</th>
            <th>Deshabilitar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.ID_Usuario}>
              <td>{usuario.ID_Usuario}</td>
              <td>{usuario.Nombres}</td>
              <td>{usuario.ApellidoPaterno} {usuario.ApellidoMaterno}</td>
              <td>{usuario.Correo}</td>
              <td>{usuario.Tipo}</td>
              <td>
                <button 
                  onClick={() => habilitarUsuario(usuario.ID_Usuario)} 
                  disabled={usuario.Estatus === 'Habilitado'}
                >
                  Habilitar
                </button>
              </td>
              <td>
                <button 
                  onClick={() => deshabilitarUsuario(usuario.ID_Usuario)} 
                  disabled={usuario.Estatus === 'Deshabilitado'}
                >
                  Deshabilitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Habilitacion;
