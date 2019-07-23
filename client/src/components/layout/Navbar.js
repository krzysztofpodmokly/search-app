import React from 'react';
// import M from 'materialize-css';

const Navbar = () => {
  return (
    <nav className='nav-wrapper grey darken-2'>
      <div className='container'>
        <a href='#' className='brand-logo'>
          Logo
        </a>
        <ul className='right hide-on-med-and-down'>
          <li>
            <a href='#!'>Home</a>
          </li>
          <li>
            <a href='#!'>Register</a>
          </li>
          <li>
            <a href='#!'>Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
