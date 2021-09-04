import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FetchImage } from 'random-image-unsplash';
import PhotoCard from '../../components/PhotoCard';
import '../../global.css';
import Nav from '../../components/Nav';
import Loader from '../../components/Loader';

export type Post =  {
    userId: number;
    id: number;
    title: string;
    body: string;
    imageUrl?: string;
}

type Album = {
    userId: number;
    id: number;
    title: string;
    imageUrl?: string;
}

const Albums = () => {
    const [loading, setLoading] = useState(false);
    const [showPosts, setShowPosts] = useState(false);
    const [userAlbums, setUserAlbums] = useState<Album[]>([]);

    useEffect(() => {
        async function getUsers() {
            const userId = Number(localStorage.getItem('userId'));
            const { data: albums } = await axios.get<Album[]>('https://jsonplaceholder.typicode.com/albums');
            setLoading(true);
            const userAlbumsPromises = albums.filter(album => album.userId === userId).map(async(album) => { // not ideal due to double iteration, can optimize
                const imageUrl = await FetchImage({ type: 'user', width: 1000, height: 500 }).then((image: string) => image);
                return { 
                    ...album, 
                    imageUrl 
                }
            }); 
            const userAlbums = await Promise.all(userAlbumsPromises);
            setUserAlbums(userAlbums);
            setLoading(false);
        }
        getUsers();
    }, []);

    if (loading)
        return <Loader />

    return (
        <div>
            <Nav />
            <div className="flex">
                {userAlbums.map(({ id, title, imageUrl }) => {
                    return (
                        <PhotoCard key={id} id={id} title={title} imageUrl={imageUrl || ''} />
                    )
                })}
            </div>
        </div>
    )
}

export default Albums;