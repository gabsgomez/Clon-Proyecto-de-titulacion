import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <h2>ETF</h2>
          <p><strong>Contacto:</strong> +52-33 3416 2726</p>
          <p><strong>Email:</strong> info@misitio.com</p>
          <p><strong>Ubicación:</strong> C. Colonias 221, Col Americana. 44160, Guadalajara</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 ETF</p>
        <div className="footer-social">
          <a href="/"><img src={require('../imagen/discord_icono.png')} alt="Discord" /></a>
          <a href="/"><img src={require('../imagen/x_icono.png')} alt="X" /></a>
          <a href="/"><img src={require('../imagen/fb_icono.png')} alt="Facebook" /></a>
          <a href="/"><img src={require('../imagen/ig_icono.png')} alt="Instagram" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
