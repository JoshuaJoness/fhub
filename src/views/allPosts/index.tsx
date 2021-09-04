import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../components/Card';
import { Post } from '../posts';
import { User } from '../login/types';
import '../../global.css';
import Nav from '../../components/Nav';
import Loader from '../../components/Loader';


interface PostWithComments extends Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    imageUrl?: string;
    comments: Comment[];
    username: string;
    email: string;
    date: Date;
}

export type Comment = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

const AllPosts = () => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<PostWithComments[]>([]);

    useEffect(() => {
        async function getPosts() {
            setLoading(true);
            const { data: posts } = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');

            const postCommentsPromises = posts.map(async post => {
                const { data: comments } = await axios.get<Comment[]>(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
                const { data: user } = await axios.get<User[]>(`https://jsonplaceholder.typicode.com/users?id=${post.userId}`);
                return {
                    ...post,
                    comments,
                    username: user[0].username,
                    email: user[0].email,
                    date: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)),
                }
            })

            const postComments = await Promise.all(postCommentsPromises);
            setPosts(postComments.sort((a, b) => b.date.getTime() - a.date.getTime())); // sort results by appended date
            setLoading(false);
        }
        getPosts();
    }, []);

    if (loading)
        return <Loader />

    return (
        <div>
            <Nav />
            <div>
                {posts.map(({ id, title, body, username, email, date, comments }) => 
                <Card 
                    key={id} 
                    postId={id} 
                    title={title} 
                    body={body} 
                    comments={comments} 
                    username={username} 
                    email={email} 
                    date={date} 
                /> )}
            </div>
        </div>
    )
}

export default AllPosts;