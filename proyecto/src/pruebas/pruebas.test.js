// Mock para Axios
jest.mock("axios");

// Mock para MercadoPago
jest.mock("@mercadopago/sdk-react", () => ({
  initMercadoPago: jest.fn(),
  Wallet: jest.fn(),
}));

// Mock useNavigate from react-router-dom
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
   
}));

import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SesionForm from "../components/SesionForm";
import Noticias from "../components/Noticias";
import { screen } from "@testing-library/react";
import Acciones from "../components/acciones";
import Bonos from "../components/bonos";
import Indices from "../components/indices";
import Economias from "../components/economias";
import Futuros from "../components/futuros";
import Fondos from "../components/fondos";
import React from "react";
import Room from "../components/Room";

import { useParams } from 'react-router-dom';
const validations = require("./validations");

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







// Pruebas unitarias de Registro
describe("Pruebas de validación de usuario en authController", () => {
  //
  beforeEach(() => {
    jest.clearAllMocks();  // Limpiar todos los mocks antes de cada prueba
  });
  //
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
  //
  beforeEach(() => {
    jest.clearAllMocks();  // Limpiar todos los mocks antes de cada prueba
  });
  //

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
  //
  beforeEach(() => {
    jest.clearAllMocks();  // Limpiar todos los mocks antes de cada prueba
  });
  //

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

describe("Pruebas de validación de Indicadores de stock", () => {
  //
  beforeEach(() => {
    jest.clearAllMocks();  // Limpiar todos los mocks antes de cada prueba
  });
  //

  //1:
  test("debería cargar widgets de TradingView con los símbolos correctos", () => {
    render(<Acciones />);

    // Selecciona todos los elementos que tienen la clase "widget-box"
    const widgetContainers = document.querySelectorAll(".widget-box");

    // Verificar que se han renderizado 30 widgets
    expect(widgetContainers.length).toBe(30);

    // Verificar que cada contenedor tenga un script de TradingView
    widgetContainers.forEach((container) => {
      expect(container.querySelector("script")).not.toBeNull();
    });
  });
  //2:
  test("debería cargar el widget de TradingView para bonos en el componente TablaBonos", () => {
    const { container } = render(<Bonos />);

    // Verificar que el widget de TradingView fue insertado en el DOM
    const widgetContainer = container.querySelector(
      ".tradingview-widget-container"
    );
    expect(widgetContainer).toBeInTheDocument();

    // Verificar que el script de TradingView fue insertado correctamente
    const scriptElement = widgetContainer.querySelector("script");
    expect(scriptElement).not.toBeNull();
    expect(scriptElement.src).toContain(
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
    );
  });

  //3:
  test("debería cargar 21 widgets de TradingView para índices y un widget de mapa de calor", () => {
    render(<Indices />);

    // Verificar que los 21 widgets de índices se han renderizado
    const widgetContainers = document.querySelectorAll(
      ".tradingview-widget-container"
    );
    expect(widgetContainers.length).toBe(22); // 21 para los índices + 1 para el mapa de calor

    // Verificar que cada widget de índice tiene un script de TradingView
    for (let i = 0; i < 21; i++) {
      const scriptElement = widgetContainers[i].querySelector("script");
      expect(scriptElement).not.toBeNull();
      expect(scriptElement.src).toContain(
        "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js"
      );
    }

    // Verificar que el widget del mapa de calor tiene su script de TradingView
    const heatmapWidget = widgetContainers[21].querySelector("script");
    expect(heatmapWidget).not.toBeNull();
    expect(heatmapWidget.src).toContain(
      "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"
    );
  });

  //4:
  test("debería cargar 21 widgets de TradingView para indicadores económicos y un widget de gráfico avanzado", () => {
    const { container } = render(<Economias />);

    // Verificar que los 21 widgets de indicadores económicos se han renderizado
    const widgetContainers = container.querySelectorAll(
      ".tradingview-widget-container"
    );
    expect(widgetContainers.length).toBe(22); // 21 para los indicadores + 1 para el gráfico avanzado

    // Verificar que cada widget de indicador tiene un script de TradingView
    for (let i = 0; i < 21; i++) {
      const scriptElement = widgetContainers[i].querySelector("script");
      expect(scriptElement).not.toBeNull();
      expect(scriptElement.src).toContain(
        "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js"
      );
    }

    // Verificar que el widget del gráfico avanzado tiene su script de TradingView
    const advancedChartWidget = widgetContainers[21].querySelector("script");
    expect(advancedChartWidget).not.toBeNull();
    expect(advancedChartWidget.src).toContain(
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
    );
  });

  //5:
  test("debería cargar 21 widgets de TradingView para futuros y un widget de tabla de futuros", () => {
    const { container } = render(<Futuros />);

    // Verificar que los 21 widgets de futuros se han renderizado
    const widgetContainers = container.querySelectorAll(
      ".tradingview-widget-container"
    );
    expect(widgetContainers.length).toBe(22); // 21 para los futuros + 1 para la tabla de futuros

    // Verificar que cada widget de futuro tiene un script de TradingView
    for (let i = 0; i < 21; i++) {
      const scriptElement = widgetContainers[i].querySelector("script");
      expect(scriptElement).not.toBeNull();
      expect(scriptElement.src).toContain(
        "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js"
      );
    }

    // Verificar que el widget de tabla de futuros tiene su script de TradingView
    const futuresTableWidget = widgetContainers[21].querySelector("script");
    expect(futuresTableWidget).not.toBeNull();
    expect(futuresTableWidget.src).toContain(
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
    );
  });

  //6:
  test("debería cargar 30 widgets de TradingView para fondos", () => {
    const { container } = render(<Fondos />);

    // Verificar que los 30 widgets de fondos se han renderizado
    const widgetContainers = container.querySelectorAll(
      ".tradingview-widget-container"
    );
    expect(widgetContainers.length).toBe(30); // Deben existir 30 widgets

    // Verificar que cada widget tiene un script de TradingView
    widgetContainers.forEach((container) => {
      const scriptElement = container.querySelector("script");
      expect(scriptElement).not.toBeNull();
      expect(scriptElement.src).toContain(
        "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js"
      );
    });
  });
});

import Chatbot from "../components/ChatBot";

describe("Pruebas de validación de Chatbot", () => {
  //
  beforeEach(() => {
    jest.clearAllMocks();  // Limpiar todos los mocks antes de cada prueba
  });
  //

  //1:
  test("Debería mostrar el menú principal al iniciar el chatbot", () => {
    render(<Chatbot />);
    expect(screen.getByText(/de qué tema tienes dudas/i)).toBeInTheDocument();
    expect(screen.getByText(/1.- Conceptos básicos/i)).toBeInTheDocument();
  });

  //2:
  test("Debería mostrar el submenú de Conceptos Básicos al seleccionar la opción 1", async () => {
    render(<Chatbot />);

    // Simulamos la entrada del usuario para seleccionar "Conceptos Básicos"
    fireEvent.change(screen.getByPlaceholderText(/escribe tu selección/i), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByText(/enviar/i));

    // Usamos findAllByText para obtener todas las ocurrencias de "Conceptos Básicos"
    const conceptMenu = await screen.findAllByText(/Conceptos Básicos/i);

    // Verificamos que exista más de un "Conceptos Básicos" (una del menú principal y otra del submenú)
    expect(conceptMenu.length).toBeGreaterThan(1);

    // Verificamos que el submenú de "Conceptos Básicos" contenga las opciones específicas
    expect(screen.getByText(/Terminología Financiera/i)).toBeInTheDocument();
  });

  //3:
  test("Debería mostrar un mensaje de error para una opción no válida", () => {
    render(<Chatbot />);
    fireEvent.change(screen.getByPlaceholderText(/escribe tu selección/i), {
      target: { value: "99" },
    });
    fireEvent.click(screen.getByText(/enviar/i));
    expect(screen.getByText(/No entendí tu selección/i)).toBeInTheDocument();
  });

  //4:
  test("Debería regresar al menú principal desde el submenú", async () => {
    render(<Chatbot />);

    // Simular la navegación hacia "Conceptos Básicos"
    fireEvent.change(screen.getByPlaceholderText(/escribe tu selección/i), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByText(/enviar/i));

    // Simular la selección de regresar al menú principal
    fireEvent.change(screen.getByPlaceholderText(/escribe tu selección/i), {
      target: { value: "0" },
    });
    fireEvent.click(screen.getByText(/enviar/i));

    // Usar findAllByText para encontrar todas las instancias del texto
    const menuMessages = await screen.findAllByText(
      /de qué tema tienes dudas/i
    );

    // Asegurarse de que el menú principal se ha mostrado nuevamente
    expect(menuMessages.length).toBeGreaterThan(1);

    // Verificar que una de las instancias es visible y corresponde al menú principal actual
    expect(
      screen.getAllByText(/de qué tema tienes dudas/i)[1]
    ).toBeInTheDocument();
  });

  //5:
  test("Debería proporcionar la respuesta correcta para una pregunta seleccionada", () => {
    render(<Chatbot />);

    // Simular la navegación hacia "Conceptos Básicos"
    fireEvent.change(screen.getByPlaceholderText(/escribe tu selección/i), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByText(/enviar/i));

    // Simular la selección de "Terminología Financiera"
    fireEvent.change(screen.getByPlaceholderText(/escribe tu selección/i), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByText(/enviar/i));

    // Simular la selección de "¿Qué es una acción?"
    fireEvent.change(screen.getByPlaceholderText(/escribe tu selección/i), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByText(/enviar/i));

    // Verificar que el chatbot muestra la respuesta correcta
    expect(
      screen.getByText((content, element) =>
        content.includes("Una acción es una unidad de propiedad en una empresa")
      )
    ).toBeInTheDocument();
  });
  //6:

  test("Debería redirigir al usuario a una operadora si no se encuentra la opción", () => {
    render(<Chatbot />);

    // Simular la entrada de una opción no válida (por ejemplo, '99')
    fireEvent.change(screen.getByPlaceholderText(/escribe tu selección/i), {
      target: { value: "99" },
    });
    fireEvent.click(screen.getByText(/enviar/i));

    // Obtener el último mensaje del chatbot
    const mensajes = screen.getAllByText(/Chatbot/i); // Obtener todos los mensajes enviados por el Chatbot
    const ultimoMensaje = mensajes[mensajes.length - 1].nextSibling.innerHTML; // Extraer el contenido del último mensaje

    // Verificar que el último mensaje incluye la referencia a la operadora
    expect(ultimoMensaje).toMatch(/una operadora/i);
  });
});





