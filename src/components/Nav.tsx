import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 30}}>
            <Link to='/'>
                PHOTOAPPY
            </Link>
            <Link to='/my-gallery'>
                My Gallery
            </Link>
        </div>
    )
}

export default Nav;