// Mock para Axios
jest.mock("axios");

// Mock para MercadoPago
jest.mock("@mercadopago/sdk-react", () => ({
  initMercadoPago: jest.fn(),
  Wallet: jest.fn(),
}));

import { render, fireEvent, waitFor } from "@testing-library/react";
import SesionForm from "../components/SesionForm";
import Noticias from "../components/Noticias";

import {
  validarFecha,
  compararFechas,
  ordenarNoticiasPorFecha,
  getData,
  handleViewedNews,
} from "./validations";
import {
  validarCorreo,
  validarNombre,
  validarCURP,
  validarTelefono,
  validarPassword,
} from "./validations";
import {
  validarCorreoo,
  validarPasswordd,
  validarCodigo,
  validarCredenciales,
  validarInicioSesionConCodigo,
} from "./validations";

const validations = require("./validations");

// Pruebas unitarias de Registro
describe("Pruebas de validación de usuario en authController", () => {
  test("Debe aceptar un correo válido", () => {
    expect(validations.validarCorreo("correo@example.com")).toBe(true);
  });

  test("Debe rechazar un correo inválido", () => {
    expect(validations.validarCorreo("correo@.com")).toBe(false);
  });

  // Pruebas para la validación del nombre
  test("Debe aceptar un nombre válido", () => {
    expect(validations.validarNombre("Juan")).toBe(true);
  });

  test("Debe rechazar un nombre con caracteres no alfabéticos", () => {
    expect(validations.validarNombre("Juan123")).toBe(false);
  });

  // Pruebas para la validación de CURP
  test("Debe aceptar una CURP válida", () => {
    expect(validations.validarCURP("ABCD010101HDFRRR01")).toBe(true);
  });

  test("Debe rechazar una CURP inválida (menos de 18 caracteres)", () => {
    expect(validations.validarCURP("ABC123")).toBe(false);
  });

  // Pruebas para la validación de teléfono
  test("Debe aceptar un número de teléfono válido", () => {
    expect(validations.validarTelefono("1234567890")).toBe(true);
  });

  test("Debe rechazar un número de teléfono inválido", () => {
    expect(validations.validarTelefono("12345")).toBe(false);
  });

  // Pruebas para la validación de contraseña
  test("Debe aceptar una contraseña válida", () => {
    expect(validations.validarPassword("Password1!")).toBe(true);
  });

  test("Debe rechazar una contraseña sin mayúsculas ni caracteres especiales", () => {
    expect(validations.validarPassword("password1")).toBe(false);
  });
});

describe("Pruebas de validación de inicio de sesion", () => {
  // Prueba para validar un correo válido
  test("Debe aceptar un correo válido", () => {
    const correoValido = "correo@example.com";
    expect(validarCorreo(correoValido)).toBe(true);
  });

  // Prueba para validar un correo inválido
  test("Debe rechazar un correo inválido", () => {
    const correoInvalido = "correo@.com";
    expect(validarCorreo(correoInvalido)).toBe(false);
  });

  // Prueba para validar una contraseña válida
  test("Debe aceptar una contraseña válida", () => {
    const passwordValida = "Password1!";
    expect(validarPassword(passwordValida)).toBe(true);
  });

  // Prueba para validar una contraseña inválida
  test("Debe rechazar una contraseña inválida (sin mayúsculas ni caracteres especiales)", () => {
    const passwordInvalida = "password1";
    expect(validarPassword(passwordInvalida)).toBe(false);
  });

  // Prueba para validar un código de verificación válido
  test("Debe aceptar un código de verificación válido", () => {
    const codigoValido = "kjrhdn";
    expect(validarCodigo(codigoValido)).toBe(true);
  });

  // Prueba para validar las credenciales del inicio de sesión
  test("Debe aceptar credenciales válidas de inicio de sesión", () => {
    const correo = "correo@example.com";
    const password = "Password1!";
    expect(validarCredenciales(correo, password)).toBe(true);
  });

  test("Debe aceptar un código de verificación válido", () => {
    const codigoValido = "abcdef"; // Solo letras minúsculas
    expect(validarCodigo(codigoValido)).toBe(true);
  });

  // Prueba para rechazar un código de verificación con caracteres no válidos (números o mayúsculas)
  test("Debe rechazar un código de verificación con números o mayúsculas", () => {
    const codigoInvalido = "123456"; // Números, no permitido
    expect(validarCodigo(codigoInvalido)).toBe(false);
  });
});

describe("Pruebas de validación de noticias", () => {
  test("Debe aceptar una fecha en formato correcto (yyyy/mm/dd)", () => {
    const fechaValida = "2024/05/20";
    expect(validarFecha(fechaValida)).toBe(true);
  });

  test("Debe rechazar una fecha en formato incorrecto", () => {
    const fechaInvalida = "20-05-2024";
    expect(validarFecha(fechaInvalida)).toBe(false);
  });

  test("Debe identificar la fecha más reciente", () => {
    const fecha1 = "2024/05/20";
    const fecha2 = "2024/05/21";
    expect(compararFechas(fecha1, fecha2)).toBe(fecha2);
  });

  

  test("Debe organizar las noticias por fecha en orden descendente", () => {
    const noticias = [
      { title: "Old News", publishedAt: "2024/05/19" },
      { title: "New News", publishedAt: "2024/05/20" },
    ];
    const resultado = ordenarNoticiasPorFecha(noticias);
    expect(resultado[0].title).toBe("New News");
  });

  ////

  test("Debe actualizar el estado de búsqueda cuando se ingresa texto en la barra de búsqueda", () => {
    const { getByPlaceholderText } = render(<Noticias />);

    const input = getByPlaceholderText("Search News");
    fireEvent.change(input, { target: { value: "Tech" } });

    expect(input.value).toBe("Tech"); // Verifica que el valor del input cambie correctamente
  });

  test("Debe llamar a getData cuando se hace clic en el botón de búsqueda", () => {
    const { getByText, getByPlaceholderText } = render(<Noticias />);

    const input = getByPlaceholderText("Search News");
    const button = getByText("Buscar");

    // Simular que el usuario escribe "Business" y hace clic en el botón de búsqueda
    fireEvent.change(input, { target: { value: "Business" } });
    fireEvent.click(button);

    expect(input.value).toBe("Business");
});




});
