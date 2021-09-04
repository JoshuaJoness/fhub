import React, { useState } from 'react';
import axios from 'axios';
import { uuid } from 'uuidv4';
import { Comment } from '../views/allPosts';

type Props = {
    postId?: number;
    imageUrl?: string;
    title: string;
    body?: string;
    username?: string; // TODO make non-nullable
    email?: string; // TODO make non-nullable
    date?: Date; // TODO make non-nullable
    comments?: Comment[]; // TODO make non-nullable
    hideInput?: boolean;
}

const capitalizeFirstWord = (title: string) => {
    return title.split('').map((char, idx) => {
        if (idx === 0) {
            return char.toUpperCase();
        }
        return char;
    }).join('');
};

const Card = ({ postId, imageUrl, title, body, comments, username, email, date, hideInput }:Props) => {
    const [userComment, setUserComment] = useState('');
    const [userCommentTitle, setUserCommentTitle] = useState('');
    const handleInput = (userInput: string) => {
        setUserComment(userInput) // TODO set max char limit on input
    }
    const handleTitleInput = (userInput: string) => {
        setUserCommentTitle(userInput) // TODO set max char limit on input
    }
    const handleSubmit = async () => {
        const { status, data: newComment } = await axios.post(`https://jsonplaceholder.typicode.com/comments`, {
            postId,
            id: comments ? comments?.length + 1 : uuid(),
            name: userCommentTitle,
            email,
            body: userComment,
        })

        if (status === 201) {
            comments?.push(newComment);
            setUserComment('');
            setUserCommentTitle('');
        }
    }

    return (
        <div className="card-container" style={{ display: 'block', margin: '60px 30px' }} aria-label="content-card">
            <div className="flex-space-between" style={{ padding: 10, display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
                <span className="bold" style={{ fontSize: 25 }}>
                    {capitalizeFirstWord(title)}
                </span>
                <span className="bold" style={{ color: '#36453B' }}>{username}</span>
                <span>{date?.toLocaleDateString("en-US")}</span>
                <span>{body}</span>
            </div>
            {hideInput ? null :
            <>
                <div style={{ height: 250, overflow: 'scroll', overflowX: 'hidden', backgroundColor: '#F5F9E9', padding: 10 }}>
                {comments?.map(({ id, name, body }) => (
                        <div key={id} style={{ 
                            marginBottom: 12, 
                            padding: 5,
                            backgroundColor: '#e6e6e6',
                            border: '1px solid transparent', 
                            borderRadius: 10 }}
                        >
                            <span className="bold" style={{ display: 'block' }}>{name}</span>
                            <span>{body}</span>
                        </div>
                    )
                )}
                </div>
                <div>
                    <input
                        placeholder="A Really Cool Title!" 
                        style={{ fontSize: 22, display: 'block', margin: 15, border: 'none', borderBottom: '1px solid #515751', backgroundColor: 'transparent', height: 50 , color: '#515751' }} 
                        value={userCommentTitle} 
                        onChange={e => handleTitleInput(e.target.value)}
                    />
                    <textarea
                        placeholder="An awesome, cool story that I'm about to tell..." 
                        style={{ resize: 'none', height: 100, marginLeft: 15, backgroundColor: '#fff', width: '95%', fontSize: 20, color: '#515751', border: 'none', padding: 10 }} 
                        value={userComment} 
                        onChange={e => handleInput(e.target.value)} 
                    />
                    <button 
                        className="button" 
                        style={{ marginBottom: 30 }}
                        onClick={() => handleSubmit()}
                    >
                        POST
                    </button>
                    <div style={{ height: 30 }} />
                </div>
            </>}
        </div>
    )}

export default Card;