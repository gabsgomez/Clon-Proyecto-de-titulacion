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
                    return (
                        <div className='card' key={index}>
                            <img src={curItem.urlToImage} alt={curItem.title} />
                            <div className='content'>
                                <a className='title' onClick={() => handleReadMore(curItem.url, curItem)}>{curItem.title}</a>
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

