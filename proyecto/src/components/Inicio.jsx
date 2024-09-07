import React from 'react';
import './NavBar.jsx'
import './Inicio.css'

function Inicio()
{
    return(
        <>
        <div className='Que-es-etf'>
            <h1>¿Qué es ETF?</h1>

            <div className='texto-que-es-etf'>
                <h2>
                Nos dedicamos a empoderar a los individuos a través del conocimiento financiero. Nuestros programas educativos están enfocados en proporcionar las habilidades y la comprensión necesarias para tomar decisiones de inversión informadas y efectivas.
                </h2>
            </div>
 
        </div>

        <div className='Cursos'>
            <h2>Cursos</h2>

            <div className='contenedor-padre'>

                <div className='Principiantes'>
                    <h2>Principiantes</h2>

                    <div className='contenedor-Principiantes'>

                        <div className='texto-principiantes'>
                            <p>Ullamcorper ultrices venenatis nostra rutrum vehicula integer enim, nec eu etiam donec augue taciti fringilla, sodales metus leo felis platea posuere fusce, tellus nullam sociis aliquam iaculis faucibus. Praesent ornare nec quisque lectus molestie himenaeos potenti nascetur feugiat, integer nullam nam tempus viverra habitant dapibus. </p>
                        </div>

                    </div>

                </div>

                <div className='Avanzados'>
                    <h2>Avanzados</h2>

                    <div className='contenedor-Avanzados'>

                        <div className='texto-Avanzados'>
                            <p>Ullamcorper ultrices venenatis nostra rutrum vehicula integer enim, nec eu etiam donec augue taciti fringilla, sodales metus leo felis platea posuere fusce, tellus nullam sociis aliquam iaculis faucibus. Praesent ornare nec quisque lectus molestie himenaeos potenti nascetur feugiat, integer nullam nam tempus viverra habitant dapibus. </p>
                        </div>

                    </div>

                </div>

            </div>

            <div className='Asesorias-Financieras'>
                <h2>Asesorías Financieras</h2>

                <div className='contenedor-Asesorias-Financieras'>
                    <div className='texto-Asesorias-Financieras'>
                        <p>Ullamcorper ultrices venenatis nostra rutrum vehicula integer enim, nec eu etiam donec augue taciti fringilla, sodales metus leo felis platea posuere fusce, tellus nullam sociis aliquam iaculis faucibus. Praesent ornare nec quisque lectus molestie himenaeos potenti nascetur feugiat, integer nullam nam tempus viverra habitant dapibus. </p>

                    </div>
           
                </div>
            </div>









        </div>
        </>


        
    );
}

export default Inicio;