import React from 'react';
import './bonos.css';
import './TablaBonos';
import TablaBonos from './TablaBonos';

const Bonos = () => {
return(
    <>

    <div className='titulo'>
        <h1>Bonos</h1>
    </div>
    <div className='tabla-bonos'>
        <TablaBonos/>
    </div>
   
    </>
);
};

export default Bonos;