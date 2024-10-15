import React, { useState, useEffect } from 'react';
import './Precios.css';
import { useNavigate } from "react-router-dom";

const Precios = () => {
  const [precios, setPrecios] = useState([]);
  const [newPrecio, setNewPrecio] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchPrecios = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/precios');
        if (!response.ok) {
          throw new Error('Error al obtener los precios');
        }
        const data = await response.json();
        setPrecios(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPrecios();
  }, []);

  const handleEdit = (id, price) => {
    setEditId(id);
    setNewPrecio(price);
  };

  const handleSave = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/precios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price: newPrecio }), // Solo el precio nuevo
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el precio');
      }
  
      setPrecios(precios.map(item => (item.id === id ? { ...item, price: newPrecio } : item)));
      setEditId(null);
      setNewPrecio('');
    } catch (error) {
      console.error('Error al actualizar el precio:', error);
    }
  };

  return (
    <div className="precios-container">
      <h1>Precios</h1>
      <table>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {precios.map((item) => (
            <tr key={item.id}>
              <td>{item.description}</td>
              <td>
                {editId === item.id ? (
                  <input
                    type="number"
                    value={newPrecio}
                    onChange={(e) => setNewPrecio(e.target.value)}
                  />
                ) : (
                  item.price
                )}
              </td>
              <td>{item.tipo}</td>
              <td>
                {editId === item.id ? (
                  <button onClick={() => handleSave(item.id)}>Guardar</button>
                ) : (
                  <button onClick={() => handleEdit(item.id, item.price)}>Editar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Precios;


