import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser } from '../../store/actions/auth';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../store/actions/auth';

const AuthLinks = ({
  logoutUser,
  getCurrentUser,
  account: { loggedUser, loading },
  initials
}) => {
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <div>
      <ul>
        <li>
          <NavLink to='/accounts'>All Accounts</NavLink>
        </li>
        <li>
          <NavLink to='/dashboard'>Dashboard</NavLink>
        </li>
        <li>
          <Link to='/' onClick={logoutUser}>
            Logout
          </Link>
        </li>
        <li>
          <NavLink to='/' className='btn btn-floating indigo'>
            {!loading && loggedUser && loggedUser.initials}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

AuthLinks.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    account: state.account
  };
};

export default connect(
  mapStateToProps,
  { logoutUser, getCurrentUser }
)(AuthLinks);
