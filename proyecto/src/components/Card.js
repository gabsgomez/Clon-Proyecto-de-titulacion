
/*
import React from 'react';
import './Noticias.css';

const Card = ({ data, onViewed }) => {
    const handleReadMore = (url, article) => {
        window.open(url);
        if (onViewed) {
            onViewed(article); // Agregar la noticia al historial
        }
    };

    return (
        <div className='cardContainer'>
            {data.map((curItem, index) => {
                if (!curItem.urlToImage) {
                    return null;
                } else {
                    // Formatea la fecha de publicación en formato año/mes/día
                    const publishedDate = new Date(curItem.publishedAt).toLocaleDateString('en-CA');

                    return (
                        <div className='card' key={index}>
                            <img src={curItem.urlToImage} alt={curItem.title} />
                            <div className='content'>
                                
                                <a className='title' onClick={() => handleReadMore(curItem.url, curItem)}>
                                    {curItem.title} <span className='date'>({publishedDate})</span>
                                </a>
                                <p>{curItem.description}</p>
                                <button onClick={() => handleReadMore(curItem.url, curItem)}>Read More</button>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default Card;

*/




import React from 'react';
import './Noticias.css';

const Card = ({ data, onViewed }) => {
    const handleReadMore = (url, article) => {
        window.open(url, '_blank');
        if (onViewed) {
            onViewed(article); // Agregar la noticia al historial
        }
    };

    // Asegurarse de que las noticias estén ordenadas de la más reciente a la más antigua
    const sortedData = [...data].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    return (
        <div className='cardContainer'>
            {sortedData.map((curItem, index) => {
                if (!curItem.urlToImage) {
                    return null;
                } else {
                    // Formatea la fecha de publicación en formato año/mes/día
                    const publishedDate = new Date(curItem.publishedAt).toLocaleDateString('en-CA');

                    return (
                        <div className='card' key={index}>
                            <img src={curItem.urlToImage} alt={curItem.title} />
                            <div className='content'>
                                {/* Título de la noticia y fecha de publicación */}
                                <a className='title' onClick={() => handleReadMore(curItem.url, curItem)}>
                                    {curItem.title} <span className='date'>({publishedDate})</span>
                                </a>
                                <p>{curItem.description}</p>
                                <button onClick={() => handleReadMore(curItem.url, curItem)}>Read More</button>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default Card;
