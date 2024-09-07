


import React, { useEffect, useRef } from 'react';

function TablaBonos() {
  const widgetRef = useRef(null);

  useEffect(() => {
    // Verifica si el script ya ha sido añadido
    if (!document.getElementById('tradingview-widget-script')) {
      const script = document.createElement('script');
      script.id = 'tradingview-widget-script';
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        colorTheme: 'dark',
        dateRange: '12M',
        showChart: true,
        locale: 'es',
        largeChartUrl: '',
        isTransparent: false,
        showSymbolLogo: true,
        showFloatingTooltip: false,
        width: '1110',
        height: '1500',
        plotLineColorGrowing: 'rgba(41, 98, 255, 1)',
        plotLineColorFalling: 'rgba(41, 98, 255, 1)',
        gridLineColor: 'rgba(240, 243, 250, 0)',
        scaleFontColor: 'rgba(209, 212, 220, 1)',
        belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
        belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
        belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
        belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
        symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
        tabs: [
          {
            title: 'Bonds',
            symbols: [
              { s: 'CBOT:ZB1!', d: 'T-Bond' },
              { s: 'CBOT:UB1!', d: 'Ultra T-Bond' },
              { s: 'EUREX:FGBL1!', d: 'Euro Bund' },
              { s: 'EUREX:FBTP1!', d: 'Euro BTP' },
              { s: 'EUREX:FGBM1!', d: 'Euro BOBL' },
              { s: 'TVC:JP10Y' },
              { s: 'TVC:CA05Y', d: '5 Year Govt Bonds Yield' },
              { s: 'TVC:DE10Y', d: '2 Year Govt Bonds Yield' },
              { s: 'TVC:EUBUND', d: 'EURO BUND' },
              { s: 'OANDA:UK10YBGBP', d: 'UK 10Y GILT' },
              { s: 'FX:BUND', d: 'EURO-BUND' },
              { s: 'FX:SCHATZ', d: 'EURO-SCHATZ' },
              { s: 'FINRA:WFC4179449', d: 'WELLS FARGO & COMPANY' },
              { s: 'FX:5USNOTE', d: 'US- 5-YEAR T-NOTE' },
              { s: 'TVC:IT10', d: 'ITALY 10 YEAR GOVT BONDS' },
              { s: 'TVC:BR10Y' },
              { s: 'TVC:KR10Y' },
              { s: 'TVC:AU02' }
            ],
            originalTitle: 'Bonds'
          }
        ]
      });
      widgetRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div ref={widgetRef} className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://es.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Siga los mercados en TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default TablaBonos;
