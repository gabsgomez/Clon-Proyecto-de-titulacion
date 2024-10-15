export function validarCorreo(correo) {
    return /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(correo) && correo.length <= 100;
  }
  
  
  // Función de validación de nombre y apellidos
  export function validarNombre(nombre) {
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre) && nombre.length <= 50;
  }
  
  // Función de validación de CURP
  export function validarCURP(CURP) {
  
    
  
    // Validar que la CURP tenga 18 caracteres
    if (CURP.length !== 18) {
        return false;
    }
  
    // Definir expresiones regulares para cada parte
    const regexIniciales = /^[A-Z]{4}/;  // Primeras 4 letras mayúsculas
    const regexFecha = /^[0-9]{6}/;      // 6 dígitos para la fecha de nacimiento
    const regexSexo = /^[HM]/;           // 'H' o 'M' para el sexo
    const regexEntidad = /^[A-Z]{2}/;    // 2 letras para la entidad federativa
    const regexConsonantes = /^[A-Z]{3}/; // 3 consonantes internas
    const regexHomoclave = /^[0-9A-Z]/;  // 1 dígito o letra para la homoclave
    const regexDigitoVerificador = /^[0-9]{1}$/; //  dígito finale
  
    // Validar cada parte
    const iniciales = CURP.substring(0, 4);
    const fecha = CURP.substring(4, 10);
    const sexo = CURP.substring(10, 11);
    const entidad = CURP.substring(11, 13);
    const consonantes = CURP.substring(13, 16);
    const homoclave = CURP.substring(16, 17);
    const digitoVerificador = CURP.substring(17, 19);
  
    if (!regexIniciales.test(iniciales)) {
      return false;
    }
  
    if (!regexFecha.test(fecha)) {
        return false;
    }
  
    if (!regexSexo.test(sexo)) {
        return false;
    }
  
    if (!regexEntidad.test(entidad)) {
        return false;
    }
  
    if (!regexConsonantes.test(consonantes)) {
        return false;
    }
  
    if (!regexHomoclave.test(homoclave)) {
        return false;
    }
  
    if (!regexDigitoVerificador.test(digitoVerificador)) {
        return false;
    }
  
    // Si pasa todas las validaciones, entonces es una CURP válida
    return true;
  }
  
  
  
  // Función de validación de número de teléfono
  export function validarTelefono(telefono) {
    return /^\d{10}$/.test(telefono);
  }
  
  // Función de validación de contraseña
  export function validarPassword(password) {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/.test(password);
  }



//inicio de sesion////////
// Validación de correo
export function validarCorreoo(correo) {
    return /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(correo) && correo.length <= 100;
  }
  
  // Validación de contraseña (mínimo 8 caracteres, al menos una mayúscula, un número y un carácter especial)
  export function validarPasswordd(password) {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/.test(password);
  }
  
  // Validación de código de verificación (debe ser un código de letras minúsculas de 6 caracteres)
export function validarCodigo(codigo) {
    return /^[a-z]{6}$/.test(codigo);
  }
  
  
  // Validación de inicio de sesión
  export function validarCredenciales(correo, password) {
    const esCorreoValido = validarCorreo(correo);
    const esPasswordValida = validarPassword(password);
    return esCorreoValido && esPasswordValida;
  }
  
  // Validación de código de verificación para el paso de inicio de sesión
  export function validarInicioSesionConCodigo(correo, password, codigo) {
    const esCredencialesValidas = validarCredenciales(correo, password);
    const esCodigoValido = validarCodigo(codigo);
    return esCredencialesValidas && esCodigoValido;
  }
  

  //noticias//

  export function validarFecha(fecha) {
    const regex = /^\d{4}\/\d{2}\/\d{2}$/;
    return regex.test(fecha);
  }
  export function compararFechas(fecha1, fecha2) {
    return new Date(fecha1) > new Date(fecha2) ? fecha1 : fecha2;
  }

  export function ordenarNoticiasPorFecha(noticias) {
    return noticias.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  }
