import React, { useState } from "react";
import "./LoginAdministradores.css";
import './NavBar.jsx'
import { useNavigate } from "react-router-dom";

const LoginAdministradores = () => {
  const [formData, setFormData] = useState({
    id_Administrador: "",
    usuario_Administrador: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/loginadministradores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_Administrador: formData.id_Administrador,
          usuario_Administrador: formData.usuario_Administrador,
        }),
      });
  
      // Verificar si la respuesta no es JSON válida
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error al iniciar sesión:", errorData.error || errorData.message);
        return;
      }
  
      const data = await response.json();
  
      if (response.status === 200) {
        console.log("Inicio de sesión de administrador exitoso");
        navigate("/administradores");
      }
    } catch (error) {
      console.error("Error en la solicitud de inicio de sesión:", error);
    }
  };
  

  return (
    <div className="form-containerr">
      <h1>Iniciar Sesión Administrador</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-groupp">
          <label htmlFor="id_Administrador">ID:</label>
          <input
            type="number"
            id="id_Administrador"
            name="id_Administrador"
            value={formData.id_Administrador}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-groupp">
          <label htmlFor="usuario_Administrador">Usuario:</label>
          <input
            type="text"
            id="usuario_Administrador"
            name="usuario_Administrador"
            value={formData.usuario_Administrador}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="button-iniciar-sesion">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginAdministradores;
