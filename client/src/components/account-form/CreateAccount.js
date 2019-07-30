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
    const { title, titleNum } = this.state;

    const handleChange = (e, index) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });

      let meta = [...this.state.meta];
      meta[index] = { ...meta[index], [name]: value };
      this.setState({ meta });
    };

    const handleAddInput = () => {
      this.setState(prevState => ({
        meta: [
          ...prevState.meta,
          { content: '', contentNum: '', details: '', tags: '' }
        ]
      }));
    };

    const handleRemove = index => {
      let meta = [...this.state.meta];
      meta.splice(index, 1);
      this.setState({ meta });
    };

    const onFormSubmit = e => {
      e.preventDefault();
      this.props.createAccount(this.state, this.props.history);
    };

    const renderList = this.state.meta.map((item, index) => {
      return (
        <AddMeta
          key={index}
          index={index}
          meta={item}
          handleChange={e => handleChange(e, index)}
          handleRemove={() => handleRemove(index)}
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
              value={title}
              autoComplete='off'
              onChange={e => handleChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Account Number'
              name='titleNum'
              value={titleNum}
              autoComplete='off'
              onChange={e => handleChange(e)}
            />
          </div>
          {renderList}
        </form>
        <div className='content-box'>
          <div className='row'>
            <div className='col s6'>
              <button
                onClick={e => handleAddInput(e)}
                className='btn waves-effect'
              >
                Add Meta Content
              </button>
            </div>
          </div>
          <div className='row'>
            <div className='col s6'>
              <button
                onClick={e => onFormSubmit(e)}
                className='btn btn-large indigo'
              >
                Submit
              </button>
            </div>
          </div>
        </div>
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
