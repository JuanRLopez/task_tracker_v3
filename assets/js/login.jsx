import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import api from './api';

export default function Login(props) {
  return <div className="row">
      <div className="col-6">
	<h1>Login</h1>
	<div className="alert alert-danger" role="alert" id="login-alert" style={{display:'none'}}>
	  Login failed. Incorrect username or password.
        </div>
        <div className="form">
          <input type="text" placeholder="username" id="username" className="form-control"/>
          <input type="password" placeholder="password" id="password" className="form-control"/>
          <div>
	    <button className="btn btn-primary"
              onClick={() => api.create_session($("#username").val(), $("#password").val())}>Login</button>
          </div>  
	  <div><Link to={"/register"}>or register</Link></div>
        </div>
      </div>
    </div>;
}

