import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../global.css';

const Nav = () => {
    const [logout, setLogout] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        setLogout(true);
    }

    return logout ? <Redirect to="/login" /> : (
        <div className="flex-space-between title" style={{ padding: 30, flexWrap: 'wrap', backgroundColor: '#36453B' }} aria-label="navigation-bar">
            <Link to='/' className="app-title">
                PHOTOAPPY
            </Link>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <Link to='/albums' style={{ margin: '0px 20px' }}>
                    <i className="far fa-images" />
                </Link>
                <Link to='/posts' style={{ margin: '0px 20px' }}>
                    <i className="fas fa-keyboard" />
                </Link>
                <span 
                    className="link" 
                    style={{ marginLeft: 20 }}
                    onClick={() => handleLogout()}
                >
                    LOG-OUT
                </span>
            </div>

        </div>
    )
}

export default Nav;