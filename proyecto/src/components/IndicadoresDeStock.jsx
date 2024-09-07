/*import React from 'react';
import './IndicadoresDeStock.css';
import { Link } from 'react-router-dom';

const IndicadoresDeStock = () => {
    return (
        <>
            <h1>Indicadores De Stock</h1>
            <div className="buttons-container">
                
            </div>
        </>
    );
};

export default IndicadoresDeStock;
*/

import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './IndicadoresDeStock.css';

const IndicadoresDeStock = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const symbol = queryParams.get('symbol');

  const containerRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (symbol && containerRef.current) {
      // Limpiar el contenedor para evitar duplicados
      containerRef.current.innerHTML = '';

      try {
        // Utilizando la API oficial de TradingView para evitar problemas de script
        new window.TradingView.widget({
          symbol: symbol,
          container_id: containerRef.current.id, // Usar el id del contenedor
          width: "100%", // Ancho 100% del contenedor
          height: "600px", // Altura 100% del contenedor
          isTransparent: false,
          colorTheme: "dark",
          locale: "es",
        });
        setHasError(false);
      } catch (error) {
        console.error("Error al cargar el widget de TradingView: ", error);
        setHasError(true);
      }
    }

    // Limpieza cuando el componente se desmonta
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''; // Limpiar el contenido cuando el componente se desmonta
      }
    };
  }, [symbol]);

  return (
    <>
      <h1>Indicador: {symbol}</h1>
      <div className="tradingview-widget-containerr">
        {!hasError ? (
          <div id="tradingview-widgett" ref={containerRef}></div>
        ) : (
          <p>Error al cargar el widget de TradingView. Intente nuevamente más tarde.</p>
        )}
      </div>
    </>
  );
};

export default IndicadoresDeStock;
