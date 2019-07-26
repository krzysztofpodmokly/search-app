import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser } from '../../store/actions/auth';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../store/actions/auth';

const AuthLinks = ({
  logoutUser,
  getCurrentUser,
  account: { account, loading }
}) => {
  useEffect(() => {
    getCurrentUser();
  }, []);

  // const initials =
  //   loading && profile === null ? 'Still loading' : profile.initials;
  // console.log(initials);
  return (
    <div>
      <ul className='right hide-on-med-and-down'>
        <li>
          <NavLink to='/dashboard'>Dashboard</NavLink>
        </li>
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
            JD
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

AuthLinks.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  account: state.account
});

export default connect(
  mapStateToProps,
  { logoutUser, getCurrentUser }
)(AuthLinks);
