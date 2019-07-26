import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createAccount } from '../../store/actions/accounts';
import AddMeta from './AddMeta';

class CreateAccount extends React.Component {
  state = {
    title: '',
    titleNum: '',
    meta: [
      {
        content: '',
        contentNum: '',
        details: '',
        tags: ''
      }
    ]
  };
  render() {
    const handleChange = (e, index) => {
      const { name, value } = e.target;
      let meta = [...this.state.meta];
      meta[index] = { ...meta[index], [name]: value };
      this.setState({ meta });
    };

    const handleAddInput = e => {
      this.setState(prevState => ({
        meta: [
          ...prevState.meta,
          { content: '', contentNum: '', details: '', tags: '' }
        ]
      }));
    };

    const onFormSubmit = e => {
      e.preventDefault();
      console.log(this.state);
      // createAccount(formData, history);
    };

    const renderList = this.state.meta.map((item, index) => {
      return (
        <AddMeta
          key={index}
          index={index}
          meta={item}
          handleChange={e => handleChange(e, index)}
        />
      );
    });

    return (
      <Fragment>
        <h3 className='indigo-text'>Create Account</h3>
        <form className='form' onSubmit={e => onFormSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Account Title'
              name='title'
              value=''
              autoComplete='off'
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Account Number'
              name='titleNum'
              value=''
              autoComplete='off'
            />
          </div>
          {renderList}
          <button onClick={e => handleAddInput(e)} className='btn waves-effect'>
            Add Meta Content
          </button>
          <button onClick={e => onFormSubmit(e)} className='btn'>
            Submit
          </button>
        </form>
        {/* <AddMeta /> */}
      </Fragment>
    );
  }
}

CreateAccount.propTypes = {
  // createAccount: PropTypes.func.isRequired
};

// const mapStateToProps = (state, ownProps) => ({

// })

export default connect(
  null,
  { createAccount }
)(withRouter(CreateAccount));
