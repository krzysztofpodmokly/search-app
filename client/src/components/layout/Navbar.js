import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthLinks from './AuthLinks';
import GuestLinks from './GuestLinks';

// import M from 'materialize-css';

const Navbar = ({ auth: { isAuthenticated, loading, user } }) => {
  // const userName = isAuthenticated && !loading ? user.name.split(' ') : null;
  // const [first, last] = userName;
  // const initials = `${first.charAt(0)}${last.charAt(0)}`;
  // console.log(userName);

  const links = isAuthenticated ? <AuthLinks /> : <GuestLinks />;

  return (
    <nav className='nav-wrapper grey darken-2'>
      <div className='container'>
        <Link to='/' className='brand-logo'>
          Logo
        </Link>
        {!loading && links}
      </div>
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
