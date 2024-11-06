import React, { useState } from 'react';
import './NavBarF.css';
import { Link, useNavigate } from 'react-router-dom';

function NavbarF() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Hook para la navegación

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  
  const handleLoginClick = () => {
    console.log('Navigating to /login');
    navigate('/login'); // Navegar a la página de inicio de sesión
  };
  
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={require('../imagen/ETFlogo.png')} alt="Logo de la empresa" />
      </div>
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <Link to="/CajaF">Caja</Link>
        <Link to="/VideoconferenciasFinancieras">Videoconferencias</Link>
        {isOpen && (
          <>
            <button onClick={handleLoginClick} className="login-button">Salir</button>
          </>
        )}
      </div>
      {!isOpen && (
        <div className="buttons">
          <button onClick={handleLoginClick} className="login-button">Salir</button>
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

export default NavbarF;

