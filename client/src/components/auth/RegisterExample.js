import React, { Fragment, useState } from 'react';
import 'materialize-css/dist/js/materialize';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onFormSubmit = async e => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password
    };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(newUser);

    const res = await axios.post('/api/users', body, config);
  };

  return (
    <Fragment>
      <h3 className='indigo-text'>Sign Up</h3>
      <p className='lead'>
        <i className='fas fa-user' /> Create Your Account
      </p>
      <form className='form' onSubmit={e => onFormSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            required
            value={name}
            onChange={e => onInputChange(e)}
            autoComplete='off'
          />
        </div>
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
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            required
            minLength='6'
            value={password2}
            onChange={e => onInputChange(e)}
            autoComplete='off'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <a href='login.html'>Sign In</a>
      </p>
    </Fragment>
  );
};

export default Register;
