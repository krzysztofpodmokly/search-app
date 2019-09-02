import React from 'react';
import { NavLink } from 'react-router-dom';

const GuestLinks = props => {
  return (
    <div>
      <ul className='right'>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/register'>Signup</NavLink>
        </li>
        <li>
          <NavLink to='/login'>Login</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default GuestLinks;
