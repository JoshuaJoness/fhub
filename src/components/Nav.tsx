import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../global.css';

const Nav = ({setShowPosts, showPosts}: {setShowPosts?:(arg1:boolean) => any, showPosts?: boolean}) => {
    const [logout, setLogout] = useState(false);
    const [screensize, setScreenSize] = useState({ width: Infinity, height: Infinity });
    
    const isAuthenticated = !!localStorage.getItem('userId');
    console.log(showPosts,'showPosts')
    const handleLogout = () => {
        localStorage.removeItem('userId');
        setLogout(true);
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            setScreenSize({ 
                width: window.innerWidth, 
                height: window.innerHeight 
            })
        })

    }, [])

    const smallScreenSize = screensize.width < 800; /* TODO UPDATE VALUE */

    return logout ? <Redirect to="/login" /> : (
        <div className="flex-space-between title" style={{ padding: 30, flexDirection:  smallScreenSize ? 'column' : undefined, }}>
            <Link to='/' className="app-title">
                PHOTOAPPY
            </Link>
            {isAuthenticated ? <>
            <Link to='/albums'>
                My Gallery
            </Link>
            <Link to='/posts'>
                My Posts
            </Link>
            <button onClick={() => handleLogout()}>LOG-OUT</button></> : null}
        </div>
    )
}

export default Nav;