import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';

export default function Register(props) {
  return <div className="row">
      <div className="col-6">
        <div className="form">
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <Link to={"/login"} className="btn btn-primary"
            onClick={() => api.create_user($("#username").val(), $("#password").val())}>Register</Link>
        </div>
      </div>
    </div>;
}

//export default connect((state) => {return state;})(Register);
