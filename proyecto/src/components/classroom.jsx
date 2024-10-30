import React from "react";
import './classroom.css';

function Classroom() {
  return (
    <div className="formulario">
      <h1>Términos y condiciones</h1>
      <div className="terminos-y-condiciones-container">
        <p>
          {/* Contenido de los términos y condiciones */}
        </p>
      </div>

      {/* Botón para ir al archivo PHP */}
      <a href="http://localhost/proyecto/php_module/index.php" className="btn btn-primary mt-3">
        Agregar Estudiante
      </a>
    </div>
  );
}

export default Classroom;
