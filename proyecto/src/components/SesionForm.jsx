import React, { useState } from "react";
import "./SesionForm.css";
import { useNavigate } from "react-router-dom";

const SesionForm = () => {
  const [formData, setFormData] = useState({
    correo: "",
    password: "",
    codigo: "",
    newPassword: "",
  });
  const [step, setStep] = useState(1); // Estado para manejar el paso del formulario
  const [isPasswordReset, setIsPasswordReset] = useState(false); // Estado para manejar el modo de restablecimiento de contraseña
  const [userType, setUserType] = useState(null); // Estado para almacenar el tipo de usuario
  const [errorMessage, setErrorMessage] = useState({ correo: "", password: "", codigo: "", estatus: "" });
  const navigate = useNavigate();

  const [showGoToPayment, setShowGoToPayment] = useState(false); // Estado para mostrar el botón



  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrorMessage({ correo: "", password: "", codigo: "", estatus: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPasswordReset) {
      if (step === 1) {
        // Solicitar el restablecimiento de contraseña
        try {
          const response = await fetch(
            "http://localhost:5000/api/auth/request-password-reset",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ correo: formData.correo }),
            }
          );
          const data = await response.text();
          if (response.status === 200) {
            console.log("Código de verificación enviado al correo");
            setStep(2);
          } else {
            console.log(
              "Error al solicitar el restablecimiento de contraseña:",
              data
            );
          }
        } catch (error) {
          console.log(
            "Error en la solicitud de restablecimiento de contraseña:",
            error
          );
        }
      } else if (step === 2) {
        // Verificar el código de verificación
        try {
          const response = await fetch(
            "http://localhost:5000/api/auth/verify-reset-code",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                correo: formData.correo,
                codigo: formData.codigo,
              }),
            }
          );
          const data = await response.text();
          if (response.status === 200) {
            console.log("Código de verificación correcto");
            setStep(3);
          } else {
            console.log("Error al verificar el código:", data);
          }
        } catch (error) {
          console.log(
            "Error en la solicitud de verificación del código:",
            error
          );
        }
      } else if (step === 3) {
        // Restablecer la contraseña
        try {
          const response = await fetch(
            "http://localhost:5000/api/auth/reset-password",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                correo: formData.correo,
                codigo: formData.codigo,
                nuevaContrasena: formData.newPassword,
              }),
            }
          );
          const data = await response.text();
          if (response.status === 200) {
            console.log("Contraseña restablecida correctamente");
            setIsPasswordReset(false);
            setStep(1);
          } else {
            console.log("Error al restablecer la contraseña:", data);
          }
        } catch (error) {
          console.log(
            "Error en la solicitud de restablecimiento de contraseña:",
            error
          );
        }
      }
    } else {
      // Inicio de sesión
      if (step === 1) {
        try {
          const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              correo: formData.correo,
              password: formData.password,
            }),
          });
         // const data = await response.text();
         const data = await response.json();
         
         if (response.status === 200) {
          console.log("Correo y contraseña correctos, ingresa el código de verificación");
          setUserType(data.userType); // Guardar el tipo de usuario
          setStep(2); // Pasar al paso de verificación del código
        } else {
          //nuevo
          if (data.goToPayment) {
            setShowGoToPayment(true); // Mostrar botón para ir a "CajaInicio"
          }

          // Mostrar mensajes específicos de estatus en caso de error
          if (data.message.includes("deshabilitado")) {
            setErrorMessage({
              estatus: "Su usuario está deshabilitado. Si no eres de primer ingreso, por favor envía un correo a a20300685@ceti.mx para comunicarte con un asesor.",
            });
          } else if (data.message.includes("primer ingreso")) {
            setErrorMessage({
              estatus: "Tu usuario es de primer ingreso y puede tardar en habilitarse. Si no eres de primer ingreso, contacta a un asesor en a20300685@ceti.mx.",
            });
          } else if (data.message.includes("Su pago no está registrado")) {
            setErrorMessage({
              estatus: "Su pago no está registrado y no puede ingresar al sistema. Si se trata de un error, comuníquese al correo a20300685@ceti.mx.",
            });
          }
          else {
            setErrorMessage({
              correo: "Correo o contraseña incorrecta.",
              password: "Correo o contraseña incorrecta.",
            }); // Notificación idéntica a registro
          }

          console.log("Error al iniciar sesión:", data);
        }
      } catch (error) {
        console.log("Error en la solicitud de inicio de sesión:", error);
      }
    }  else if (step === 2) {
        try {
          const response = await fetch(
            "http://localhost:5000/api/auth/verify-reset-code",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                correo: formData.correo,
                codigo: formData.codigo,
              }),
            }
          );
          const data = await response.text();
          if (response.status === 200) {
            console.log("Verificación exitosa");
            //lo nuevo
            console.log(userType);
            if (userType === 'F') {
              navigate("/VideoconferenciasFinancieras");
            } else {
              navigate("/AulaInteractiva");
            }
            //

            //navigate("/AulaInteractiva"); // Navegar a la página de inicio después de un inicio de sesión exitoso
          } else {
            setErrorMessage({ codigo: "El código de verificación es incorrecto." });
          }
        } catch (error) {
          console.log(
            "Error en la solicitud de verificación del código:",
            error
          );
          setErrorMessage({ codigo: "Ocurrió un error, intenta nuevamente." });
        }
      }
    }
  };

  const togglePasswordReset = () => {
    setIsPasswordReset(!isPasswordReset);
    setStep(1);
    setErrorMessage({ correo: "", password: "", codigo: "", estatus: "" });
  };

  return (
    <div className="form-containerr">
      <h1>{isPasswordReset ? "Restablecer Contraseña" : "Iniciar Sesión"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-groupp">
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
          {errorMessage.correo && (
            <p className="error-message">{errorMessage.correo}</p>

          )}
          
        </div>
        {isPasswordReset ? (
          <>
            {step === 1 && (
              <button type="submit" className="button">
                Solicitar Restablecimiento
              </button>
            )}
            {step === 2 && (
              <>
                <div className="form-groupp">
                  <label htmlFor="codigo">Código de Verificación:</label>
                  <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    required
                  />
                  {errorMessage.codigo && (
              <p className="error-message">{errorMessage.codigo}</p>
            )}
                </div>
                <button type="submit" className="button">
                  Verificar Código
                </button>
              </>
            )}
            {step === 3 && (
              <>
                <div className="form-groupp">
                  <label htmlFor="newPassword">Nueva Contraseña:</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                  />
                 
                </div>
                <button type="submit" className="button-secondary">
                  Restablecer Contraseña
                </button>
              </>
            )}
          </>
        ) : (
          <>
            {step === 1 && (
              <>
                <div className="form-groupp">
                  <label htmlFor="password">Contraseña:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="button-iniciar-sesion">
                  Iniciar Sesión
                </button>
                {errorMessage.estatus && (
                  <p className="error-message">{errorMessage.estatus}</p>
                )}
                {showGoToPayment && (
  <button 
    onClick={() => navigate("/CajaInicio")} 
    className="button-secondary"
  >
    Ir a Caja
  </button>
)}

              </>
            )}
            {step === 2 && (
              <>
                <div className="form-groupp">
                  <label htmlFor="codigo">Código de Verificación:</label>
                  <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    required
                  />
                   {errorMessage.codigo && (
              <p className="error-message">{errorMessage.codigo}</p>
            )}
                </div>
                <button type="submit" className="button">
                  Verificar Código
                </button>
              </>
            )}
          </>
        )}
      </form>
      <button onClick={togglePasswordReset} className="button-secondary">
        {isPasswordReset ? "Iniciar Sesión" : "Restablecer Contraseña"}
      </button>
    </div>
  );
};

export default SesionForm;
