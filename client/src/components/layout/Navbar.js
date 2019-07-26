import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthLinks from './AuthLinks';
import GuestLinks from './GuestLinks';
// import { getCurrentUser } from '../../store/actions/auth';

// import M from 'materialize-css';

const Navbar = ({ auth: { isAuthenticated, loading } }) => {
  // useEffect(() => {
  //   getCurrentUser();
  // }, [getCurrentUser]);

  // const initials =
  //   !profile.loading && profile.profile !== null && profile.profile.initials;
  // console.log(initials);

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
