import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../global.css';

type Photo =  {
    userId: number;
    id: number;
    title: string;
    body: string;
    imageUrl?: string;
}

const Album = (props: any) => {
    const [userPhotos, setUserPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        async function getPhotos() {

            const path = window.location.pathname.split('/');
            const id = path[path.length -1 ];
            console.log(typeof id)
            if (typeof id === 'string') {
                console.log('yo')
                const { data: photos } = await axios.get(`'https://jsonplaceholder.typicode.com/albums/${id}/photos'`); // TODO fix route
                console.log(photos)
                setUserPhotos(photos)
            }
        }
        getPhotos();
    }, []);

    useEffect(() => {
        console.log(userPhotos, "***")
    }, [userPhotos])
    return (
        <div>
            <h1>A</h1>
        </div>
    )
}

export default Album;