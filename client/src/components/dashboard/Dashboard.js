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
      <h3 className='indigo-text'>Dashboard</h3>
      <div>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </div>
      <Link to='/create-account' className='btn waves-effect indigo'>
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
