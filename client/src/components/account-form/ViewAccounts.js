import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAccounts } from '../../store/actions/accounts';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const ViewAccounts = ({ location, history, fetchAccounts, accounts: { accounts, loading } }) => {
  const [formData, setFormData] = useState({
    inputValue: ''
  });

  // console.log(loading, accounts)

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
    // fetchAccounts(query);
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
        <div className='row'>
          <div className='col s12'>
            {accounts && accounts.length > 0 ? (
              accounts.map(account => (
                <ul key={account._id} className='collection with-header'>
                  <li className='collection-header'>
                    <div className='row valign-wrapper'>
                      <div className='col s8'>
                        <h4>{account.title}</h4>
                      </div>
                      <div className='col s2'>
                        <button className='btn'>Edit</button>
                      </div>
                      <div className='col s2'>
                        <button className='btn red'>Delete</button>
                      </div>
                    </div>
                  </li>
                  {account.meta.map(metaItem => (
                    <li key={metaItem._id} className='collection-item'>
                      <Link
                        to={`/accounts/${metaItem._id}`}
                        className='grey-text text-darken-2'
                      >
                        {metaItem.content}
                      </Link>
                    </li>
                  ))}
                  <div className='section card-action grey lighten-4 grey-text date-info'>
                    <div>Account created by {account.user.name}</div>
                    <div>
                      {<Moment format='YYYY/MM/DD'>{account.date}</Moment>}
                    </div>
                  </div>
                </ul>
              ))
            ) : (
              <div>Type to search</div>
            )}
          </div>
        </div>
      </form>
    </Fragment>
  );
};

ViewAccounts.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  accounts: state.account
});

export default connect(
  mapStateToProps,
  { fetchAccounts }
)(ViewAccounts);
