import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { User } from './types';

const Login = (props: any) => {
    const [username, setUsername] = useState<EventTarget | string>('');
    const [err, setErr] = useState(false);
    const [verified, setVerified] = useState(false);

    const history = useHistory();

    const submitHandler = async (e: any) => { // TODO find correct type for 'e'
        e.preventDefault();

        const invalidUsername = !username || (typeof username === 'string' && username.split('').length === 0);
        if (invalidUsername)
            setErr(true);
       
        const { data: users } = await axios.get('https://jsonplaceholder.typicode.com/users');
        const match = users.find((user: User) => user.username === username);
        if (match) {
            localStorage.setItem('userId', JSON.stringify(match.id));
            // setVerified(true);
            console.log(history)
            history.push({ pathname:'/' })
        }
    };

    useEffect(() => {
        console.log(verified, 'VERIFIED')
    }, [verified])

    return (
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