import React, { useState } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';

type Address = {
    city: string;
    geo: {
        lat: string; 
        lng: string;
    }
    street: string;
    suite: string;
    zipcode: string;
}

type Company = {
    bs: string;
    catchPhrase: string;
    name: string;
}

type User = {
    address: Address,
    company: Company,
    email: string;
    id: number;
    name: string;
    phone: string;
    username: string;
    website: string;
    
}

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
            localStorage.setItem('loginToken', JSON.stringify(Math.random()));
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