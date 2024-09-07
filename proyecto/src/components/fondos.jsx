import './fondos.css';

import React, { useEffect, useRef, memo, useState } from "react";
import { useNavigate } from "react-router-dom";





function Fondos() {

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
  const container22 = useRef();
  const container23 = useRef();
  const container24 = useRef();
  const container25 = useRef();
  const container26 = useRef();
  const container27 = useRef();
  const container28 = useRef();
  const container29 = useRef();
  const container30 = useRef();

  useEffect(() => {
    const containers = [
      {
        ref: container1, symbol: 'AMEX:SPY',
      },
      {
        ref: container2, symbol: 'NASDAQ:QQQ',
      },
      {
        ref: container3, symbol: 'AMEX:IWM',
      },
      {
        ref: container4, symbol: 'NASDAQ:TQQQ',
      },
      {
        ref: container5, symbol: 'NASDAQ:TLT',
      },
      {
        ref: container6, symbol: 'AMEX:SOXL',
      },
      {
        ref: container7, symbol: 'AMEX:DIA',
      },
      {
        ref: container8, symbol: 'NASDAQ:SMH',
      },
      {
        ref: container9, symbol: 'AMEX:GLD',
      },
      {
        ref: container10, symbol: 'NASDAQ:SQQQ',
      },
      {
        ref: container11, symbol: 'AMEX:XLE',
      },
      {
        ref: container12, symbol: 'AMEX:XLF',
      },
      {
        ref: container13, symbol: 'AMEX:VOO',
      },
      {
        ref: container14, symbol: 'AMEX:UVXY',
      },
      {
        ref: container15, symbol: 'AMEX:XLC',
      },
      {
        ref: container16, symbol: 'AMEX:RSP',
      },
      {
        ref: container17, symbol: 'AMEX:ARKK',
      },
      {
        ref: container18, symbol: 'AMEX:GBTC',
      },
      {
        ref: container19, symbol: 'AMEX:UVIX',
      },
      {
        ref: container20, symbol: 'AMEX:DPST',
      },
      {
        ref: container21, symbol: 'NASDAQ:EQIX'
      },
      {
        ref: container22, symbol: 'AMEX:BLOK'
      },
      {
        ref: container23, symbol: 'NYSE:IRM'
      },
      {
        ref: container24, symbol: 'NASDAQ:IEF'
      },
      {
        ref: container25, symbol: 'NYSE:VICI'
      },
      {
        ref: container26, symbol: 'NASDAQ:NVD'
      },
      {
        ref: container27, symbol: 'AMEX:NUGT'
      },
      {
        ref: container28, symbol: 'NASDAQ:BOTZ'
      },
      {
        ref: container29, symbol: 'AMEX:CORN'
      },
      {
        ref: container30, symbol: 'NASDAQ:BND'
      }
    ];

    
    containers.forEach(({ ref, symbol }) => {
      if (ref.current.querySelector("script")) return;

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
      script.type = "text/javascript";
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
        <h1>Fondos</h1>
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
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container22}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container23}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container24}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container25}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container26}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container27}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container28}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container29}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      <div className="widget-box">
        <div className="tradingview-widget-container" ref={container30}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
      
      

    </div>
    </>
  );
}

export default memo(Fondos);
