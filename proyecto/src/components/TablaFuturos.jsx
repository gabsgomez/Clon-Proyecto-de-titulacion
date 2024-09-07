import React, { useEffect, useRef } from 'react';

function TablaFuturos() {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (widgetRef.current) {
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
          height: '500',
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
              title: 'Futures',
              symbols: [
                { s: 'CME_MINI:ES1!', d: 'S&P 500' },
                { s: 'CME:6E1!', d: 'Euro' },
                { s: 'COMEX:GC1!', d: 'Gold' },
                { s: 'NYMEX:CL1!', d: 'WTI Crude Oil' },
                { s: 'NYMEX:NG1!', d: 'Gas' },
                { s: 'CBOT:ZC1!', d: 'Corn' },
              ],
              originalTitle: 'Futures',
            },
          ],
        });
        widgetRef.current.appendChild(script);
      }
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div ref={widgetRef} className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://es.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Siga los mercados en TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default TablaFuturos;
