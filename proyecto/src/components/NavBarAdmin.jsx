import React, { useState } from 'react';
import './NavBarAdmin.css';
import { Link, useNavigate } from 'react-router-dom';

function NavbarAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Hook para la navegación

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    navigate('/login'); // Navegar a la página de login
  };

  const handleFormClick = () => {
    console.log("Navigating to /form");
    navigate("/form"); // Navegar a la página de formulario
  };

  const handlePrevisualizarClick = () => {
    console.log("Navigating to /previsualizar");
    navigate("/previsualizar"); // Navegar a la página de previsualización
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={require('../imagen/ETFlogo.png')} alt="Logo ETF" />
      </div>
      <div className={`nav-linkss ${isOpen ? 'open' : ''}`}>
        {/* Indicadores de Stock con Submenú */}
        <div className="dropdown">
          <Link to="/AulaInteractivaAdmins" className="dropdown-toggle">
            Aula Interactiva
          </Link>
          <div className="dropdown-menu">
            <Link to="/Alumnos">Alumnos</Link>
            <Link to="/Etiquetas">Etiquetas</Link>
            <Link to="/form">Formulario</Link>
            <Link to="/Actividades">Actividades</Link>
            <Link to="/DocumentosAdmins">Documentos</Link>
            <Link to="/Habilitacion">Habilitación</Link>
          </div>
        </div>

        <div className="dropdown">
          <Link to="/CajaAdmins" className="dropdown-toggle">
            Caja   
          </Link>
          <div className="dropdown-menu">
            <Link to="/Finanzas">Finanzas</Link>
            <Link to="/Precios">Precios</Link>
          </div>
        </div>
        <Link to="/administradores">Administradores</Link>
        <Link to="/VideoconferenciasAdmins">Videoconferencias</Link>
      </div>
      <div className="buttons">
        <button onClick={handleLogoutClick} className="logout-button">
          Salir
        </button>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </nav>
  );
}

export default NavbarAdmin;
