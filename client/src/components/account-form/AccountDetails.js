import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAccountDetails } from '../../store/actions/accounts';
import Spinner from '../../components/layout/Spinner';
import PropTypes from 'prop-types';

const AccountDetails = ({
  match,
  account: { account, loading },
  meta,
  fetchAccountDetails
}) => {
  // const accountMetaId = match.params.accountId;

  // useEffect(() => {
  //   fetchAccountDetails(accountMetaId);
  //   return () => {
  //     fetchAccountDetails(accountMetaId);
  //   };
  // }, [accountMetaId]);

  console.log(account)
  console.log(meta !== null && !loading && meta);

  return loading && meta === null ? (
    <Spinner />
  ) : (
    <div className='container'>
      <Link to='/accounts'>
        <div>Go Back</div>
      </Link>
      <div className='row'>
        <div className='col s12'>
          {account !== null && !loading && meta !== null && (
            <div className='section'>
              <div className='card-panel light-blue darken-3 center'>
                <h4 className='white-text'>{account.title}</h4>
              </div>
              <div className='card-panel light-blue darken-2 center'>
                <h5 className='white-text'>
                  {meta.contentNum} - {meta.content}
                </h5>
              </div>
              <div className='card-panel light-blue darken-1 center'>
                <p className='white-text'>{meta.details}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

AccountDetails.propTypes = {};

const mapStateToProps = (state, ownProps) => {
  const accountId = ownProps.match.params.accountId;
  const allMetaItems = state.account.accounts.length > 0 && state.account.accounts.map(account => account.meta);
  
  console.log(allMetaItems);
  const newArr = [];
  allMetaItems.length > 0 && allMetaItems.forEach(item => {
    return newArr.push(item.find(i => i._id === accountId))
  });
  const meta = newArr.find(item => item !== undefined);
  
  return {
    account: state.account,
    meta: meta
  };
};

export default connect(
  mapStateToProps,
  { fetchAccountDetails }
)(AccountDetails);
