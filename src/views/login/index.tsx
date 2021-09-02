import React, { useState } from 'react';
import axios from 'axios';

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

    const submitHandler = async (e: any) => { // TODO find correct type
        e.preventDefault()
        const { data: users } = await axios.get('https://jsonplaceholder.typicode.com/users');
        const match = users.find((user: User) => user.username === username);
        console.log(match)
        // get data
        // if (username) in data
        // set token ? redirect ? 
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '30vh' }}>
            <h1>LOGIN</h1>
            <form 
                onChange={(e: any) => {
                    setUsername(e.target.value)
                }} 
                onSubmit={e => submitHandler(e)} 
                // style={{ textAlign: 'center' }}
            >
                <div style={{ display: 'block',marginLeft: 'auto', marginRight: 'auto' }}>
                    <span style={{ display: 'block' }}>Login</span>
                    <input />
                </div>
                <button>LOGIN</button>
            </form>
        </div>
    )
}

export default Login;