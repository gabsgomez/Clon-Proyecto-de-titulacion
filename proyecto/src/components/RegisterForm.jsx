/*import React, { useState } from 'react';
import './RegisterForm.css';
import { useNavigate } from 'react-router-dom';

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
  const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar mensajes de error
  const navigate = useNavigate(); // Para redireccionar

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convertir a mayúsculas para los campos específicos
    const uppercaseFields = ['curp', 'nombre', 'apellidoPaterno', 'apellidoMaterno'];
    const newValue = uppercaseFields.includes(name) ? value.toUpperCase() : value;

    setFormData({
      ...formData,
      [name]: newValue
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
    setErrorMessage(''); // Limpiar el mensaje de error al intentar de nuevo

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.text();

      if (response.ok) {
        // Redirigir solo si no hay errores y la respuesta es exitosa
        alert('Registro exitoso');
         // Redirección a classroom.php
    window.location.href = "http://localhost/proyecto/php_module/classroom.php";
      } else {
        // Si hay errores, mostrar el mensaje y no redirigir
        setErrorMessage(data);
      }
    } catch (error) {
      setErrorMessage('Hubo un problema con la conexión al servidor. Intenta nuevamente.');
    }
  };

  return (
    <div className="form-container">
      <div className='registra-tus-datos'>
        <h1>¡Registra tus datos!</h1>
      </div>
      <div className="form-contentt">
        <form className="register-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="nombre" 
            placeholder="Nombre o nombres" 
            value={formData.nombre} 
            onChange={handleChange} 
          />
          <input 
            type="text" 
            name="apellidoPaterno" 
            placeholder="Apellido Paterno" 
            value={formData.apellidoPaterno} 
            onChange={handleChange} 
          />
          <input 
            type="text" 
            name="apellidoMaterno" 
            placeholder="Apellido Materno" 
            value={formData.apellidoMaterno} 
            onChange={handleChange} 
          />
          
          <select name="sexo" value={formData.sexo} onChange={handleChange}>
            <option value="" disabled>Sexo</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>

          <input 
            type="text" 
            name="curp" 
            placeholder="CURP" 
            value={formData.curp} 
            onChange={handleChange} 
          />
          <input 
            type="tel" 
            name="telefono" 
            placeholder="Número de teléfono" 
            value={formData.telefono} 
            onChange={handleChange} 
          />
          <input 
            type="email" 
            name="correo" 
            placeholder="Correo" 
            value={formData.correo} 
            onChange={handleChange} 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Contraseña" 
            value={formData.password} 
            onChange={handleChange} 
          />

          <div className="options">
            <button
              className={selectedButton === 'P' ? 'selected' : ''}
              onClick={() => handleTipoChange('P')}
              type="button"
            >
              Usuario Principiante
            </button>
            <button
              className={selectedButton === 'Av' ? 'selected' : ''}
              onClick={() => handleTipoChange('Av')}
              type="button"
            >
              Usuario Avanzado
            </button>
            <button
              className={selectedButton === 'F' ? 'selected' : ''}
              onClick={() => handleTipoChange('F')}
              type="button"
            >
              Asesorías Financieras
            </button>
          </div>

          <button className="submit-button" type="submit">Crear cuenta</button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

*/







import React, { useState } from 'react';
import './RegisterForm.css';
import { useNavigate } from 'react-router-dom';

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
    tipo: '',
    fechaNacimiento: { year: '', month: '', day: '' }
  });

  const [selectedButton, setSelectedButton] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const uppercaseFields = ['curp', 'nombre', 'apellidoPaterno', 'apellidoMaterno'];
    const newValue = uppercaseFields.includes(name) ? value.toUpperCase() : value;

    if (name === 'year' || name === 'month' || name === 'day') {
      setFormData({
        ...formData,
        fechaNacimiento: {
          ...formData.fechaNacimiento,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: newValue
      });
    }
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
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.text();

      if (response.ok) {
        alert('Registro exitoso');
        window.location.href = "http://localhost/proyecto/php_module/classroom.php";
      } else {
        setErrorMessage(data);
      }
    } catch (error) {
      setErrorMessage('Hubo un problema con la conexión al servidor. Intenta nuevamente.');
    }
  };

  return (
    <div className="form-container">
      <div className='registra-tus-datos'>
        <h1>¡Registra tus datos!</h1>
      </div>
      <div className="form-contentt">
        <form className="register-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="nombre" 
            placeholder="Nombre o nombres" 
            value={formData.nombre} 
            onChange={handleChange} 
          />
          <input 
            type="text" 
            name="apellidoPaterno" 
            placeholder="Apellido Paterno" 
            value={formData.apellidoPaterno} 
            onChange={handleChange} 
          />
          <input 
            type="text" 
            name="apellidoMaterno" 
            placeholder="Apellido Materno" 
            value={formData.apellidoMaterno} 
            onChange={handleChange} 
          />

          {/* Fecha de nacimiento */}
          <div className="fecha-nacimiento">
            <label className='fecha-label'>Fecha de Nacimiento:</label>
            <select name="year" value={formData.fechaNacimiento.year} onChange={handleChange}>
              <option value="">Año</option>
              {[...Array(100)].map((_, i) => {
                const year = new Date().getFullYear() - i;
                return <option key={year} value={year}>{year}</option>;
              })}
            </select>
            <select name="month" value={formData.fechaNacimiento.month} onChange={handleChange}>
              <option value="">Mes</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <select name="day" value={formData.fechaNacimiento.day} onChange={handleChange}>
              <option value="">Día</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <select name="sexo" value={formData.sexo} onChange={handleChange}>
            <option value="" disabled>Sexo</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>

          <input 
            type="text" 
            name="curp" 
            placeholder="CURP" 
            value={formData.curp} 
            onChange={handleChange} 
          />
          <input 
            type="tel" 
            name="telefono" 
            placeholder="Número de teléfono" 
            value={formData.telefono} 
            onChange={handleChange} 
          />
          <input 
            type="email" 
            name="correo" 
            placeholder="Correo" 
            value={formData.correo} 
            onChange={handleChange} 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Contraseña" 
            value={formData.password} 
            onChange={handleChange} 
          />

          <div className="options">
            <button
              className={selectedButton === 'P' ? 'selected' : ''}
              onClick={() => handleTipoChange('P')}
              type="button"
            >
              Usuario Principiante
            </button>
            <button
              className={selectedButton === 'Av' ? 'selected' : ''}
              onClick={() => handleTipoChange('Av')}
              type="button"
            >
              Usuario Avanzado
            </button>
            <button
              className={selectedButton === 'F' ? 'selected' : ''}
              onClick={() => handleTipoChange('F')}
              type="button"
            >
              Asesorías Financieras
            </button>
          </div>

          <button className="submit-button" type="submit">Crear cuenta</button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
