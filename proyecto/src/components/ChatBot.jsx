import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ChatBot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { sender: 'Chatbot', text: '¡Hola! ¿De qué tema tienes dudas? Ingresa el número:<br/>1.- Conceptos básicos<br/>2.- Trading<br/>3.- Economía<br/>4.- Finanzas<br/>5.- Plataformas<br/>6.- Asesorías Financieras' }
    ]);

    const [input, setInput] = useState('');
    const [submenu, setSubmenu] = useState(null);
    const [subQuestions, setSubQuestions] = useState(null);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSend = () => {
        const userMessage = { sender: 'Usuario', text: input };
        setMessages([...messages, userMessage]);

        if (input === '0') {
            setMessages([...messages, userMessage, { sender: 'Chatbot', text: '¡Hola! ¿De qué tema tienes dudas? Ingresa el número:<br/>1.- Conceptos básicos<br/>2.- Trading<br/>3.- Economía<br/>4.- Finanzas<br/>5.- Plataformas<br/>6.- Asesorías Financieras' }]);
            setSubmenu(null);
            setSubQuestions(null);
            setInput('');
            return;
        }

        if (submenu === null) {
            switch (input) {
                case '1':
                    setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Conceptos Básicos<br/>0.- Regresar al menú principal.<br/>1.- Terminología Financiera<br/>2.- Instrumentos Financieros<br/>3.- Principios de Inversión' }]);
                    setSubmenu('conceptos_basicos');
                    break;
                case '2':
                    setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Trading<br/>0.- Regresar al menú principal.<br/>1.- Análisis Técnico<br/>2.- Análisis Fundamental<br/>3.- Estrategias de Trading' }]);
                    setSubmenu('trading');
                    break;
                case '3':
                    setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Economía<br/>0.- Regresar al menú principal.<br/>1.- Política Monetaria<br/>2.- Desarrollo Económico<br/>3.- Comercio Internacional' }]);
                    setSubmenu('economia');
                    break;
                case '4':
                    setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Finanzas Personales<br/>0.- Regresar al menú principal.<br/>1.- Presupuesto y Ahorro<br/>2.- Planificación Financiera<br/>3.- Deudas y Crédito' }]);
                    setSubmenu('finanzas_personales');
                    break;
                case '5':
                    setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Plataformas<br/>0.- Regresar al menú principal.<br/>1.- Plataformas de Trading<br/>2.- Plataformas de Crowdfunding' }]);
                    setSubmenu('Plataformas');
                    break;
                case '6':
                    setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Asesorías Financieras<br/>0.- Regresar al menú principal.<br/>1.- Inversiones y Asesoramiento<br/>2.- Asesoría Financiera para Empresas' }]);
                    setSubmenu('Asesorias_Financieras');
                    break;
                default:
                    setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'No entendí tu selección. Por favor, elige una opción válida.' }]);
                    break;
            }
        } else if (subQuestions === null) {
            switch (submenu) {
                case 'conceptos_basicos':
                    if (input === '1') {
                        setMessages([...messages, userMessage, { sender: 'Chatbot', text: '<br/>Terminología Financiera<br/>1.- ¿Qué es una acción?<br/>2.- ¿Qué es un bono?<br/>3.- ¿Qué es un dividendo?<br/>4.- ¿Qué es un ETF?<br/>5.- ¿Qué es un índice bursátil?<br/>6.- ¿Qué es una acción preferente?<br/>7.- ¿Qué es una acción ordinaria?<br/>8.- ¿Qué es un rendimiento?<br/>9.- ¿Qué es un mercado alcista?<br/>10.- ¿Qué es un mercado bajista?' }]);
                        setSubQuestions('terminologia_financiera');
                    }else{
                        if(input === '2'){
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: '<br/>Instrumentos Financieros<br/>1.- ¿Qué es un futuro?<br/>2.- ¿Qué es una opción de compra (call)?<br/>3.- ¿Qué es una opción de venta (put)?<br/>4.- ¿Qué es un contrato de futuros?<br/>5.- ¿Qué es un swap?<br/>6.- ¿Qué es una acción blue-chip?<br/>7.- ¿Qué es un bono corporativo?<br/>8.- ¿Qué es un bono del gobierno?<br/>9.- ¿Qué son los valores respaldados por hipotecas (MBS)?<br/>10.- ¿Qué es un fondo de cobertura (hedge fund)?' }]);
                            setSubQuestions('instrumentos_financieros');
                        }else{
                            if(input==='3'){
                                setMessages([...messages, userMessage, {sender: 'Chatbot', text:'<br/>Principios de Inversión<br/>1.- ¿Qué es la rentabilidad?<br/> 2.- ¿Qué es la diversificación?<br/>3.- ¿Qué es el riesgo de inversión?<br/> 4.- ¿Qué es el horizonte temporal?<br/>5.- ¿Qué es la teoría de la cartera?<br/>6.- ¿Qué es el rendimiento ajustado al riesgo?<br/>7.- ¿Qué es una inversión a largo plazo?<br/>8.- ¿Qué es una inversión a corto plazo?<br/>9.- ¿Qué es el análisis técnico?<br/>10.- ¿Qué es el análisis fundamental?'}]);
                                setSubQuestions('principios_de_inversion');


                            }
                        }
                    }
                    break;
                case 'trading':
                    
                    if (input === '1') {
                        setMessages([...messages, userMessage, { sender: 'Chatbot', text: '<br/>Análisis Técnico<br/>1.- ¿Qué es un gráfico de velas?<br/>2.- ¿Qué es una media móvil?<br/>3.- ¿Qué es el RSI (Relative Strength Index)?<br/>4.- ¿Qué es el MACD (Moving Average Convergence Divergence)?<br/>5.- ¿Qué son los patrones de precios?<br/>6.- ¿Qué es una línea de tendencia?<br/>7.- ¿Qué es una resistencia en análisis técnico?<br/>8.- ¿Qué es un soporte en análisis técnico?<br/>9.- ¿Qué es el volumen de negociación?<br/>10.- ¿Qué es el estocástico?' }]);
                        setSubQuestions('analisis_tecnico');
                    }else{
                        if(input === '2'){
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: '<br/>Análisis Fundamental<br/>1.- ¿Qué es un estado de resultados?<br/>2.- ¿Qué es un balance general?<br/>3.- ¿Qué es el flujo de efectivo?<br/>4.- ¿Qué son los ratios financieros?<br/>5.- ¿Qué es la capitalización bursátil?<br/>6.- ¿Qué es el P/E ratio (Price-to-Earnings Ratio)?<br/>7.- ¿Qué es el EBITDA?<br/>8.- ¿Qué es el ROE (Return on Equity)?<br/>9.- ¿Qué es el ROA (Return on Assets)?<br/>10.- ¿Qué es el margen de beneficio?' }]);
                            setSubQuestions('analisis_fundamental');
                        }else{
                            if(input==='3'){
                                setMessages([...messages, userMessage, {sender: 'Chatbot', text:'<br/>Estrategias de Trading<br/>1.- ¿Qué es el day trading?<br/> 2.- ¿Qué es el swing trading?<br/>3.- ¿Qué es el trading de tendencias?<br/> 4.- ¿Qué es el trading basado en noticias?<br/>5.- ¿Qué es un stop-loss?<br/>6.- ¿Qué es un take-profit?<br/>7.- ¿Qué es el scalping?<br/>8.- ¿Qué es una estrategia de ruptura (breakout)?<br/>9.- ¿Qué es un análisis de volatilidad?<br/>10.- ¿Qué es una operación apalancada?'}]);
                                setSubQuestions('estrategias_de_trading');


                            }
                        }
                    }
                    break;

                case 'economia':
                    if (input === '1') {
                        setMessages([...messages, userMessage, { sender: 'Chatbot', text: '<br/>Política monetaria<br/>1.- ¿Qué es la política monetaria?<br/>2.- ¿Cuál es el objetivo principal de la política monetaria?<br/>3.- ¿Qué herramientas utiliza el banco central en la política monetaria?<br/>4.- ¿Cómo afecta la política monetaria a la economía?<br/>5.- ¿Qué es una política monetaria expansiva?<br/>6.- ¿Qué es una política monetaria restrictiva?<br/>7.- ¿Cómo se relaciona la política monetaria con la inflación?<br/>8.- ¿Qué es la tasa de interés de referencia?<br/>9.- ¿Cómo afecta la política monetaria a los tipos de cambio?<br/>10.- ¿Qué es la curva de Phillips?' }]);
                        setSubQuestions('politica_monetaria');
                    }else{
                        if(input === '2'){
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: '<br/>Desarrollo económico<br/>1.- ¿Qué es el desarrollo económico?<br/>2.- ¿Qué indicadores se utilizan para medir el desarrollo económico?<br/>3.- ¿Cuál es la diferencia entre crecimiento económico y desarrollo económico?<br/>4.- ¿Qué papel juega la educación en el desarrollo económico?<br/>5.- ¿Cómo afecta la infraestructura al desarrollo económico?<br/>6.- ¿Qué es el capital humano?<br/>7.- ¿Qué es la sostenibilidad en el desarrollo económico?<br/>8.- ¿Cómo influye la política fiscal en el desarrollo económico?<br/>9.- ¿Qué es la desigualdad económica?<br/>10.- ¿Qué es el desarrollo inclusivo?' }]);
                            setSubQuestions('desarrollo_economico');
                        }else{
                            if(input==='3'){
                                setMessages([...messages, userMessage, {sender: 'Chatbot', text:'<br/>Comercio Internacional<br/>1.- ¿Qué es el comercio internacional?<br/> 2.- ¿Cuál es la diferencia entre exportación e importación?<br/>3.- ¿Qué es un arancel?<br/>4.- ¿Qué es la balanza comercial?<br/>5.- ¿Qué es el proteccionismo?<br/>6.- ¿Qué es el libre comercio?<br/>7.- ¿Qué es un acuerdo de libre comercio (TLC)?<br/>8.- ¿Qué es la globalización?<br/>9.- ¿Cómo afectan las tasas de cambio al comercio internacional?<br/>10.- ¿Qué es el dumping?'}]);
                                setSubQuestions('comercio_internacional');


                            }
                        }
                    }
                break;

                case 'finanzas_personales':
                    if (input === '1') {
                        setMessages([...messages, userMessage, { sender: 'Chatbot', text: '<br/>Presupuesto y Ahorro<br/>1.- ¿Qué es un presupuesto?<br/>2.- ¿Cómo hacer un presupuesto personal?<br/>3.- ¿Qué es un fondo de emergencia?<br/>4.- ¿Cuánto debería ahorrar de mis ingresos?<br/>5.- ¿Qué es el ahorro automático?<br/>6.- ¿Qué es una meta de ahorro?<br/>7.- ¿Qué es una cuenta de ahorros?<br/>8.- ¿Cómo reducir gastos en el presupuesto?<br/>9.- ¿Qué es un gasto fijo?<br/>10.- ¿Qué es un gasto variable?' }]);
                        setSubQuestions('presupuesto_y_ahorro');
                    }else{
                        if(input === '2'){
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: '<br/>Planificación Financiera<br/>1.- ¿Qué es la planificación financiera?<br/>2.- ¿Qué es una meta financiera?<br/>3.- ¿Cómo crear un plan de jubilación?<br/>4.- ¿Qué es un plan de inversiones?<br/>5.- ¿Qué es un seguro de vida?<br/>6.- ¿Qué es un seguro de salud?<br/>7.- ¿Qué es un plan de ahorro para la educación?<br/>8.- ¿Cómo establecer un fondo para la jubilación?<br/>9.- ¿Qué es un testamento?<br/>10.- ¿Qué es la planificación patrimonial?' }]);
                            setSubQuestions('planificacion_financiera');
                        }else{
                            if(input==='3'){
                                setMessages([...messages, userMessage, {sender: 'Chatbot', text:'<br/>Deuda y Crédito<br/>1.- ¿Qué es una tarjeta de crédito?<br/> 2.- ¿Qué es una tasa de interés?<br/>3.- ¿Qué es el crédito disponible?<br/> 4.- ¿Cómo afecta el puntaje de crédito a los préstamos?<br/>5.- ¿Qué es una deuda consolidada?<br/>6.- ¿Qué es un préstamo personal?<br/>7.- ¿Qué es un préstamo con garantía?<br/>8.- ¿Qué es un préstamo sin garantía?<br/>9.- ¿Qué es el interés compuesto?<br/>10.- ¿Cómo manejar una deuda?'}]);
                                setSubQuestions('deudas_y_credito');


                            }
                        }
                    }
                break;

                case 'Plataformas':
                    if (input === '1') {
                        setMessages([...messages, userMessage, { sender: 'Chatbot', text: '<br/>Plataformas de Trading<br/>1.- ¿Qué es una plataforma de trading?<br/>2.- ¿Cuáles son algunas de las plataformas de trading más populares?<br/>3.- ¿Qué características debe tener una buena plataforma de trading?<br/>4.- ¿Qué es el apalancamiento en una plataforma de trading?<br/>5.- ¿Cómo afecta la latencia a una plataforma de trading?<br/>6.- ¿Qué es una cuenta demo en una plataforma de trading?<br/>7.- ¿Qué es un stop-loss en una plataforma de trading?<br/>8.- ¿Qué es el trading algorítmico?<br/>9.- ¿Qué tipos de órdenes se pueden ejecutar en una plataforma de trading?<br/>10.- ¿Qué es una API en el contexto de plataformas de trading?' }]);
                        setSubQuestions('Plataformas_de_Trading');
                    }else{
                        if(input === '2'){
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: '<br/>Plataformas de Crowdfunding<br/>1.- ¿Qué es una plataforma de crowdfunding?<br/>2.- ¿Cuáles son las principales plataformas de crowdfunding?<br/>3.- ¿Qué tipos de crowdfunding existen?<br/>4.- ¿Qué es el crowdfunding de capital?<br/>5.- ¿Cómo funciona el crowdfunding de recompensas?<br/>6.- ¿Qué es el crowdfunding de donaciones?<br/>7.- ¿Cómo afecta el riesgo a los inversores en plataformas de crowdfunding?<br/>8.- ¿Qué es una campaña de crowdfunding?<br/>9.- ¿Cómo puede una empresa promover su campaña de crowdfunding?<br/>10.- ¿Qué factores contribuyen al éxito de una campaña de crowdfunding?' }]);
                            setSubQuestions('Plataformas_de_Crowdfunding');
                        }
                    }
                break;

                case 'Asesorias_Financieras':
                    if (input === '1') {
                        setMessages([...messages, userMessage, { sender: 'Chatbot', text: '<br/>Inversiones y Asesoramiento<br/>1.- ¿Qué es una asesoría financiera en inversiones?<br/>2.- ¿Cuál es la diferencia entre un asesor financiero y un corredor de bolsa?<br/>3.- ¿Qué es el perfil de riesgo en inversiones?<br/>4.- ¿Qué es la estrategia de inversión pasiva?<br/>5.- ¿Qué es la diversificación en inversiones?<br/>6.- ¿Qué tipos de activos se pueden incluir en una cartera de inversiones?<br/>7.- ¿Cómo afectan los impuestos a las inversiones?<br/>8.- ¿Qué es el reequilibrio de una cartera de inversiones?<br/>9.- ¿Qué son las comisiones de asesoría financiera?<br/>10.- ¿Qué es la planificación fiscal en el contexto de inversiones?' }]);
                        setSubQuestions('Inversiones_y_Asesoramiento');
                    }else{
                        if(input === '2'){
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: '<br/>Asesoría Financiera para Empresas<br/>1.- ¿Qué es la asesoría financiera para empresas?<br/>2.- ¿Qué áreas cubre la asesoría financiera para empresas?<br/>3.- ¿Por qué es importante la asesoría financiera para pequeñas empresas?<br/>4.- ¿Qué es la evaluación financiera de una empresa?<br/>5.- ¿Qué es el apalancamiento financiero en una empresa?<br/>6.- ¿Cómo puede la asesoría financiera ayudar en la expansión de un negocio?<br/>7.- ¿Qué es el análisis de costo-beneficio?<br/>8.- ¿Qué son los ratios financieros y cómo se utilizan?<br/>9.- ¿Cómo afecta la gestión del riesgo a una empresa?<br/>10.- ¿Qué es la planificación presupuestaria en una empresa?' }]);
                            setSubQuestions('Asesoria_Financiera_para_Empresas');
                        }
                    }
                break;

                

                default:
                    setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Opción no válida en el submenú. Por favor, elige una opción válida.' }]);
                    break;
            }
        } else {
            switch (subQuestions) {
                case 'terminologia_financiera':
                    switch (input) {
                        case '1':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Una acción es una unidad de propiedad en una empresa, que otorga al accionista derechos sobre parte de sus ganancias y activos.' }]);
                            break;
                        case '2':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un bono es un instrumento de deuda emitido por una empresa o gobierno que paga intereses periódicos y devuelve el principal al vencimiento.' }]);
                            break;
                        case '3':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un dividendo es una distribución de ganancias de una empresa a sus accionistas, generalmente en forma de efectivo o acciones adicionales.' }]);
                            break;
                        case '4':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un ETF (Exchange-Traded Fund) es un fondo de inversión que se cotiza en bolsa y contiene una variedad de activos como acciones, bonos o materias primas.' }]);
                            break;
                        case '5':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un índice bursátil mide el rendimiento de un grupo de acciones, representando el comportamiento general del mercado, como el S&P 500 o el Dow Jones.' }]);
                            break;
                        case '6':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Una acción preferente otorga a su titular prioridad sobre los accionistas comunes en el pago de dividendos y en caso de liquidación.' }]);
                            break;
                        case '7':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Una acción ordinaria otorga derechos de propiedad en la empresa y un voto en las decisiones corporativas, pero los dividendos no están garantizados.' }]);
                            break;
                        case '8':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El rendimiento es la ganancia o pérdida generada por una inversión, expresada como un porcentaje del capital invertido.' }]);
                            break;
                        case '9':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un mercado alcista es un período en el que los precios de las acciones están en aumento constante.' }]);
                            break;
                        case '10':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un mercado bajista es un período en el que los precios de las acciones están en descenso constante.' }]);
                            break;
                        
                        default:
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'No entendí tu selección. Por favor, elige una opción válida.' }]);
                            break;
                    }
                    break;
                    case 'instrumentos_financieros':
                        switch (input) {
                            case '1':
                                setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un futuro es un contrato para comprar o vender un activo a un precio específico en una fecha futura.' }]);
                                break;
                            case '2':
                                setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Una opción de compra da al comprador el derecho, pero no la obligación, de comprar un activo a un precio fijo antes de una fecha determinada.' }]);
                                break;
                            case '3':
                                setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Una opción de venta da al comprador el derecho, pero no la obligación, de vender un activo a un precio fijo antes de una fecha determinada.' }]);
                                break;
                            case '4':
                                setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un contrato de futuros es un acuerdo para comprar o vender un activo a un precio predeterminado en una fecha futura.' }]);
                                break;
                            case '5':
                                setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un swap es un acuerdo financiero en el que dos partes intercambian flujos de efectivo basados en diferentes condiciones, como tasas de interés o monedas.' }]);
                                break;
                            case '6':
                                setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Una acción blue-chip es una acción de una empresa grande, estable y financieramente sólida con un historial de rendimiento confiable.' }]);
                                break;
                            case '7':
                                setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un bono corporativo es una deuda emitida por una empresa que paga intereses a intervalos regulares y devuelve el principal al vencimiento.' }]);
                                break;
                            case '8':
                                setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un bono del gobierno es un instrumento de deuda emitido por el gobierno para financiar sus actividades, con pagos de intereses periódicos.' }]);
                                break;
                            case '9':
                                setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Los MBS son instrumentos financieros respaldados por una serie de hipotecas residenciales o comerciales.' }]);
                                break;
                            case '10':
                                setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un hedge fund es un fondo de inversión que utiliza diversas estrategias para obtener altos rendimientos, a menudo con menos regulación que los fondos mutuos.' }]);
                                break;
                            
                            default:
                                setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'No entendí tu selección. Por favor, elige una opción válida.' }]);
                                break;
                        }
                        break;

                        case 'principios_de_inversion':
                    switch (input) {
                        case '1':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'La rentabilidad es el retorno generado por una inversión en relación con su costo, expresado en porcentaje.' }]);
                            break;
                        case '2':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'La diversificación es una estrategia de inversión que consiste en distribuir el capital en diferentes activos para reducir el riesgo.' }]);
                            break;
                        case '3':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El riesgo de inversión es la posibilidad de que una inversión no genere el retorno esperado o que se pierda parte o todo el capital invertido.' }]);
                            break;
                        case '4':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El horizonte temporal es el período durante el cual se planea mantener una inversión antes de necesitar el dinero.' }]);
                            break;
                        case '5':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'La teoría de la cartera es un enfoque para construir una cartera de inversiones que maximiza el retorno esperado para un nivel dado de riesgo.' }]);
                            break;
                        case '6':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El rendimiento ajustado al riesgo mide la rentabilidad de una inversión en relación con el nivel de riesgo asumido.' }]);
                            break;
                        case '7':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Una inversión a largo plazo es una inversión que se mantiene durante un período prolongado, generalmente más de cinco años.' }]);
                            break;
                        case '8':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Una inversión a corto plazo es una inversión que se espera que se mantenga durante menos de un año.' }]);
                            break;
                        case '9':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El análisis técnico es el estudio de los precios pasados y patrones de gráficos para predecir futuros movimientos de precios.' }]);
                            break;
                        case '10':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El análisis fundamental evalúa el valor intrínseco de una inversión basándose en factores económicos y financieros.' }]);
                            break;
                        
                        default:
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'No entendí tu selección. Por favor, elige una opción válida.' }]);
                            break;
                    }
                    break;
                    case 'analisis_tecnico':
                    switch (input) {
                        case '1':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un gráfico de velas muestra la apertura, cierre, máximo y mínimo del precio de un activo durante un período determinado.' }]);
                            break;
                        case '2':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Una media móvil es un indicador que suaviza los datos de precios para identificar tendencias y patrones en un gráfico.' }]);
                            break;
                        case '3':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El RSI es un indicador que mide la velocidad y el cambio de los movimientos de precios para identificar condiciones de sobrecompra o sobreventa.' }]);
                            break;
                        case '4':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El MACD es un indicador que muestra la relación entre dos medias móviles de un activo y ayuda a identificar cambios en la dirección de la tendencia.' }]);
                            break;
                        case '5':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Los patrones de precios son formaciones en los gráficos que los traders usan para prever futuros movimientos de precios basándose en comportamientos históricos.' }]);
                            break;
                        case '6':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Una línea de tendencia es una línea recta que conecta los puntos altos o bajos en un gráfico para identificar la dirección de la tendencia.' }]);
                            break;
                        case '7':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Una resistencia es un nivel de precio en el que un activo ha tenido dificultades para superar en el pasado.' }]);
                            break;
                        case '8':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un soporte es un nivel de precio en el que un activo encuentra demanda y tiende a detener su caída.' }]);
                            break;
                        case '9':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El volumen de negociación es la cantidad de acciones o contratos que se han negociado durante un período específico.' }]);
                            break;
                        case '10':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El estocástico es un indicador que compara el precio de cierre de un activo con su rango de precios durante un período específico para identificar condiciones de sobrecompra o sobreventa.' }]);
                            break;
                        
                        default:
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'No entendí tu selección. Por favor, elige una opción válida.' }]);
                            break;
                    }
                    break;
                    case 'analisis_fundamental':
                    switch (input) {
                        case '1':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un estado de resultados muestra los ingresos, gastos y beneficios de una empresa durante un período específico.' }]);
                            break;
                        case '2':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un balance general presenta la situación financiera de una empresa en un momento dado, mostrando sus activos, pasivos y patrimonio neto.' }]);
                            break;
                        case '3':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El flujo de efectivo muestra las entradas y salidas de dinero en una empresa durante un período específico.' }]);
                            break;
                        case '4':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Los ratios financieros son cálculos que comparan diferentes cifras de los estados financieros para evaluar el rendimiento y la salud de una empresa.' }]);
                            break;
                        case '5':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'La capitalización bursátil es el valor total de mercado de todas las acciones en circulación de una empresa.' }]);
                            break;
                        case '6':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El P/E ratio compara el precio de una acción con las ganancias por acción, utilizado para valorar la empresa en relación con sus ganancias.' }]);
                            break;
                        case '7':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) mide las ganancias de una empresa antes de intereses, impuestos, depreciación y amortización.' }]);
                            break;
                        case '8':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'ROE es una medida de la rentabilidad de una empresa en relación con el capital invertido por los accionistas.' }]);
                            break;
                        case '9':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'ROA mide la rentabilidad de una empresa en relación con sus activos totales.' }]);
                            break;
                        case '10':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El margen de beneficio es el porcentaje de ingresos que queda como ganancia después de deducir todos los costos y gastos.' }]);
                            break;
                        
                        default:
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'No entendí tu selección. Por favor, elige una opción válida.' }]);
                            break;
                    }
                    break;
                    case 'estrategias_de_trading':
                    switch (input) {
                        case '1':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El day trading es una estrategia en la que se compran y venden activos dentro del mismo día para aprovechar fluctuaciones de precios a corto plazo.' }]);
                            break;
                        case '2':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El swing trading busca capturar movimientos de precios a corto o medio plazo, manteniendo posiciones durante varios días o semanas.' }]);
                            break;
                        case '3':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El trading de tendencias implica seguir la dirección general del mercado, comprando en mercados alcistas y vendiendo en mercados bajistas.' }]);
                            break;
                        case '4':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El trading basado en noticias utiliza eventos económicos y políticos para tomar decisiones de inversión, aprovechando la volatilidad que pueden causar.' }]);
                            break;
                        case '5':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un stop-loss es una orden para vender un activo cuando su precio cae a un nivel predeterminado, limitando las pérdidas.' }]);
                            break;
                        case '6':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un take-profit es una orden para vender un activo cuando su precio alcanza un nivel predeterminado, asegurando ganancias.' }]);
                            break;
                        case '7':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El scalping es una estrategia que implica realizar muchas operaciones de corta duración para obtener pequeñas ganancias repetidamente.' }]);
                            break;
                        case '8':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Una estrategia de ruptura busca operar cuando el precio de un activo rompe un nivel de soporte o resistencia clave, indicando un cambio en la tendencia.' }]);
                            break;
                        case '9':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El análisis de volatilidad mide la variación en el precio de un activo para evaluar el riesgo y la posible amplitud de movimientos futuros.' }]);
                            break;
                        case '10':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Una operación apalancada utiliza capital prestado para aumentar el tamaño de la posición y potencialmente amplificar las ganancias (o pérdidas).' }]);
                            break;
                        
                        default:
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'No entendí tu selección. Por favor, elige una opción válida.' }]);
                            break;
                    }
                    break;

                    case 'politica_monetaria':
                    switch (input) {
                        case '1':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es el conjunto de acciones que toma un banco central para controlar la oferta de dinero y las tasas de interés.' }]);
                            break;
                        case '2':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Mantener la estabilidad de precios y controlar la inflación.                            ' }]);
                            break;
                        case '3':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Tasas de interés, operaciones de mercado abierto, y requisitos de reservas.' }]);
                            break;
                        case '4':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Afecta el costo del crédito, la inversión, el consumo, y la inflación.' }]);
                            break;
                        case '5':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es una política que busca aumentar la oferta de dinero y reducir las tasas de interés para estimular la economía.' }]);
                            break;
                        case '6':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es una política que busca reducir la oferta de dinero y aumentar las tasas de interés para controlar la inflación.' }]);
                            break;
                        case '7':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Al controlar la oferta de dinero, el banco central puede influir en la inflación.' }]);
                            break;
                        case '8':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es la tasa que establece el banco central y que sirve de referencia para otras tasas de interés en la economía.' }]);
                            break;
                        case '9':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Las tasas de interés más altas pueden atraer capital extranjero, apreciando la moneda local.' }]);
                            break;
                        case '10':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es una representación gráfica que muestra la relación inversa entre la inflación y el desempleo.' }]);
                            break;
                        
                        default:
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'No entendí tu selección. Por favor, elige una opción válida.' }]);
                            break;
                    }
                    break;

                    case 'desarrollo_economico':
                    switch (input) {
                        case '1':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es el proceso de mejora en las condiciones económicas y de vida de una población.' }]);
                            break;
                        case '2':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'PIB per cápita, índice de desarrollo humano (IDH), y tasa de pobreza.' }]);
                            break;
                        case '3':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El crecimiento se refiere al aumento del PIB, mientras que el desarrollo abarca mejoras en la calidad de vida.' }]);
                            break;
                        case '4':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'La educación mejora la productividad y la capacidad de innovación, impulsando el desarrollo.' }]);
                            break;
                        case '5':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Una infraestructura adecuada facilita el comercio, la movilidad, y la productividad.' }]);
                            break;
                        case '6':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es el valor económico de las habilidades, conocimientos, y experiencia de la fuerza laboral.' }]);
                            break;
                        case '7':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es el desarrollo que satisface las necesidades actuales sin comprometer las capacidades de futuras generaciones.' }]);
                            break;
                        case '8':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'A través del gasto público y los impuestos, puede influir en la inversión y la redistribución de la riqueza.' }]);
                            break;
                        case '9':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es la disparidad en la distribución de ingresos y recursos entre diferentes grupos de la sociedad.                            ' }]);
                            break;
                        case '10':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es un enfoque del desarrollo que busca garantizar que los beneficios económicos lleguen a todos los segmentos de la población.' }]);
                            break;
                        
                        default:
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'No entendí tu selección. Por favor, elige una opción válida.' }]);
                            break;
                    }
                    break;

                    case 'comercio_internacional':
                    switch (input) {
                        case '1':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es el intercambio de bienes, servicios, y capital entre diferentes países.' }]);
                            break;
                        case '2':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'La exportación es la venta de bienes a otro país, mientras que la importación es la compra de bienes de otro país.' }]);
                            break;
                        case '3':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es un impuesto sobre las importaciones que los gobiernos imponen para proteger industrias locales.' }]);
                            break;
                        case '4':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es la diferencia entre el valor de las exportaciones y las importaciones de un país.' }]);
                            break;
                        case '5':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es una política económica que busca restringir las importaciones para proteger la industria local.                            ' }]);
                            break;
                        case '6':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es la eliminación de barreras al comercio entre países para permitir un intercambio sin restricciones.' }]);
                            break;
                        case '7':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es un tratado entre dos o más países para reducir o eliminar barreras comerciales entre ellos.' }]);
                            break;
                        case '8':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es el proceso de integración económica, cultural, y política a nivel mundial.' }]);
                            break;
                        case '9':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un tipo de cambio más bajo puede hacer que las exportaciones sean más competitivas en el mercado internacional.' }]);
                            break;
                        case '10':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es la práctica de vender productos en el extranjero a un precio inferior al costo de producción para ganar cuota de mercado.' }]);
                            break;
                        
                        default:
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'No entendí tu selección. Por favor, elige una opción válida.' }]);
                            break;
                    }
                    break;

                    case 'presupuesto_y_ahorro':
                    switch (input) {
                        case '1':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un presupuesto es un plan financiero que detalla cómo se deben asignar los ingresos a diferentes gastos y ahorros durante un período.' }]);
                            break;
                        case '2':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Para hacer un presupuesto personal, se deben listar todos los ingresos y gastos, establecer categorías de gasto, y ajustar el presupuesto para equilibrar ingresos y gastos.' }]);
                            break;
                        case '3':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un fondo de emergencia es una reserva de dinero guardado para cubrir gastos imprevistos o emergencias, como pérdida de empleo o gastos médicos.' }]);
                            break;
                        case '4':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Se recomienda ahorrar al menos el 20% de los ingresos, aunque esta cifra puede variar según las necesidades y objetivos financieros individuales.' }]);
                            break;
                        case '5':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El ahorro automático es una técnica en la que una parte del ingreso se transfiere automáticamente a una cuenta de ahorros o inversión.' }]);
                            break;
                        case '6':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Una meta de ahorro es un objetivo específico que se establece para ahorrar una cantidad determinada de dinero para un propósito particular, como unas vacaciones o una compra importante.' }]);
                            break;
                        case '7':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Una cuenta de ahorros es una cuenta bancaria que acumula intereses sobre el dinero depositado y permite acceso a los fondos cuando sea necesario.' }]);
                            break;
                        case '8':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Para reducir gastos, se pueden identificar y eliminar gastos innecesarios, comparar precios y buscar ofertas, y ajustar el presupuesto según las prioridades.' }]);
                            break;
                        case '9':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un gasto fijo es un gasto recurrente que no cambia con el tiempo, como el alquiler o los pagos de una hipoteca.' }]);
                            break;
                        case '10':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un gasto variable es un gasto que puede cambiar de un mes a otro, como las compras de alimentos o el entretenimiento.' }]);
                            break;
                        
                        default:
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'No entendí tu selección. Por favor, elige una opción válida.' }]);
                            break;
                    }
                    break;

                    case 'planificacion_financiera':
                    switch (input) {
                        case '1':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'La planificación financiera es el proceso de establecer objetivos financieros, crear un plan para alcanzarlos y gestionar los recursos financieros de manera eficiente.' }]);
                            break;
                        case '2':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Una meta financiera es un objetivo específico relacionado con el manejo de dinero, como ahorrar para una casa, pagar deudas o planificar la jubilación.' }]);
                            break;
                        case '3':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Para crear un plan de jubilación, se deben establecer metas de jubilación, calcular las necesidades futuras, y desarrollar un plan de ahorro e inversión para alcanzar esas metas.' }]);
                            break;
                        case '4':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un plan de inversiones es una estrategia que define cómo se invertirán los fondos para alcanzar objetivos financieros específicos, como el crecimiento del capital o la generación de ingresos.' }]);
                            break;
                        case '5':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un seguro de vida proporciona un beneficio monetario a los beneficiarios en caso de fallecimiento del asegurado, ayudando a cubrir gastos y mantener la estabilidad financiera.' }]);
                            break;
                        case '6':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un seguro de salud cubre los gastos médicos y hospitalarios, proporcionando protección financiera contra costos imprevistos de atención médica.' }]);
                            break;
                        case '7':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un plan de ahorro para la educación es una cuenta o inversión diseñada para acumular fondos para los gastos educativos futuros, como la matrícula universitaria.' }]);
                            break;
                        case '8':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Para establecer un fondo para la jubilación, se debe determinar cuánto se necesita, elegir un tipo de cuenta de jubilación, y contribuir regularmente a lo largo del tiempo.' }]);
                            break;
                        case '9':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un testamento es un documento legal que especifica cómo se deben distribuir los activos y propiedades de una persona después de su fallecimiento.' }]);
                            break;
                        case '10':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'La planificación patrimonial es el proceso de organizar y gestionar los activos y pasivos para maximizar el valor del patrimonio y facilitar la transferencia a los herederos.' }]);
                            break;
                        
                        default:
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'No entendí tu selección. Por favor, elige una opción válida.' }]);
                            break;
                    }
                    break;

                    case 'deudas_y_credito':
                    switch (input) {
                        case '1':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Una tarjeta de crédito permite a los usuarios pedir prestado dinero hasta un límite determinado para realizar compras y pagar más tarde con intereses si no se paga el saldo completo.' }]);
                            break;
                        case '2':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'La tasa de interés es el costo del préstamo, expresado como un porcentaje del monto prestado, que se paga a lo largo del tiempo.' }]);
                            break;
                        case '3':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El crédito disponible es el monto máximo que se puede pedir prestado en una tarjeta de crédito o línea de crédito.' }]);
                            break;
                        case '4':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un puntaje de crédito alto puede facilitar la aprobación de préstamos y obtener mejores tasas de interés, mientras que un puntaje bajo puede dificultar la aprobación y aumentar los costos.                            ' }]);
                            break;
                        case '5':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'La deuda consolidada es un préstamo que agrupa varias deudas en una sola, a menudo con una tasa de interés más baja.' }]);
                            break;
                        case '6':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un préstamo personal es un tipo de crédito que se otorga para diversos fines, con un monto fijo, tasa de interés y plazo de pago establecido.' }]);
                            break;
                        case '7':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un préstamo con garantía requiere que el prestatario ofrezca un activo como colateral para asegurar el préstamo, como una casa o un automóvil.' }]);
                            break;
                        case '8':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un préstamo sin garantía no requiere colateral, y el prestatario se basa en su crédito para obtener el préstamo.' }]);
                            break;
                        case '9':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'El interés compuesto es el interés calculado sobre el capital inicial y también sobre los intereses acumulados de períodos anteriores.' }]);
                            break;
                        case '10':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Para manejar una deuda, se recomienda pagar más que el mínimo, priorizar las deudas con tasas de interés más altas, y buscar asesoramiento financiero si es necesario.' }]);
                            break;
                        
                        default:
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'No entendí tu selección. Por favor, elige una opción válida.' }]);
                            break;
                    }
                    break;

                    case 'Plataformas_de_Trading':
                    switch (input) {
                        case '1':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es un software que permite a los traders comprar y vender activos financieros en tiempo real.' }]);
                            break;
                        case '2':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'MetaTrader, TradingView, y Thinkorswim son algunas de las plataformas más conocidas.' }]);
                            break;
                        case '3':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Debe ofrecer gráficos avanzados, ejecución rápida de órdenes, integración con indicadores técnicos, y herramientas de gestión de riesgo.                            ' }]);
                            break;
                        case '4':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es el uso de fondos prestados para aumentar la exposición en el mercado con una inversión inicial relativamente pequeña.' }]);
                            break;
                        case '5':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Una alta latencia puede causar retrasos en la ejecución de órdenes, afectando negativamente los resultados de trading.' }]);
                            break;
                        case '6':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es una cuenta que permite practicar trading con dinero virtual, ideal para aprender sin riesgo financiero.' }]);
                            break;
                        case '7':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es una orden predefinida que cierra automáticamente una posición cuando el precio alcanza un nivel especificado para limitar pérdidas.' }]);
                            break;
                        case '8':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es el uso de algoritmos para ejecutar órdenes de trading automáticamente basado en criterios predeterminados.' }]);
                            break;
                        case '9':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Órdenes de mercado, órdenes limitadas, stop-loss, y órdenes stop-limit son algunos ejemplos.                            ' }]);
                            break;
                        case '10':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es una interfaz que permite a los traders programar y automatizar operaciones a través de la plataforma de trading.' }]);
                            break;
                        
                        default:
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'No entendí tu selección. Por favor, elige una opción válida.' }]);
                            break;
                    }
                    break;

                    case 'Plataformas_de_Crowdfunding':
                    switch (input) {
                        case '1':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es un sitio web donde los emprendedores pueden recaudar fondos de un gran número de personas para financiar sus proyectos.' }]);
                            break;
                        case '2':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Kickstarter, Indiegogo, y GoFundMe son algunas de las más populares.' }]);
                            break;
                        case '3':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Recompensas, donaciones, capital, y préstamos son los tipos más comunes.' }]);
                            break;
                        case '4':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es un tipo de crowdfunding donde los inversores reciben acciones de la empresa a cambio de su inversión.' }]);
                            break;
                        case '5':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Los inversores reciben un producto o servicio a cambio de su contribución, sin recibir participación en la empresa.' }]);
                            break;
                        case '6':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es una forma de recaudar fondos para causas benéficas, donde los donantes no esperan nada a cambio.' }]);
                            break;
                        case '7':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Los proyectos pueden fracasar, lo que podría resultar en la pérdida total del capital invertido.' }]);
                            break;
                        case '8':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es el período durante el cual un proyecto intenta recaudar fondos a través de una plataforma de crowdfunding.' }]);
                            break;
                        case '9':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Utilizando redes sociales, marketing digital, y relaciones públicas para llegar a más personas.' }]);
                            break;
                        case '10':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un plan de negocio sólido, un video convincente, recompensas atractivas, y una promoción efectiva.                            ' }]);
                            break;
                        
                        default:
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'No entendí tu selección. Por favor, elige una opción válida.' }]);
                            break;
                    }
                    break;

                    case 'Inversiones_y_Asesoramiento':
                    switch (input) {
                        case '1':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es el servicio de un experto que te ayuda a tomar decisiones de inversión informadas y alineadas con tus objetivos financieros.' }]);
                            break;
                        case '2':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Un asesor financiero ofrece planificación integral, mientras que un corredor ejecuta órdenes de compra y venta de acciones.' }]);
                            break;
                        case '3':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es la evaluación de la capacidad y disposición de un inversor para asumir riesgos en su cartera de inversiones.' }]);
                            break;
                        case '4':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es una estrategia que implica invertir en índices o fondos a largo plazo sin realizar ajustes frecuentes.' }]);
                            break;
                        case '5':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es la práctica de distribuir tus inversiones entre diferentes activos para reducir el riesgo general.' }]);
                            break;
                        case '6':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Acciones, bonos, bienes raíces, fondos mutuos, y ETF son algunos ejemplos.' }]);
                            break;
                        case '7':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Los impuestos pueden reducir los rendimientos netos de tus inversiones, lo que requiere planificación para minimizar el impacto fiscal.' }]);
                            break;
                        case '8':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es el proceso de ajustar la composición de una cartera para mantener el perfil de riesgo y objetivos de inversión deseados.' }]);
                            break;
                        case '9':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Son las tarifas que cobran los asesores por sus servicios, que pueden ser una tarifa fija, por hora, o un porcentaje del valor gestionado.' }]);
                            break;
                        case '10':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es la estrategia de gestionar tus inversiones de manera que minimices la carga fiscal y maximices el crecimiento del patrimonio.' }]);
                            break;
                        
                        default:
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'No entendí tu selección. Por favor, elige una opción válida.' }]);
                            break;
                    }
                    break;

                    case 'Asesoria_Financiera_para_Empresas':
                    switch (input) {
                        case '1':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es el servicio de expertos que ayudan a las empresas a tomar decisiones financieras estratégicas para su crecimiento y sostenibilidad.' }]);
                            break;
                        case '2':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Gestión de flujos de caja, planificación de inversiones, gestión de riesgos, y financiamiento.' }]);
                            break;
                        case '3':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Ayuda a las pequeñas empresas a gestionar sus recursos de manera efectiva, evitar errores financieros costosos, y planificar para el crecimiento.' }]);
                            break;
                        case '4':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es el análisis de los estados financieros de una empresa para evaluar su salud financiera y desempeño.' }]);
                            break;
                        case '5':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es el uso de deuda para financiar las operaciones o expansiones de la empresa con la expectativa de que los rendimientos superen los costos de la deuda.' }]);
                            break;
                        case '6':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Proporcionando análisis de viabilidad, asesoramiento sobre financiamiento, y estrategias para gestionar el crecimiento.' }]);
                            break;
                        case '7':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es la evaluación de los costos y beneficios de una decisión empresarial para determinar si la inversión vale la pena.' }]);
                            break;
                        case '8':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Son indicadores calculados a partir de los estados financieros que ayudan a evaluar el desempeño y la posición financiera de una empresa.' }]);
                            break;
                        case '9':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'La gestión del riesgo ayuda a identificar, evaluar y mitigar los riesgos financieros que podrían afectar a la empresa.' }]);
                            break;
                        case '10':
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Es el proceso de crear un plan financiero que detalle los ingresos y gastos proyectados para un período específico, ayudando a la empresa a mantener el control sobre sus finanzas.' }]);
                            break;
                        
                        default:
                            setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'No entendí tu selección. Por favor, elige una opción válida.' }]);
                            break;
                    }
                    break;

                    default:
                    setMessages([...messages, userMessage, { sender: 'Chatbot', text: 'Opción no válida en el submenú. Por favor, elige una opción válida.' }]);
                    break;
            }
        }

        setInput(''); // Limpiar el input después de enviar
    };

    return (
        <div className="chat-container">
            <div className="message-container">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender.toLowerCase()}`}>
                        <strong>{message.sender}: </strong>
                        <span dangerouslySetInnerHTML={{ __html: message.text }} />
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Escribe tu selección..."
                />
                <button onClick={handleSend}>Enviar</button>
            </div>
        </div>
    );
};

export default Chatbot;
