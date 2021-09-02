import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '../login/types';

type Post =  {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const Gallery = () => {
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    useEffect(() => {
        async function getUsers() {
            const { data: posts } = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
            const userToken = Number(localStorage.getItem('loginToken'));
            const userPosts = posts?.filter(post => post.userId === userToken);
            console.log(userPosts,'userPosts')
            if (userPosts)
                setUserPosts(userPosts);
        }
        getUsers();
    }, []);
    useEffect(() => {
        console.log(userPosts,'user')
    }, [userPosts])
    return (
        <div>
            <h1>Gallery</h1>
            {userPosts.map(({ title, body }) => {
                return (
                    <>
                        <h1>{title}</h1>
                        <p>{body}</p>
                    </>
                )
            })}
        </div>
    )
}

export default Gallery;