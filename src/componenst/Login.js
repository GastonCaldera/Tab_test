import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { startLogin } from '../actions/auth';

const Login = ({ startLogin }) => {
  let history = useHistory();
  let [user, setUser] = useState({ email: "", password: "" })
  let [validation, setValidation] = useState({ error: "", status: false })

  const handleClickLoing = async () => {
    const result = await startLogin(user.email, user.password)
    setValidation({
      error: result.error,
      status: result.status,
    })
    if (result.status) {
      history.push("/dashboard", [{ email: user.email, uid: result.uid }]);
    }
  }
  const handleClickSignIn = () => {
    history.push("/createUser");
  }

  return (
    <div className="Login">
      <div className="Login__header">
        <hi className="Login__header__title">Welcome</hi>
      </div>
      <div className="Login__container">
        <input
          className="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        ></input>
        <input
          autocomplete="off"
          className="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
          type="password"
        ></input>
        {validation.status ? "" : <h2>{validation.error}</h2>}
      </div>
      <div className="Login__footer">
        <button className="Login__botton" type="button" onClick={handleClickLoing}>LogIn</button>
        <button className="Login__botton" type="button" onClick={handleClickSignIn}>Create New Account</button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: (email, password) => dispatch(startLogin(email, password))
});


export default connect(undefined, mapDispatchToProps)(Login);

