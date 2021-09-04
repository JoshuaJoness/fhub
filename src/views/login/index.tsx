import React, {  useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { User } from './types';

const Login = () => {
    const [username, setUsername] = useState<EventTarget | string>('');
    const [err, setErr] = useState(false);
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
            history.push({ pathname:'/' })
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '30vh' }}>
            <Helmet>
                <title>Log In</title>
            </Helmet>
            <h1 className="title" style={{ position: 'absolute', top: 0, left: 30, fontSize: 48 }}>PHOTOAPPY</h1>
            <form 
                onChange={(e: any) => {
                    setErr(false);
                    setUsername(e.target.value);
                }} 
                onSubmit={e => submitHandler(e)} 
            >
                <div style={{ display: 'block',marginLeft: 'auto', marginRight: 'auto' }}>
                    <input className="login-input" style={{  border: 'none', borderBottom: '1px solid black' }} placeholder="user4000" />
                </div>
                <span style={{ display: 'block', visibility: err ? 'visible' : 'hidden' }} >Please enter a username</span>
                <button className="button">LOGIN</button>
            </form>
        </div>
    )
}

export default Login;