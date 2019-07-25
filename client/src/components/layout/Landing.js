import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import 'materialize-css/dist/js/materialize';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h3>Searchify App</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            numquam nostrum eius consectetur similique cupiditate. Ipsam magnam
            sunt, itaque maxime repellendus placeat saepe, accusamus quibusdam
            omnis velit autem, animi beatae!
          </p>
          <div className='buttons'>
            <Link
              to='/register'
              className='btn indigo darken-1 waves-effect waves-light'
            >
              Sign Up
            </Link>
            <Link
              to='/login'
              className='btn grey darken-2 waves-effect waves-light'
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
