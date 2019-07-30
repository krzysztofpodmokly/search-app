import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const GuestLinks = props => {
  return (
    <div>
      <ul className='right'>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/accounts'>All Accounts</NavLink>
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

GuestLinks.propTypes = {};

export default GuestLinks;
