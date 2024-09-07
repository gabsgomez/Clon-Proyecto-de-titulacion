import React, { useEffect, useRef, memo } from 'react';

function MapaDeCalor() {
  const container = useRef();
  const widgetAdded = useRef(false); // Añadir una referencia para controlar la carga del widget

  useEffect(() => {
    if (!widgetAdded.current) { // Verificar si el widget ya ha sido añadido
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "exchanges": [],
          "dataSource": "SPX500",
          "grouping": "sector",
          "blockSize": "market_cap_basic",
          "blockColor": "change",
          "locale": "es",
          "symbolUrl": "",
          "colorTheme": "dark",
          "hasTopBar": false,
          "isDataSetEnabled": false,
          "isZoomEnabled": true,
          "hasSymbolTooltip": true,
          "isMonoSize": false,
          "width": 1110,
          "height": 600
        }`;
      container.current.appendChild(script);
      widgetAdded.current = true; // Marcar que el widget ha sido añadido
    }
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://es.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Siga los mercados en TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(MapaDeCalor);
