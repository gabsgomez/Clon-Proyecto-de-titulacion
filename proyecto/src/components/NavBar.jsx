import React, { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Hook para la navegación

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleRegisterClick = () => {
    console.log('Navigating to /register');
    navigate('/register'); // Navegar a la página de registro
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
        <Link to="/">Inicio</Link>
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/experiencia">Experiencia</Link>
        <Link to="/cursos">Cursos</Link>
        {isOpen && (
          <>
            <button onClick={handleLoginClick} className="login-button">Ingresar</button>
            <button onClick={handleRegisterClick} className="register-button">Registrarse</button>
          </>
        )}
      </div>
      {!isOpen && (
        <div className="buttons">
          <button onClick={handleLoginClick} className="login-button">Ingresar</button>
          <button onClick={handleRegisterClick} className="register-button">Registrarse</button>
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

export default Navbar;

