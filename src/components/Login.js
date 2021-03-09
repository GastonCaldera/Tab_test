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
    <div className="login">
      <div className="header"></div>
      <div className="login__container">
        <div className="login__container_header">
          <hi className="login__header__title">Loing</hi>
        </div>
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
        {validation.status ? "" : <h1 className="error__container">{validation.error}</h1>}
        <div className="login__footer">
          <button className="login__botton" type="button" onClick={handleClickLoing}>LogIn</button>
          <button className="login__botton" type="button" onClick={handleClickSignIn}>Create New Account</button>
        </div>
      </div>
    </div >
  );
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: (email, password) => dispatch(startLogin(email, password))
});


export default connect(undefined, mapDispatchToProps)(Login);

