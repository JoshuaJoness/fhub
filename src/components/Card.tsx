import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    noLink?: boolean;
    id?: number;
    imageUrl: string;
    title: string;
    body?: string;
}

const capitalizeFirstWord = (title: string) => {
    return title.split('').map((char, idx) => {
        if (idx === 0) {
            return char.toUpperCase();
        }
        return char;
    }).join('');
};

const Card = ({ noLink, id, imageUrl, title, body }:Props) => (
        <div style={{ width: imageUrl ? 500 : 300, height: '100%', margin: 30 }}>
            {!noLink && imageUrl ? 
            <Link to={`/albums/${id}`}>
                <img 
                    src={imageUrl} 
                    style={{ 
                        width: '100%', 
                        verticalAlign: 'bottom', 
                        border: '1px solid black', 
                        borderBottom: 'none' }} 
                    alt="Randomly generated from Unsplash." 
                /> 
            </Link>
             : 
             <img 
                src={imageUrl} 
                style={{ 
                    width: '100%', 
                    verticalAlign: 'bottom', 
                    border: '1px solid black', 
                    borderBottom: 'none' }} 
                alt="Randomly generated from Unsplash." 
            /> }
            <div style={{ border: '1px solid black', width: '100%', height: 150 }}>
                {!noLink && imageUrl ? <Link 
                    className="ellipsis"
                    style={{ padding: '0px 10px 0px 10px' }} 
                    to={`/albums/${id}`}
                >
                    {capitalizeFirstWord(title)}
                </Link> : 
                <h3 className="ellipsis" style={{ paddingLeft: 100 }}>
                    {capitalizeFirstWord(title)}
                </h3>
                }
                <p style={{ padding: '0px 100px 0px 100px' }}>{body}</p>
            </div>
        </div>
    )

export default Card;