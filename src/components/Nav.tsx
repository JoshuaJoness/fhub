import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="flex-space-between" style={{ padding: 30 }}>
            <Link to='/'>
                PHOTOAPPY
            </Link>
            <Link to='/gallery'>
                My Gallery
            </Link>
        </div>
    )
}

export default Nav;