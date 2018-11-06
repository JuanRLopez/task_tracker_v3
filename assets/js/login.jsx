import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';

function Login(props) {
  return <div className="row">
      <div className="col-6">
        <div className="form">
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <button className="btn btn-secondary">Login</button>
        </div>
      </div>
    </div>;
}

export default connect((state) => {return state})(Login);
