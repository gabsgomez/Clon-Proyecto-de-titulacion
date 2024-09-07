import React from 'react';
import './NavBar.jsx';
import './Experiencia.css';
import img_fabrizzio from '../imagen/Fabrizzio.png';
import img_yamil from '../imagen/Yamil.png';
import img_mario from '../imagen/Mario.png';

function Experiencia() {
    return (
        <div className='como-estamos-preparados'>
            <h1>¿Cómo estamos preparados?</h1>
            <h2>Conoce a nuestros expertos.</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit accumsan interdum, cursus torquent lacus nostra suspendisse maecenas leo facilisis eros, nunc rutrum semper ligula euismod vitae justo purus. Fusce aenean non magna vitae facilisis pulvinar ornare ac sed litora, posuere vestibulum placerat mauris cras himenaeos aliquam varius vehicula, facilisi netus sodales vulputate inceptos imperdiet suscipit consequat quam. Cras convallis faucibus lacinia quis pretium dictum nascetur dignissim ornare posuere, vulputate nec fermentum vehicula nulla quisque litora hendrerit.</p>

            <div className='Nombres-de-asesores-container'>
                <div className='Nombres-de-asesores'>
                    <div className='asesor'>Fabrizzio Cervantes</div>
                    <img src={img_fabrizzio} alt="Fabrizzio" />
                    <div className='descripcion'>
                        <p>Fabrizzio, emprendedor e inversionista con licenciatura en administración financiera y certificación como asesor en estrategias de inversión, destaca como analista financiero y asesor. Su agudo talento numérico se refleja en su enfoque preciso en el mercado de capitales y opciones financieras. Como mentor, comparte su experiencia y conocimientos, focalizándose en la enseñanza del análisis financiero y macroeconómico para empoderar a otros en el mundo de las inversiones.</p>
                    </div>
                </div>

                <div className='Nombres-de-asesores'>
                    <div className='asesor'>Yamil Rizo</div>
                    <img src={img_yamil} alt="Yamil" />
                    <div className='descripcion'>
                        <p>Omar, licenciado en contaduría pública, destaca por su enfoque analítico como inversionista y trader, empleando análisis estadístico y cuantitativo para lograr resultados óptimos en acciones y derivados. Como emprendedor e innovador, fundó Marathon Asset Management, fusionando el arte de las inversiones con la ciencia de los datos para formar traders profesionales. Su habilidad para combinar precisión analítica con visión emprendedora lo distingue, llevando la gestión de activos a nuevas alturas mediante la integración de inteligencia estadística en sus estrategias.</p>
                    </div>
                </div>

                <div className='Nombres-de-asesores'>
                    <div className='asesor'>Mario Riveros</div>
                    <img src={img_mario} alt="Mario" />
                    <div className='descripcion'>
                        <p>Mario, Asesor en Estrategias de Inversión, destaca por su creatividad al visualizar los mercados y encontrar oportunidades únicas de inversión. Experto en análisis técnico, se especializa en el trading institucional a corto plazo. Comparte sus hallazgos y conocimientos con la comunidad y se dedica a formar traders inteligentes y rentables, siendo un líder destacado en el mundo de las inversiones.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Experiencia;
