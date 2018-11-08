import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import api from './api';

export default function Login(props) {
  return <div className="row">
      <div className="col-6">
        <div className="form">
          <input type="text" placeholder="username" id="username"/>
          <input type="password" placeholder="password" id="password"/>
          <Link to={"/"} className="btn btn-primary"
            onClick={() => api.create_session($("#username").val(), $("#password").val())}>Login</Link>
          <span><Link to={"/register"}>or register</Link></span>
        </div>
      </div>
    </div>;
}

//export default connect((state) => {return state})(Login);
