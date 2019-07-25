import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser } from '../../store/actions/auth';
import { connect } from 'react-redux';

const AuthLinks = ({ logoutUser, initials }) => {
  return (
    <div>
      <ul className='right hide-on-med-and-down'>
        <li>
          <NavLink to='/create'>Add Account</NavLink>
        </li>
        <li>
          <Link to='/' onClick={logoutUser}>
            Logout
          </Link>
        </li>
        <li>
          <NavLink to='/' className='btn btn-floating indigo'>
            {initials}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

AuthLinks.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { logoutUser }
)(AuthLinks);
