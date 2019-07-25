import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthLinks from './AuthLinks';
import GuestLinks from './GuestLinks';
import { getCurrentUser } from '../../store/actions/auth';

// import M from 'materialize-css';

const Navbar = ({
  auth: { isAuthenticated, loading },
  getCurrentUser,
  profile
}) => {
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const initials =
    !profile.loading && profile.profile !== null
      ? profile.profile.initials
      : null;

  const links = isAuthenticated ? (
    <AuthLinks initials={initials} />
  ) : (
    <GuestLinks />
  );

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
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(Navbar);
