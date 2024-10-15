import React, { useState } from 'react';
import './NavBar2.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar2() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Hook para la navegación

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    navigate('/login'); // Navegar a la página de registro
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={require('../imagen/ETFlogo.png')} alt="Logo de la empresa" />
      </div>
      <div className={`nav-linkss ${isOpen ? 'open' : ''}`}>
        <div className="dropdown">
          <Link to="/AulaInteractiva" className="dropdown-toggle">
          Aula Interactiva
          </Link>
          <div className="dropdown-menu">
            <Link to="/AulaInteractiva">Aula</Link>
            <Link to="/Documentos">Documentos</Link>
            <Link to="/Avisos">Avisos</Link>
          </div>
        </div>
        <Link to="/Noticias">Noticias</Link>

        {/* Indicadores de Stock con Submenú */}
        <div className="dropdown">
          <Link to="/IndicadoresDeStock" className="dropdown-toggle">
            Indicadores de Stock
          </Link>
          <div className="dropdown-menu">
            <Link to="/acciones">Acciones</Link>
            <Link to="/fondos">Fondos</Link>
            <Link to="/futuros">Futuros</Link>
            <Link to="/indices">Índices</Link>
            <Link to="/bonos">Bonos</Link>
            <Link to="/economias">Economías</Link>
          </div>
        </div>

        <Link to="/Caja">Caja</Link>
        <Link to="/ChatBot">ChatBot</Link>
        <Link to="/Videoconferencias">Videoconferencias</Link>
        {isOpen && (
          <>
            <button onClick={handleLogoutClick} className="logout-button">
              Salir
            </button>
          </>
        )}
      </div>
      {!isOpen && (
        <div className="buttons">
          <button onClick={handleLogoutClick} className="logout-button">
            Salir
          </button>
        </div>
      )}
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </nav>
  );
}

export default Navbar2;
