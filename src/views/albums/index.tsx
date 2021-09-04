import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FetchImage } from 'random-image-unsplash';
import AlbumCard from '../../components/AlbumCard';
import '../../global.css';
import Nav from '../../components/Nav';

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

const Gallery = () => {
    const [loading, setLoading] = useState(false);
    const [showPosts, setShowPosts] = useState(false);
    const [userPosts, setUserPosts] = useState<Post[]>([]);
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
        return <span>Loading...</span>

    return (
        <div>
            <Nav setShowPosts={() => setShowPosts(!showPosts)} showPosts={showPosts} />
            <div className="flex">
                {userAlbums.map(({ id, title, imageUrl }) => {
                    return (
                        <AlbumCard key={id} id={id} title={title} imageUrl={imageUrl || ''} />
                    )
                })}
            </div>
        </div>
    )
}

export default Gallery;