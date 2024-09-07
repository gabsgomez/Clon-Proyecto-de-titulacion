import React, { useState } from 'react';
import axios from 'axios';

const PasswordResetForm = () => {
  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [step, setStep] = useState(1);
  const [mensaje, setMensaje] = useState('');

  const handleRequestReset = async () => {
    try {
      const response = await axios.post('/api/request-password-reset', { correo });
      setStep(2);
      setMensaje(response.data);
    } catch (error) {
      setMensaje(error.response.data);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post('/api/verify-reset-code', { correo, codigo });
      setStep(3);
      setMensaje(response.data);
    } catch (error) {
      setMensaje(error.response.data);
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('/api/reset-password', { correo, codigo, nuevaContrasena });
      setMensaje(response.data);
    } catch (error) {
      setMensaje(error.response.data);
    }
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Solicitud de Restablecimiento de Contraseña</h2>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <button onClick={handleRequestReset}>Solicitar Código</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Verificación de Código</h2>
          <input
            type="text"
            placeholder="Código de verificación"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <button onClick={handleVerifyCode}>Verificar Código</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2>Restablecer Contraseña</h2>
          <input
            type="password"
            placeholder="Nueva Contraseña"
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
          />
          <button onClick={handleResetPassword}>Restablecer Contraseña</button>
        </div>
      )}
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default PasswordResetForm;
