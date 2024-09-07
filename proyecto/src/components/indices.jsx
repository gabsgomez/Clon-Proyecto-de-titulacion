import React, { useEffect, useRef, memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import './indices.css'; 
import './MapaDeCalor';
import MapaDeCalor from './MapaDeCalor';


function Indices() {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const container1 = useRef();
  const container2 = useRef();
  const container3 = useRef();
  const container4 = useRef();
  const container5 = useRef();
  const container6 = useRef();
  const container7 = useRef();
  const container8 = useRef();
  const container9 = useRef();
  const container10 = useRef();
  const container11 = useRef();
  const container12 = useRef();
  const container13 = useRef();
  const container14 = useRef();
  const container15 = useRef();
  const container16 = useRef();
  const container17 = useRef();
  const container18 = useRef();
  const container19 = useRef();
  const container20 = useRef();
  const container21 = useRef();

  useEffect(() => {

    const containers = [
      {
        ref: container1, symbol: 'INDEX:BTCUSD                               ',
      },
      {
        ref: container2, symbol: 'OANDA:NAS100USD',
      },
      {
        ref: container3, symbol: 'BLACKBULL:US30',
      },
      {
        ref: container4, symbol: 'CAPITALCOM:US100',
      },
      {
        ref: container5, symbol: 'OANDA:SPX500USD',
      },
      {
        ref: container6, symbol: 'CRYPTOCAP:BTC.D',
      },
      {
        ref: container7, symbol: 'PEPPERSTONE:NAS100',
      },
      {
        ref: container8, symbol: 'OANDA:US30USD',
      },
      {
        ref: container9, symbol: 'CAPITALCOM:US500',
      },
      {
        ref: container10, symbol: 'CAPITALCOM:DXY',
      },
      {
        ref: container11, symbol: 'CRYPTOCAP:USDT.D',
      },
      {
        ref: container12, symbol: 'CRYPTOCAP:TOTAL',
      },
      {
        ref: container13, symbol: 'CRYPTOCAP:TOTAL3',
      },
      {
        ref: container14, symbol: 'OANDA:DE30EUR',
      },
      {
        ref: container15, symbol: 'PEPPERSTONE:GER40',
      },
      {
        ref: container16, symbol: 'INDEX:ETHUSD',
      },
      {
        ref: container17, symbol: 'PEPPERSTONE:US500',
      },
      {
        ref: container18, symbol: 'SPREADEX:NIKKEI',
      },
      {
        ref: container19, symbol: 'BITMEX:XBT',
      },
      {
        ref: container20, symbol: 'BSE:SENSEX',
      },
      {
        ref: container21, symbol: 'IDX:COMPOSITE'
      }
    ];

    containers.forEach(({ ref, symbol }) => {
      // Verificar si el contenedor ya tiene un script, para evitar duplicados
      if (ref.current.querySelector('script')) return;

      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = `
        {
          "symbol": "${symbol}",
          "width": 350,
          "isTransparent": false,
          "colorTheme": "dark",
          "locale": "es"
        }`;
      ref.current.appendChild(script);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/IndicadoresDeStock?symbol=${search}`);
    }
  };

  return (
    <>
    <div className='titulo'>
        <h1>Índices</h1>
    </div>

    <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar símbolo de stock (ej. ITSA4)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="search-button">
            Buscar
          </button>
        </form>

    <div className="widget-container">
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container1}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container2}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container3}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container4}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container5}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container6}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container7}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container8}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container9}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
    
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container10}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container11}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container12}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container13}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container14}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container15}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container16}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container17}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container18}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container19}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container20}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container21}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>

      <div className='mapa-calor'>

      <MapaDeCalor />
      </div>
      

    </div>
    </>
  );
}

export default memo(Indices);
