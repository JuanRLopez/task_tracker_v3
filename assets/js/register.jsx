import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import api from './api';

export default function Register(props) {
  return <div className="row">
      <div className="col-6">
        <h1>Register</h1>
        <div className="form">
          <input type="text" placeholder="username" id="username" className="form-control"/>
          <input type="password" placeholder="password" id="password" className="form-control"/>
          <div>
	    <Link to={"/login"} className="btn btn-primary"
              onClick={() => api.create_user($("#username").val(), $("#password").val())}>Register</Link>
	    <Link to={"/login"} className="btn btn-secondary">Back</Link>
          </div>
        </div>
      </div>
    </div>;
}

