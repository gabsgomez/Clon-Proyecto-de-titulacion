import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.jsx";

function Formulario() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const selectQuestions = (nivel) => {
    const questions = {
      principiante: [
        {
          pregunta: "¿Qué es un presupuesto y para qué sirve?",
          opciones: [
            "Es una estimación de ingresos y gastos para planificar y gestionar las finanzas.",
            "Es un monto que se utiliza solo para emergencias.",
            "Es el dinero que se gasta en entretenimiento.",
            "Es una herramienta para calcular el interés de un préstamo.",
          ],
          respuesta_correcta:
            "Es una estimación de ingresos y gastos para planificar y gestionar las finanzas.",
        },
        {
          pregunta: "¿Cuál es la diferencia entre un ingreso y un gasto?",
          opciones: [
            "Ingreso es dinero que se paga, gasto es el dinero que se recibe.",
            "Ingreso es el dinero que se guarda, gasto es el dinero que se gasta en vacaciones.",
            "Ingreso es el dinero que se recibe, gasto es el dinero que se paga.",
            "Ingreso es un préstamo y gasto es un ahorro.",
          ],
          respuesta_correcta:
            "Ingreso es el dinero que se recibe, gasto es el dinero que se paga.",
        },
        {
          pregunta: "¿Qué significa 'ahorro' en finanzas personales?",
          opciones: [
            "Es el dinero que se gasta en educación.",
            "Es el dinero que se invierte en la bolsa de valores.",
            "Es el dinero que no se gasta y se guarda para el futuro.",
            "Es el dinero que se destina a pagar deudas.",
          ],
          respuesta_correcta:
            "Es el dinero que no se gasta y se guarda para el futuro.",
        },
        {
          pregunta: "¿Qué es una tarjeta de crédito y cómo funciona?",
          opciones: [
            "Es una herramienta que permite pagar productos con efectivo.",
            "Es una cuenta de ahorros.",
            "Es una herramienta de préstamo que permite comprar ahora y pagar después.",
            "Es una tarjeta para realizar pagos de préstamos.",
          ],
          respuesta_correcta:
            "Es una herramienta de préstamo que permite comprar ahora y pagar después.",
        },
        {
          pregunta: "¿Qué es una inversión?",
          opciones: [
            "Es gastar dinero en bienes de consumo.",
            "Es ahorrar dinero para emergencias.",
            "Es colocar dinero en un activo esperando que aumente su valor en el futuro.",
            "Es solo comprar acciones en la bolsa.",
          ],
          respuesta_correcta:
            "Es colocar dinero en un activo esperando que aumente su valor en el futuro.",
        },
        {
          pregunta:
            "¿Cuál es la diferencia entre una tarjeta de crédito y una de débito?",
          opciones: [
            "La de crédito usa dinero prestado, la de débito usa dinero propio de la cuenta bancaria.",
            "Ambas usan dinero propio de la cuenta bancaria.",
            "La de débito permite pedir préstamos y la de crédito no.",
            "Ambas son iguales pero una tiene más límite que la otra.",
          ],
          respuesta_correcta:
            "La de crédito usa dinero prestado, la de débito usa dinero propio de la cuenta bancaria.",
        },
        {
          pregunta: "¿Qué es una tasa de interés?",
          opciones: [
            "Es el monto total de una inversión.",
            "Es el costo de pedir prestado dinero, expresado en porcentaje sobre el monto prestado.",
            "Es el dinero ganado en un salario mensual.",
            "Es el valor total de una deuda sin pago de intereses.",
          ],
          respuesta_correcta:
            "Es el costo de pedir prestado dinero, expresado en porcentaje sobre el monto prestado.",
        },
        {
          pregunta: "¿Qué significa diversificar una inversión?",
          opciones: [
            "Invertir en un solo tipo de activo.",
            "Distribuir el dinero en diferentes activos para reducir el riesgo.",
            "Solo ahorrar el dinero en una cuenta de banco.",
            "Pedir prestado dinero para invertir.",
          ],
          respuesta_correcta:
            "Distribuir el dinero en diferentes activos para reducir el riesgo.",
        },
        {
          pregunta: "¿Qué es un fondo de emergencia y por qué es importante?",
          opciones: [
            "Es dinero ahorrado para situaciones imprevistas, importante para evitar deudas en caso de emergencias.",
            "Es un tipo de inversión a largo plazo.",
            "Es un préstamo de dinero para emergencias.",
            "Es el dinero destinado solo para vacaciones.",
          ],
          respuesta_correcta:
            "Es dinero ahorrado para situaciones imprevistas, importante para evitar deudas en caso de emergencias.",
        },
        {
          pregunta: "¿Cuál es la diferencia entre valor nominal y valor real?",
          opciones: [
            "El valor nominal ajusta según la inflación, el valor real es el precio sin ajustes.",
            "Ambos son iguales en una economía estable.",
            "El valor nominal es el precio sin ajustes, mientras que el valor real ajusta según factores como la inflación.",
            "No existe diferencia entre valor nominal y real.",
          ],
          respuesta_correcta:
            "El valor nominal es el precio sin ajustes, mientras que el valor real ajusta según factores como la inflación.",
        },
      ],
      intermedio: [
        {
          pregunta: "¿Qué es un activo y un pasivo en finanzas?",
          opciones: [
            "Un activo genera ingresos, mientras que un pasivo representa una deuda u obligación.",
            "Ambos representan ingresos.",
            "Un activo genera deuda, y un pasivo genera ingresos.",
            "Ambos son tipos de inversiones a largo plazo.",
          ],
          respuesta_correcta:
            "Un activo genera ingresos, mientras que un pasivo representa una deuda u obligación.",
        },
        {
          pregunta:
            "¿Qué es el retorno sobre inversión (ROI) y cómo se calcula?",
          opciones: [
            "Es la suma total de todos los ingresos de una empresa.",
            "Es una medida de rendimiento financiero que se calcula dividiendo la ganancia neta entre el costo de inversión.",
            "Es el interés que se paga sobre una deuda.",
            "Es una fórmula para calcular los impuestos sobre las ganancias.",
          ],
          respuesta_correcta:
            "Es una medida de rendimiento financiero que se calcula dividiendo la ganancia neta entre el costo de inversión.",
        },
        {
          pregunta: "¿Qué es la inflación y cómo afecta al poder adquisitivo?",
          opciones: [
            "Es la disminución del valor de los productos.",
            "Es la reducción de impuestos en una economía.",
            "Es el aumento de precios en la economía, que reduce el poder de compra del dinero.",
            "Es el aumento del poder adquisitivo debido a los precios.",
          ],
          respuesta_correcta:
            "Es el aumento de precios en la economía, que reduce el poder de compra del dinero.",
        },
        {
          pregunta:
            "¿Qué es el interés compuesto y cómo difiere del interés simple?",
          opciones: [
            "El interés compuesto calcula intereses solo sobre el capital inicial.",
            "El interés compuesto calcula intereses sobre el capital inicial y los intereses generados.",
            "El interés simple incluye los intereses generados, mientras que el compuesto no.",
            "El interés compuesto se usa solo en créditos hipotecarios.",
          ],
          respuesta_correcta:
            "El interés compuesto calcula intereses sobre el capital inicial y los intereses generados.",
        },
        {
          pregunta: "¿Qué son los fondos mutuos y cómo funcionan?",
          opciones: [
            "Son inversiones colectivas donde muchos inversionistas aportan dinero para comprar una variedad de activos.",
            "Son fondos que se destinan exclusivamente a bienes raíces.",
            "Son cuentas de ahorro con intereses altos.",
            "Son fondos que solo están disponibles en el mercado de divisas.",
          ],
          respuesta_correcta:
            "Son inversiones colectivas donde muchos inversionistas aportan dinero para comprar una variedad de activos.",
        },
        {
          pregunta: "¿Cuál es la diferencia entre liquidez y rentabilidad?",
          opciones: [
            "La liquidez es el beneficio obtenido de una inversión y la rentabilidad es la facilidad de convertir un activo en efectivo.",
            "La rentabilidad es el beneficio obtenido de una inversión, mientras que la liquidez es la facilidad de convertir un activo en efectivo.",
            "Ambos términos se refieren al riesgo de una inversión.",
            "La rentabilidad se refiere a la deuda de un activo, mientras que la liquidez se refiere al ahorro.",
          ],
          respuesta_correcta:
            "La rentabilidad es el beneficio obtenido de una inversión, mientras que la liquidez es la facilidad de convertir un activo en efectivo.",
        },
        {
          pregunta: "¿Qué es un balance general y qué información proporciona?",
          opciones: [
            "Es un estado financiero que muestra los ingresos y gastos de una empresa.",
            "Es una lista de activos y obligaciones de una empresa en un momento específico.",
            "Es un estado financiero que muestra activos, pasivos y patrimonio de una empresa.",
            "Es una lista de inversiones de una empresa en el último año.",
          ],
          respuesta_correcta:
            "Es un estado financiero que muestra activos, pasivos y patrimonio de una empresa.",
        },
        {
          pregunta:
            "¿Qué es la diversificación de riesgo en un portafolio de inversión?",
          opciones: [
            "Es invertir en solo un tipo de activo.",
            "Es una estrategia de invertir en diferentes tipos de activos para reducir el riesgo total.",
            "Es concentrar la inversión en bonos y acciones.",
            "Es pedir préstamos para aumentar las inversiones en el portafolio.",
          ],
          respuesta_correcta:
            "Es una estrategia de invertir en diferentes tipos de activos para reducir el riesgo total.",
        },
        {
          pregunta:
            "¿Qué significa apalancamiento financiero y cuáles son sus riesgos?",
          opciones: [
            "Es usar deuda para financiar inversiones, con el riesgo de aumentar las pérdidas si la inversión falla.",
            "Es obtener un préstamo para uso personal sin riesgo alguno.",
            "Es un tipo de inversión sin riesgo.",
            "Es reducir los activos en una inversión a corto plazo.",
          ],
          respuesta_correcta:
            "Es usar deuda para financiar inversiones, con el riesgo de aumentar las pérdidas si la inversión falla.",
        },
        {
          pregunta: "¿Qué son las acciones y cómo se diferencia de los bonos?",
          opciones: [
            "Las acciones representan propiedad en una empresa, mientras que los bonos son préstamos a una entidad que pagan intereses.",
            "Los bonos representan propiedad en una empresa, mientras que las acciones son préstamos.",
            "Ambos son iguales pero se usan en diferentes empresas.",
            "Las acciones son bonos de bajo riesgo y los bonos son de alto riesgo.",
          ],
          respuesta_correcta:
            "Las acciones representan propiedad en una empresa, mientras que los bonos son préstamos a una entidad que pagan intereses.",
        },
      ],
    };
    const selectedQuestions = questions[nivel];
    const randomIndex = Math.floor(Math.random() * selectedQuestions.length);
    const question = selectedQuestions[randomIndex];
    console.log(question);
    setCurrentQuestion(question);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Formulario</h1>

      <div className="space-y-4 mb-6">
        <button
          onClick={() => selectQuestions("principiante")}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Principiante
        </button>
        <button
          onClick={() => selectQuestions("intermedio")}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          Intermedio
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {currentQuestion ? (
          <>
            <h2 className="text-xl font-semibold mb-4">
              {currentQuestion.pregunta}
            </h2>
            <div className="space-y-3">
              {currentQuestion.opciones.map((opcion, index) => (
                <div
                  key={index}
                  className="p-3 border rounded hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  {opcion}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-gray-600">
              Selecciona un nivel de dificultad para recibir una pregunta
            </p>
          </div>
        )}
      </div>

      {currentQuestion && (
        <button
          onClick={() => setCurrentQuestion(null)}
          className="mt-6 text-blue-500 hover:text-blue-600"
        >
          Volver al inicio
        </button>
      )}
      <div>
        <Link to="/">
          <button className="mt-6 text-blue-500 hover:text-blue-600">
            Regresar
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Formulario;
