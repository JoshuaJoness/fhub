import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FetchImage } from 'random-image-unsplash';
import Card from '../../components/Card';
import '../../global.css';

type Post =  {
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
            const { data: posts } = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
            const userToken = Number(localStorage.getItem('loginToken'));
            const userPostsPromises = posts.filter(post => post.userId === userToken);
            const userPosts = await Promise.all(userPostsPromises);
            setUserPosts(userPosts);

            const { data: albums } = await axios.get<Album[]>('https://jsonplaceholder.typicode.com/albums');
            setLoading(true);
            const userAlbumsPromises = albums.filter(album => album.userId === userToken).map(async(album) => { // not ideal due to double iteration, can optimize
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
            <h2 onClick={() => setShowPosts(!showPosts)} className="center-text">Show {showPosts ? 'Albums' : 'Posts'}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {showPosts ? userPosts.map(({ id, title, body, imageUrl }) => {
                    return (
                        <Card key={id} title={title} body={body} imageUrl={imageUrl || ''} />
                    )
                }) : userAlbums.map(({ id, title, imageUrl }) => {
                    return (
                        <Card key={id} id={id} title={title} imageUrl={imageUrl || ''} />
                    )
                })}
            </div>
        </div>
    )
}

export default Gallery;