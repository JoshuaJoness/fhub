import React, { useState } from 'react';
import axios from 'axios';
import { uuid } from 'uuidv4';
import { Comment } from '../views/galleries';

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
        // TODO set max char limit on input
        setUserComment(userInput)
    }
    const handleTitleInput = (userInput: string) => {
        // TODO set max char limit on input
        setUserCommentTitle(userInput)
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
        <div className="card-container" style={{ width: 500, height: hideInput ? undefined : 720 }}>
            <div className="flex-space-between" style={{ padding: '0px 10px 0px 10px', height: 150, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ height: 60, padding: '0px 10px 0px 10px'  }}>
                    {capitalizeFirstWord(title)}
                </h3>
                <span>{username}</span>
                <span>{date?.toLocaleDateString("en-US")}</span>
            </div>
            <div style={{ padding: 10, height: 100 }}>{body}</div>
            <div style={{ height: 200, overflow: 'scroll', overflowX: 'hidden', backgroundColor: '#000', padding: 10 }}>
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
            {hideInput ? null : 
            <div style={{ height: 150 }}>
                <input
                    placeholder="A Really Cool Title!" 
                    style={{ display: 'block', margin: 15, border: 'none', borderBottom: '1px solid #000' }} 
                    value={userCommentTitle} 
                    onChange={e => handleTitleInput(e.target.value)}
                />
                <textarea
                    placeholder="An awesome cool story that I'm about to tell..." 
                    style={{ resize: 'none', height: 100, marginLeft: 15, backgroundColor: '#eee', width: '80%' }} 
                    value={userComment} 
                    onChange={e => handleInput(e.target.value)} 
                />
                <button 
                    style={{ display: 'block', margin: '15px auto 15px auto', fontSize: 20, }} 
                    onClick={() => handleSubmit()}
                >POST</button>
            </div>}
        </div>
    )}

export default Card;