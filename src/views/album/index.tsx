import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../global.css';
import Card from '../../components/Card';

type Photo =  {
    albumId: number;
    id: number;
    title: string;
    thumbnailUrl: string;
    url: string;
}

const Album = (props: any) => {
    const [userPhotos, setUserPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        async function getPhotos() {

            const path = window.location.pathname.split('/');
            const id = path[path.length -1 ];
            console.log(typeof id)
            if (typeof id === 'string') {
                const { data: photos } = await axios.get<Photo[]>(`https://jsonplaceholder.typicode.com/albums/${id}/photos`);
                setUserPhotos(photos)
            }
        }
        getPhotos();
    }, []);

    useEffect(() => {
        console.log(userPhotos, "***")
    }, [userPhotos])
    return (
        <div className="flex">
            {userPhotos.map(({ albumId, id, thumbnailUrl, title, url }) => <Card noLink key={id} imageUrl={url} title={title} />)}
        </div>
    )
}

export default Album;