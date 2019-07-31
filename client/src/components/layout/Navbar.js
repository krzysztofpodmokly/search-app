import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthLinks from './AuthLinks';
import GuestLinks from './GuestLinks';

const Navbar = ({ auth: { isAuthenticated, loading } }) => {
  const links = isAuthenticated ? <AuthLinks /> : <GuestLinks />;

  return (
    <nav className='nav-wrapper grey darken-2'>
      <div className='container'>{!loading && links}</div>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Navbar);
