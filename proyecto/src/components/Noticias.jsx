import React, { useEffect, useState } from 'react';
import Card from './Card';

const Noticias = () => {
    const [search, setSearch] = useState("");
    const [newsData, setNewsData] = useState([]);
    const [viewedNews, setViewedNews] = useState([]);
    const API_KEY = "06c103882d1249b29bf4f86513ff4e84";

    const cnnCategories = ["US", "World", "Politics", "Business"];
    const cnbcCategories = [
        "Markets", "Business", "Investing", "Tech", "Politics", "Personal Finance",
        "Fintech", "Financial Advisors", "Options Action", "ETF Street", 
        "Buffett Archive", "Earnings", "Trader Talk"
    ];

    // Remove duplicate categories
    const uniqueCategories = Array.from(new Set(cnnCategories.concat(cnbcCategories)));

    const getData = async () => {
        let allNews = [];

        try {
            // Fetch CNN news
            if (cnnCategories.includes(search)) {
                const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&domains=cnn.com&apiKey=${API_KEY}`);
                const jsonData = await response.json();
                if (Array.isArray(jsonData.articles)) {
                    allNews = [...allNews, ...jsonData.articles];
                }
            }

            // Fetch CNBC news
            if (cnbcCategories.includes(search)) {
                const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&domains=cnbc.com&apiKey=${API_KEY}`);
                const jsonData = await response.json();
                if (Array.isArray(jsonData.articles)) {
                    allNews = [...allNews, ...jsonData.articles];
                }
            }

            // Sort the news by publication date in ascending order
            allNews.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));

            setNewsData(allNews);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (search) {
            getData();
        }
    }, [search]);

    const handleInput = (e) => {
        setSearch(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSearch(e.target.value);
    };

    const handleViewedNews = (article) => {
        setViewedNews(prev => [...prev, article]);
    };

    return (
        <div>
            <nav className='nav'>
                <div>
                    <h1>ETF Noticias</h1>
                </div>
                <ul style={{ display: "flex", gap: "11px" }}>
                    <a href="#todas">Todas las noticias</a>
                    <a href="#etf">ETF</a>
                </ul>
                <div className='searchBar'>
                    <input type='text' placeholder='Search News' value={search} onChange={handleInput} />
                    <button onClick={getData}>Buscar</button>
                </div>
            </nav>
            <div>
                <p className='head'>¡Mantente actualizado con nuestras noticias!</p>
            </div>
            <div className='categoryDropdown'>
                <select onChange={handleCategoryChange} value={search}>
                    <option value="">Selecciona una categoría</option>
                    {uniqueCategories.map((category, index) => (
                        <option key={`${category}-${index}`} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <button className='historialButton' onClick={() => document.getElementById('historial').scrollIntoView({ behavior: 'smooth' })}>
                    Historial de Noticias
                </button>

            <div>
                {newsData.length > 0 ? <Card data={newsData} onViewed={handleViewedNews} /> : null}
            </div>

            <div classname="historial"  id="historial">
                <h2>Historial de Noticias Vistas</h2>
                {viewedNews.length > 0 ? <Card data={viewedNews} /> : <p>No has visto ninguna noticia.</p>}
            </div>
        </div>
    );
}

export default Noticias;
