import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAccounts } from '../../store/actions/accounts';
import PropTypes from 'prop-types';

const ViewAccounts = ({ location, history, fetchAccounts }) => {
  const [formData, setFormData] = useState({
    inputValue: ''
  });

  const getParams = location => {
    const searchParams = new URLSearchParams(location.search);
    return {
      query: searchParams.get('query') || ''
    };
  };

  const setParams = ({ query = '' }) => {
    const searchParams = new URLSearchParams();
    searchParams.set('query', query);
    return searchParams.toString();
  };

  const updateURL = () => {
    const url = setParams({ query: inputValue });
    history.push(`?${url}`);
  };

  const { inputValue } = formData;

  const { query } = getParams(location);

  const onInputChange = e => {
    setFormData({
      inputValue: e.target.value
    });
  };

  const onFormSubmit = e => {
    e.preventDefault();
    fetchAccounts(query);
  };

  return (
    <Fragment>
      <h4 className='indigo-text'>Type to search</h4>
      <form className='form' onSubmit={e => onFormSubmit(e)}>
        <div className='row'>
          <div className='col s9'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Account Title'
                name='term'
                value={inputValue}
                autoComplete='off'
                onChange={e => onInputChange(e)}
              />
            </div>
          </div>
          <div className='col s3'>
            <button onClick={() => updateURL()} className='btn indigo'>
              Submit
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

ViewAccounts.propTypes = {};

export default connect(
  null,
  { fetchAccounts }
)(ViewAccounts);
