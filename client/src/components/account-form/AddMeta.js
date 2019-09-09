import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const AddMeta = ({ index, meta, handleChange, handleRemove }) => {
  return (
    <Fragment>
      <div className='row valign-wrapper'>
        <div className='col s3'>
          <h5 className='indigo-text text-lighten-1'>Add Meta</h5>
        </div>
        <div className='col s9'>
          {/* <button onClick={() => handleRemove(index)} className='btn red'>
            Remove Meta Content
          </button> */}
        </div>
      </div>
      <div className='form-group'>
        <input
          type='text'
          placeholder='Content Text'
          name='content'
          value={meta.content}
          onChange={e => handleChange(e, index)}
          autoComplete='off'
        />
      </div>
      <div className='form-group'>
        <input
          type='number'
          placeholder='Content Number'
          name='contentNum'
          value={meta.contentNum}
          onChange={e => handleChange(e, index)}
          autoComplete='off'
        />
      </div>
      <div className='form-group'>
        <textarea
          className='materialize-textarea'
          type='text'
          placeholder='Details'
          name='details'
          value={meta.details}
          onChange={e => handleChange(e, index)}
          autoComplete='off'
        />
      </div>
      <div className='form-group'>
        <input
          type='text'
          placeholder='Tags'
          name='tags'
          value={meta.tags}
          onChange={e => handleChange(e, index)}
          autoComplete='off'
        />
      </div>
    </Fragment>
  );
};

export default connect(null)(withRouter(AddMeta));
