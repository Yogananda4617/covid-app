import React from 'react';
import { Link } from 'react-router-dom';
import "./header.css";

const Header = () => {
  return (
    <header className='header'>
        <div>
            <h1>
                <Link to="/" className='logo'>Covid App</Link>
            </h1>
        </div>
        <div className='header-links'>
            <ul>
                <li><Link to="/">Home</Link></li>
            </ul>
            <ul>
                <li><Link to="/state">State Data</Link></li>
            </ul>
            <ul>
                <li><Link to="/district" >District Data</Link></li>
            </ul>
        </div>
    </header>
  )
}

export default Header