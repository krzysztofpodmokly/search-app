import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createOrUpdateAccount } from '../../store/actions/accounts';

const EditAccount = props => {
  const [formData, setFormData] = useState({});
  return <div />;
};

EditAccount.propTypes = {};

export default EditAccount;
