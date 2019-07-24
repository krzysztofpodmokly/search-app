import React from 'react';
import { Link } from 'react-router-dom';
// import M from 'materialize-css';

const Navbar = () => {
  return (
    <nav className='nav-wrapper grey darken-2'>
      <div className='container'>
        <Link to='/' className='brand-logo'>
          Logo
        </Link>
        <ul className='right hide-on-med-and-down'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
