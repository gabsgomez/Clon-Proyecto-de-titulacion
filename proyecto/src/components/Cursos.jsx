import React from 'react';
import './NavBar.jsx'
import './Cursos.css'

import temario_principiante from '../imagen/temario_principiante.png';

function Cursos()
{
    return(
        <>
        <div className='Nuestros-cursos'>
            <h1>Nuestros Cursos</h1>
            <p>Párrafo. Haz clic aquí para agregar tu propio texto y editarlo. Es fácil. Haz clic en "Editar texto" o doble clic aquí para agregar tu contenido y cambiar la fuente. En este espacio puedes contar tu historia y permitir que los usuarios sepan más sobre ti.</p>
        </div>

        <div className='contenedor-padre'>

        <div className='Principiantes'>
            <h2>Principiantes</h2>

            <div className='contenedor-Principiantes'>

                <div className='texto-principiantes'>
                    <p>Ullamcorper ultrices venenatis nostra rutrum vehicula integer enim, nec eu etiam donec augue taciti fringilla, sodales metus leo felis platea posuere fusce, tellus nullam sociis aliquam iaculis faucibus. Praesent ornare nec quisque lectus molestie himenaeos potenti nascetur feugiat, integer nullam nam tempus viverra habitant dapibus. </p>
                </div>
                <img src={temario_principiante} alt="temario_principiante" />

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
                
        </>

    );
}
export default Cursos;
