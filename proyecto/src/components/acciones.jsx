/*import './acciones.css';
import React, { useEffect, useRef, memo } from 'react';





function Acciones() {
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
        ref: container1, symbol: 'BMFBOVESPA:BBDC4',
      },
      {
        ref: container2, symbol: 'BMFBOVESPA:ITUB4',
      },
      {
        ref: container3, symbol: 'BMFBOVESPA:ITSA4',
      },
      {
        ref: container4, symbol: 'BMFBOVESPA:BRSR6',
      },
      {
        ref: container5, symbol: 'NASDAQ:RILYM',
      },
      {
        ref: container6, symbol: 'BMFBOVESPA:BRAP4',
      },
      {
        ref: container7, symbol: 'NASDAQ:RILYZ',
      },
      {
        ref: container8, symbol: 'BMFBOVESPA:ABCB4',
      },
      {
        ref: container9, symbol: 'NASDAQ:RILYL',
      },
      {
        ref: container10, symbol: 'BMFBOVESPA:BPAN4',
      },
      {
        ref: container11, symbol: 'NASDAQ:RILYN',
      },
      {
        ref: container12, symbol: 'NASDAQ:RILYP',
      },
      {
        ref: container13, symbol: 'NASDAQ:RILYT',
      },
      {
        ref: container14, symbol: 'NYSE:JPM/PM',
      },
      {
        ref: container15, symbol: 'BVC:PFBCOLOM',
      },
      {
        ref: container16, symbol: 'NYSE:ARR/PC',
      },
      {
        ref: container17, symbol: 'NASDAQ:RILYG',
      },
      {
        ref: container18, symbol: 'NASDAQ:TRINI',
      },
      {
        ref: container19, symbol: 'BMFBOVESPA:BMGB4',
      },
      {
        ref: container20, symbol: 'BVC:PFGRUPSURA',
      },
      {
        ref: container21, symbol: 'OTC:FNMAS'
      },
      {
        ref: container22, symbol: 'NASDAQ:RILYK'
      },
      {
        ref: container23, symbol: 'NYSE:KEY/PK'
      },
      {
        ref: container24, symbol: 'NYSE:BML/PH'
      },
      {
        ref: container25, symbol: 'NYSE:RF/PE'
      },
      {
        ref: container26, symbol: 'NYSE:BAC/PM'
      },
      {
        ref: container27, symbol: 'BMFBOVESPA:SANB4'
      },
      {
        ref: container28, symbol: 'NYSE:HPP/PC'
      },
      {
        ref: container29, symbol: 'NYSE:JPM/PC'
      },
      {
        ref: container30, symbol: 'NASDAQ:ACGLN'
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

  return (
    <>
    <div className='titulo'>
        <h1>Acciones</h1>
    </div>
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

export default memo(Acciones);
*/

import "./acciones.css";
import React, { useEffect, useRef, memo, useState } from "react";
import { useNavigate } from "react-router-dom";

function Acciones() {
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
      { ref: container1, symbol: "BMFBOVESPA:BBDC4" },
      { ref: container2, symbol: "BMFBOVESPA:ITUB4" },
      { ref: container3, symbol: "BMFBOVESPA:ITSA4" },
      { ref: container4, symbol: "BMFBOVESPA:BRSR6" },
      { ref: container5, symbol: "NASDAQ:RILYM" },

      {
        ref: container5,
        symbol: "NASDAQ:RILYM",
      },
      {
        ref: container6,
        symbol: "BMFBOVESPA:BRAP4",
      },
      {
        ref: container7,
        symbol: "NASDAQ:RILYZ",
      },
      {
        ref: container8,
        symbol: "BMFBOVESPA:ABCB4",
      },
      {
        ref: container9,
        symbol: "NASDAQ:RILYL",
      },
      {
        ref: container10,
        symbol: "BMFBOVESPA:BPAN4",
      },
      {
        ref: container11,
        symbol: "NASDAQ:RILYN",
      },
      {
        ref: container12,
        symbol: "NASDAQ:RILYP",
      },
      {
        ref: container13,
        symbol: "NASDAQ:RILYT",
      },
      {
        ref: container14,
        symbol: "NYSE:JPM/PM",
      },
      {
        ref: container15,
        symbol: "BVC:PFBCOLOM",
      },
      {
        ref: container16,
        symbol: "NYSE:ARR/PC",
      },
      {
        ref: container17,
        symbol: "NASDAQ:RILYG",
      },
      {
        ref: container18,
        symbol: "NASDAQ:TRINI",
      },
      {
        ref: container19,
        symbol: "BMFBOVESPA:BMGB4",
      },
      {
        ref: container20,
        symbol: "BVC:PFGRUPSURA",
      },
      {
        ref: container21,
        symbol: "OTC:FNMAS",
      },
      {
        ref: container22,
        symbol: "NASDAQ:RILYK",
      },
      {
        ref: container23,
        symbol: "NYSE:KEY/PK",
      },
      {
        ref: container24,
        symbol: "NYSE:BML/PH",
      },
      {
        ref: container25,
        symbol: "NYSE:RF/PE",
      },
      {
        ref: container26,
        symbol: "NYSE:BAC/PM",
      },
      {
        ref: container27,
        symbol: "BMFBOVESPA:SANB4",
      },
      {
        ref: container28,
        symbol: "NYSE:HPP/PC",
      },
      {
        ref: container29,
        symbol: "NYSE:JPM/PC",
      },
      {
        ref: container30,
        symbol: "NASDAQ:ACGLN",
      },
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
      <div className="titulo">
        <h1>Acciones</h1>

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
      </div>
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

export default memo(Acciones);
