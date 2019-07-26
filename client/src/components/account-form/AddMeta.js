import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const AddMeta = ({ index, meta, handleChange }) => {
  const contentText = `content-${index}`;
  const contentNum = `contentNum-${index}`;
  const details = `details-${index}`;
  const tags = `tags-${index}`;
  return (
    <Fragment>
      <h3 className='indigo-text'>Add Meta - {index + 1}</h3>
      <div className='form-group'>
        <input
          type='text'
          placeholder='Content Text'
          name='content'
          value={meta.content || ''}
          onChange={e => handleChange(e, index)}
          autoComplete='off'
        />
      </div>
      <div className='form-group'>
        <input
          type='text'
          placeholder='Content Number'
          name='contentNum'
          value={meta.contentNum || ''}
          onChange={e => handleChange(e, index)}
          autoComplete='off'
        />
      </div>
      <div className='form-group'>
        <textarea
          type='text'
          placeholder='Details'
          name='details'
          value={meta.details || ''}
          onChange={e => handleChange(e, index)}
          autoComplete='off'
        />
      </div>
      <div className='form-group'>
        <input
          type='text'
          placeholder='Tags'
          name='tags'
          value={meta.tags || ''}
          onChange={e => handleChange(e, index)}
          autoComplete='off'
        />
      </div>
    </Fragment>
  );
};

AddMeta.propTypes = {};

export default connect(null)(withRouter(AddMeta));
