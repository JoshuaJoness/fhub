import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../components/Nav';
import PhotoCard from '../../components/PhotoCard';
import '../../global.css';

type Photo =  {
    albumId: number;
    id: number;
    title: string;
    thumbnailUrl: string;
    url: string;
}

const Album = () => {
    const [userPhotos, setUserPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        async function getPhotos() {
            const path = window.location.pathname.split('/');
            const id = path[path.length -1 ];
            if (typeof id === 'string') {
                const { data: photos } = await axios.get<Photo[]>(`https://jsonplaceholder.typicode.com/albums/${id}/photos`);
                setUserPhotos(photos)
            }
        }
        getPhotos();
    }, []);

    return (
        <div >
            <Nav />
            <div>
                {userPhotos.map(({ id, thumbnailUrl, title, }) => <PhotoCard id={id} imageUrl={thumbnailUrl} title={title} noLink />)}
            </div>
        </div>
    )
}

export default Album;