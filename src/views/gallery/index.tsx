import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FetchImage } from 'random-image-unsplash';
import '../../global.css';

type Post =  {
    userId: number;
    id: number;
    title: string;
    body: string;
    imageUrl?: string;
}

const capitalizeFirstWord = (title: string) => {
    return title.split('').map((char, idx) => {
        if (idx === 0) {
            return char.toUpperCase();
        }
        return char;
    }).join('');
};

const Gallery = () => {
    const [hovering, setHovering] = useState(false);
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    useEffect(() => {
        async function getUsers() {
            const { data: posts } = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
            const userToken = Number(localStorage.getItem('loginToken'));
            const filteredPostsPromises = posts.filter(post => post.userId === userToken).map(async(post) => {
                const imageUrl = await FetchImage({ type: 'user', width: 1000, height: 500 }).then((image: string) => image);
                return { 
                    ...post, 
                    imageUrl 
                }
            }); // not ideal due to double iteration, can optimize

            const filteredPosts = await Promise.all(filteredPostsPromises);
            
            setUserPosts(filteredPosts);
            }
        getUsers();
    }, []);

    return (
        <div>
            <h1>Gallery</h1>
            {userPosts.map(({ title, body, imageUrl }) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '50vw' || 300, margin: 30 }}>
                            <img src={imageUrl} style={{ width: '100%', verticalAlign: 'bottom', border: '1px solid black', borderBottom: 'none' }} alt="Randomly generated from Unsplash." />
                            <div style={{ border: '1px solid black', width: '100%' }}>
                                <h1 style={{ padding: '0px 10px 0px 10px', paddingLeft: 100 }}>{capitalizeFirstWord(title)}</h1>
                                <p style={{ padding: '0px 100px 0px 100px' }}>{body}</p>
                            </div>
                            
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Gallery;