import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createAccount } from '../../store/actions/accounts';
import AddMeta from './AddMeta';

const CreateAccount = ({ createAccount, history }) => {
  const [formData, setFormData] = useState({
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
  });

  const { title, titleNum, meta } = formData;

  const handleMainChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubChange = (e, index) => {
    const { name, value } = e.target;
    let metaContent = [...meta];
    metaContent[index] = { ...metaContent[index], [name]: value };
    setFormData({ ...formData, meta: metaContent });
  };

  const handleAddInput = () => {
    setFormData(prevState => ({
      meta: [
        ...prevState.meta,
        { content: '', contentNum: '', details: '', tags: '' }
      ]
    }));
  };

  const handleRemove = index => {
    let metaContent = [...meta];
    metaContent.splice(index, 1);
    setFormData({ meta: metaContent });
  };

  const onFormSubmit = e => {
    e.preventDefault();
    createAccount(formData, history);

    console.log('submitted');
  };

  const renderList = meta.map((item, index) => {
    return (
      <AddMeta
        key={index}
        index={index}
        meta={item}
        handleChange={e => handleSubChange(e, index)}
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
            onChange={e => handleMainChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Account Number'
            name='titleNum'
            value={titleNum}
            autoComplete='off'
            onChange={e => handleMainChange(e)}
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
};

CreateAccount.propTypes = {
  // createAccount: PropTypes.func.isRequired
};

// const mapStateToProps = (state, ownProps) => ({

// })

export default connect(
  null,
  { createAccount }
)(withRouter(CreateAccount));
