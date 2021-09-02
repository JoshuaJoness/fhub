import React, { useState } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { User } from './types';

const Login = () => {
    const [username, setUsername] = useState<EventTarget | string>('');
    const [err, setErr] = useState(false);
    const [verified, setVerified] = useState(false);

    const submitHandler = async (e: any) => { // TODO find correct type for 'e'
        if (!username || (typeof username === 'string' && username.split('').length === 0))
            setErr(true);
        e.preventDefault();
        const { data: users } = await axios.get('https://jsonplaceholder.typicode.com/users');
        const match = users.find((user: User) => user.username === username);
        if (match) {
            localStorage.setItem('loginToken', JSON.stringify(match.id));
            setVerified(true);
        }
    };

    return verified ? <Redirect to="/" /> : (
        <div style={{ textAlign: 'center', marginTop: '30vh' }}>
            <h1>LOGIN</h1>
            <form 
                onChange={(e: any) => {
                    setErr(false);
                    setUsername(e.target.value);
                }} 
                onSubmit={e => submitHandler(e)} 
            >
                <div style={{ display: 'block',marginLeft: 'auto', marginRight: 'auto' }}>
                    <span style={{ display: 'block' }}>Login</span>
                    <input />
                </div>
                <span style={{ display: 'block', visibility: err ? 'visible' : 'hidden' }} >Please enter a username</span>
                <button>LOGIN</button>
            </form>
        </div>
    )
}

export default Login;