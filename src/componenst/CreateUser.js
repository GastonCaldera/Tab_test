import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { validateCreateUser } from '../utils/validation'

const CreateUser = () => {
  let history = useHistory();
  let [user, setUser] = useState({ email: "", password: "" })
  let [validation, setValidation] = useState({ error: "", status: false })

  const handleCreateUser = async () => {
    try {
      const result = await validateCreateUser(user.email, user.password)

      setValidation({
        error: result.error,
        status: result.status
      })

      if (result.status) {
        history.push("/dashboard", [{ email: user.email, uid: result.uid }]);
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = () => {
    history.push("/");
  }

  return (
    <div className="Login">
      <div className="Login__header">
        <hi className="Login__header__title">Create Account</hi>
      </div>
      <div className="Login__container">
        <input
          className="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        ></input>
        <input
          className="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        ></input>
        {validation.status ? "" : <h2>{validation.error}</h2>}
      </div>
      <div className="Login__footer">
        <button className="Login__botton" type="button" onClick={handleClick}>cancel</button>
        <button className="Login__botton" type="button" onClick={handleCreateUser}>Submit</button>
      </div>
    </div>
  );
}

export default CreateUser;