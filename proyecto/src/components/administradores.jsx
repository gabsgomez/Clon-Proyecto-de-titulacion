import React from 'react';
import './Administradores.css';
import ButtonComponent from './ButtonComponent';

const Administradores = () => {
  return (
    <>
      <h1>CONTROLES</h1>
      <div className="button-container">
        <ButtonComponent iconClass="bi bi-journal-richtext" path="/AulaInteractivaAdmins" />
        <ButtonComponent iconClass="bi bi-currency-dollar" path="/Finanzas" />
        <ButtonComponent iconClass="bi bi-people" path="/Alumnos" />
        <ButtonComponent iconClass="bi bi-tags" path="/Precios" />
        <ButtonComponent iconClass="bi bi-camera-video" path="/VideoconferenciasAdmins" />
      </div>
      <br></br>
      <br></br>
      {/* Sección descriptiva de los íconos */}
      <div className="icon-description">
        <h2>Descripción de los íconos</h2>
        <br></br>
        <ul>
          <li>
            <i className="bi bi-journal-richtext"></i> <strong>Aula Interactiva:</strong> Accede a la plataforma interactiva para gestionar cursos y contenidos educativos.
          </li>
          <li>
            <i className="bi bi-currency-dollar"></i> <strong>Finanzas:</strong> Revisa los aspectos financieros de la organización.
          </li>
          <li>
            <i className="bi bi-people"></i> <strong>Alumnos:</strong> Gestiona la información y el estado de los estudiantes.
          </li>
          <li>
            <i className="bi bi-tags"></i> <strong>Precios:</strong> Consulta y ajusta los precios de los servicios o productos.
          </li>
          <li>
            <i className="bi bi-camera-video"></i> <strong>Videoconferencias:</strong> Accede y organiza reuniones por videollamada.
          </li>
        </ul>
      </div>
    </>
  );
};

export default Administradores;
