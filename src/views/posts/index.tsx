import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../components/Card';
import { Helmet } from "react-helmet";
import Nav from '../../components/Nav';
import Loader from '../../components/Loader';
import '../../global.css';

export type Post =  {
    userId: number;
    id: number;
    title: string;
    body: string;
    imageUrl?: string;
}

const Posts = () => {
    const [loading, setLoading] = useState(false);
    const [userPosts, setUserPosts] = useState<Post[]>([]);

    useEffect(() => {
        async function getUsers() {
            setLoading(true);
            const { data: posts } = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
            const userToken = Number(localStorage.getItem('userId'));
            const userPosts = posts.filter(post => post.userId === userToken);
            setUserPosts(userPosts);
            setLoading(false);
        }
        getUsers();
    }, []);

    if (loading)
        return <Loader />

    return (
        <div>
            <Helmet>
                <title>My Posts</title>
            </Helmet>
            <Nav />
            <div>
                {userPosts.map(({ id, title, body, imageUrl }) => {
                    return <Card key={id} postId={id} title={title} body={body} imageUrl={imageUrl} hideInput />
                })}
            </div>
        </div>
    )
}

export default Posts;