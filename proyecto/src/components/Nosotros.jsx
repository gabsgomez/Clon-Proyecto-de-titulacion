import React, { useState } from 'react';
import './NavBar.jsx';
import './Nosotros.css';
import missionImage from '../imagen/imagen_vision.png';
import visionImage from '../imagen/imagen_mision.png';
import icono1 from '../imagen/icono1.png';
import icono2 from '../imagen/icono2.png';
import icono3 from '../imagen/icono3.png';
import icono4 from '../imagen/icono4.png';
import icono5 from '../imagen/icono5.png';
import icono6 from '../imagen/icono1.png';

function Nosotros() {
  const timelineItems = [
    { img: icono1, title: 'Enfoque Cuantitativo Avanzado', description: 'Cada estrategia que creamos se basa en análisis cuantitativos avanzados. utilizamos la potencia de los datos para informar nuestras decisiones y generar rendimientos consistentes.' },
    { img: icono2, title: 'Reducción de Volatilidad', description: 'Nos destacamos en la reducción de la volatilidad de los balances. Nuestras estrategias buscan la estabilidad y la constancia en los rendimientos, brindando tranquilidad a nuestros inversionistas.' },
    { img: icono3, title: 'Educación Boutique', description: 'Ofrecemos educación de élite para inversionistas y entusiastas. No buscamos la educación en masa, sino un enfoque "boutique" que se centra en graduarte con un portafolio de inversión funcional o lograr la rentabilidad y sistematización de tu trading.' },
    { img: icono4, title: 'Altos Estándares de Admisión', description: 'Nuestra educación no es para todos. Establecemos estándares elevados para garantizar que sólo aquellos con un conocimiento mínimo, según nuestros criterios, accedan a nuestras estrategias avanzadas y complejas.' },
    { img: icono5, title: 'Asesoría Integral', description: 'Nuestro equipo de asesores ("advisors") es el puente entre nuestras estrategias y los inversionistas. Ofrecemos asesoría personalizada y planeación financiera profunda para que nuestros clientes no sólo inviertan, sino que vivan sin preocupaciones financieras.' },
    { img: icono6, title: 'Resultados Tangibles', description: 'No prometemos, demostramos. Ponemos a disposición de nuestros clientes estrategias probadas y resultados tangibles que colocan en el camino directo hacia sus metas financieras.' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 2;
      return newIndex < 0 ? timelineItems.length - (timelineItems.length % 2 === 0 ? 2 : 1) : newIndex;
    });
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 2;
      return newIndex >= timelineItems.length ? 0 : newIndex;
    });
  };

  return (
    <>
      <div className='Quienes-somos'>
        <h1>¿Quiénes somos?</h1>
        <div className='texto-quienes-somos'>
          <h2>
            Nuestra firma, con base en Guadalajara, se distingue por una propuesta de valor integral que abarca tres líneas de negocios interconectadas: Asses Management, Institute y Advisors.
          </h2>
        </div>
      </div>

      <section className="mission">
        <h2>MISIÓN</h2>
        <div className="content">
          <p>Nuestra misión es proporcionar asesoría y formación de alta calidad, empoderando a individuos y organizaciones para tomar decisiones financieras informadas y alcanzar sus objetivos económicos con confianza y eficacia.</p>
          <img src={missionImage} alt="Mission" />
        </div>
      </section>

      <section className="vision">
        <h2>VISIÓN</h2>
        <div className="content">
          <img src={visionImage} alt="Vision" />
          <p>Ser líderes en la transformación del panorama financiero en México, fomentando una cultura de educación financiera inclusiva y accesible para todos, y estableciendo nuevos estándares en asesoría y formación financiera.</p>
        </div>
      </section>

      <section className="timeline">
        <h2>Beneficios de Marathon</h2>
        <div className="timeline-container">
          {timelineItems.slice(currentIndex, currentIndex + 2).map((item, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-title">
                <img src={item.img} alt="Icono" />
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <button className="timeline-arrow left" onClick={handlePrevClick}>&lt;</button>
        <button className="timeline-arrow right" onClick={handleNextClick}>&gt;</button>
      </section>
    </>
  );
}

export default Nosotros;
