import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAccountDetails } from '../../store/actions/accounts';
import Spinner from '../../components/layout/Spinner';

const AccountDetails = ({
  match,
  account: { accounts, loading },
  meta,
  fetchAccountDetails
}) => {
  const accountMetaId = match.params.accountId;

  useEffect(() => {
    fetchAccountDetails(accountMetaId);
  }, [fetchAccountDetails, accountMetaId]);

  return loading && meta === undefined ? (
    <Spinner />
  ) : (
    <div className='container'>
      <Link to='/accounts' className='btn-go-back'>
        <div className='go-back btn indigo'>Go Back</div>
      </Link>
      <div className='row'>
        <div className='col s12'>
          <div className='section'>
            <div className='card-panel light-blue darken-2 center'>
              <h5 className='white-text'>
                {meta.contentNum} - {meta.content}
              </h5>
            </div>
            <div className='card-panel light-blue darken-1 center'>
              <p className='white-text'>{meta.details}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const accountId = ownProps.match.params.accountId;
  const allMetaItems =
    state.account.accounts.length > 0 &&
    state.account.accounts.map(account => account.meta);

  const newArr = [];
  allMetaItems.length > 0 &&
    allMetaItems.forEach(item => {
      return newArr.push(item.find(i => i._id === accountId));
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
