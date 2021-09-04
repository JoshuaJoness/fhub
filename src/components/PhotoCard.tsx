import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { capitalizeFirstWord } from '../lib/capitalizeFirstLetter';
import '../global.css';

type Props = {
    id: number;
    imageUrl: string;
    title: string;
    noLink?: boolean;
}

const PhotoCard = ({ id, title, imageUrl, noLink }:Props) => (
    <div className="card-container" style={{ display: 'block' }}>
        <Link to={`/albums/${id}`}>
            <img 
                src={imageUrl} 
                style={{ 
                    width: '100%', 
                    verticalAlign: 'bottom', 
                    borderBottom: 'none' 
                }} 
                alt="Randomly generated from Unsplash." 
            /> 
        </Link>
        <div style={{ padding: 20 }}>
            <Link 
                className="ellipsis"
                to={`/albums/${id}`}
            >
                {capitalizeFirstWord(title)}
            </Link>
        </div>
    </div>
)

export default PhotoCard;