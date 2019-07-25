import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { loginUser } from '../../store/actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import 'materialize-css/dist/js/materialize';

const Login = ({ loginUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onFormSubmit = async e => {
    e.preventDefault();
    loginUser(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h3 className='indigo-text'>Login</h3>
      <p className='lead'>
        <i className='fas fa-user' />
        Login To Your Account
      </p>
      <form className='form' onSubmit={e => onFormSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            required
            value={email}
            onChange={e => onInputChange(e)}
            autoComplete='off'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            required
            minLength='6'
            value={password}
            onChange={e => onInputChange(e)}
            autoComplete='off'
          />
        </div>

        <input type='submit' className='btn btn-primary' value='login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
