import React, { useState } from 'react';
import axios from 'axios';
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
}

const capitalizeFirstWord = (title: string) => {
    return title.split('').map((char, idx) => {
        if (idx === 0) {
            return char.toUpperCase();
        }
        return char;
    }).join('');
};

const Card = ({ postId, imageUrl, title, body, comments, username, email, date }:Props) => {
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
        const res = await axios.post(`https://jsonplaceholder.typicode.com/comments`, {
            postId,
            id: comments ? comments?.length + 1 : Math.random(), // TODO use UUID | GUID
            name: userCommentTitle,
            email,
            body: userComment,
        })

        console.log(res, '!!!!!!!!!!')

    }

    return (
        <div style={{ width: imageUrl ? 500 : 300, height: '100%', margin: 30 }}>
            <div style={{ border: '1px solid black', width: '100%', height: '100%' }}>
                <h3 className="ellipsis" style={{ paddingLeft: 100 }}>
                    {capitalizeFirstWord(title)}
                </h3>
                <div className="flex-space-between">
                    <span>{username}</span>
                    <span>{date?.toLocaleDateString("en-US")}</span>
                </div>
                <p>{body}</p>
                {comments?.map(({ name, body }) => {
                    return (
                        <div>
                            <span className="bold">{name}</span>
                            <span>{body}</span>
                        </div>
                    )
                })}
                <span>Title Input:</span>
                <input style={{ width: '100%' }} onChange={e => handleTitleInput(e.target.value)} />
                <textarea style={{ resize: 'none', width: '100%', height: 100 }} onChange={e => handleInput(e.target.value)} />
                <button style={{ display: 'block', marginLeft: 'auto' }} onClick={() => handleSubmit()}>POST</button>
            </div>
        </div>
    )}

export default Card;