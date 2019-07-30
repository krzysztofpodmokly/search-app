import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../store/actions/auth';

const Dashboard = ({
  auth: { user },
  account: { loading, account },
  getCurrentUser
}) => {
  useEffect(() => {
    getCurrentUser();
  }, []);

  return loading && account === null ? (
    <Spinner />
  ) : (
    <div>
      <div>
        <h4 className='grey-text text-darken-2'>Welcome {user && user.name}</h4>
      </div>
      <h3 className='indigo-text'>Dashboard</h3>
      <Link to='/create-account' className='btn waves-effect'>
        Create Account
      </Link>
    </div>
  );
};

Dashboard.propTypes = {
  account: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  account: state.account,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(Dashboard);
