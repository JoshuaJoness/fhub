import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { capitalizeFirstWord } from '../lib/capitalizeFirstLetter';
import { Comment } from '../views/galleries';

type Props = {
    id: number;
    imageUrl: string;
    title: string;
}

const Album = ({ id, title, imageUrl }:Props) => {
    return (
        <div className="card-container">
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
            <div style={{ border: '1px solid black', width: '100%', height: '100%' }}>
                <Link 
                    className="ellipsis"
                    style={{ padding: '0px 10px 0px 10px' }} 
                    to={`/albums/${id}`}
                >
                    {capitalizeFirstWord(title)}
                </Link>
            </div>
        </div>
    )}

export default Album;