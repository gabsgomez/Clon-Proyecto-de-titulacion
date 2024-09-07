import TablaFuturos from './TablaFuturos';
import './futuros.css';
import React, { useEffect, useRef, memo, useState } from "react";
import { useNavigate } from "react-router-dom";



function Futuros() {

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
        ref: container1, symbol: 'CME_MINI:NQ1!',
      },
      {
        ref: container2, symbol: 'CME_MINI:ES1!',
      },
      {
        ref: container3, symbol: 'CME_MINI:MNQ1!',
      },
      {
        ref: container4, symbol: 'COMEX:GC1!',
      },
      {
        ref: container5, symbol: 'NYMEX:CL1!',
      },
      {
        ref: container6, symbol: 'CBOT_MINI:YM1!',
      },
      {
        ref: container7, symbol: 'CME_MINI:MES1!',
      },
      {
        ref: container8, symbol: 'CME:BTC1!',
      },
      {
        ref: container9, symbol: 'CME_MINI:RTY1!',
      },
      {
        ref: container10, symbol: 'COMEX:SI1!',
      },
      {
        ref: container11, symbol: 'COMEX_MINI:MGC1!',
      },
      {
        ref: container12, symbol: 'NYMEX:NG1!',
      },
      {
        ref: container13, symbol: 'CME:6E1!',
      },
      {
        ref: container14, symbol: 'COMEX:HG1!',
      },
      {
        ref: container15, symbol: 'NYMEX:MCL1!',
      },
      {
        ref: container16, symbol: 'CBOT_MINI:MYM1!',
      },
      {
        ref: container17, symbol: 'CBOT:ZB1!',
      },
      {
        ref: container18, symbol: 'CME:6B1!',
      },
      {
        ref: container19, symbol: 'NYMEX:PL1!',
      },
      {
        ref: container20, symbol: 'CME:6J1!',
      },
      {
        ref: container21, symbol: 'NYMEX:TTF1!'
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
        <h1>Futuros</h1>
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

      <div className='tabla-futuros'>
        <TablaFuturos />
      
      </div>
      

    </div>
    </>
  );
}

export default memo(Futuros);
