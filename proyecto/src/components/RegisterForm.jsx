import React, { useState } from 'react';
import './RegisterForm.css';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    sexo: '',
    curp: '',
    telefono: '',
    correo: '',
    password: '',
    tipo: ''
  });

  const [selectedButton, setSelectedButton] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTipoChange = (tipo) => {
    setFormData({
      ...formData,
      tipo: tipo
    });
    setSelectedButton(tipo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await response.text();
    alert(data);
  };

  return (
    <div className="form-container">
      <div className='registra-tus-datos'>
        <h1>¡Registra tus datos!</h1>
      </div>
      <div className="form-contentt">
        <form className="register-form" onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre o nombres" onChange={handleChange} />
          <input type="text" name="apellidoPaterno" placeholder="Apellido Paterno" onChange={handleChange} />
          <input type="text" name="apellidoMaterno" placeholder="Apellido Materno" onChange={handleChange} />
          {/*<select name="sexo" onChange={handleChange}>
            <option value="" disabled selected>Sexo</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
  </select>*/}
  <select name="sexo" value={formData.sexo} onChange={handleChange}>
  <option value="" disabled>Sexo</option>
  <option value="M">Masculino</option>
  <option value="F">Femenino</option>
  <option value="O">Otro</option>
</select>

          <input type="text" name="curp" placeholder="CURP" onChange={handleChange} />
          <input type="tel" name="telefono" placeholder="Número de teléfono" onChange={handleChange} />
          <input type="email" name="correo" placeholder="Correo" onChange={handleChange} />
          <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />

            <div className="options">
            <button
              className={selectedButton === 'P' ? 'selected' : ''}
              onClick={() => handleTipoChange('P')}
            >Usuario Principiante</button>
            <button
              className={selectedButton === 'Av' ? 'selected' : ''}
              onClick={() => handleTipoChange('Av')}
            >Usuario Avanzado</button>
            <button
              className={selectedButton === 'F' ? 'selected' : ''}
              onClick={() => handleTipoChange('F')}
            >Asesorías Financieras</button>
          </div>

          <Link to="/classroom">
          <button className="submit-button" type="submit">Crear cuenta</button>



          </Link>

        </form>
        
      </div>
    </div>
  );
};

export default RegisterForm;

