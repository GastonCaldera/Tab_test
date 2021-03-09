import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';


import { startLogout } from '../actions/auth';
import { setUserAction } from '../actions/user';
import { getUser, updatedUser } from '../utils/users'

const Dashboard = ({ uid, startLogout, setUserAction }) => {
  let history = useHistory();
  let [links, setLinks] = useState({ facebook: "", instagram: "", twitter: "" })
  let [user, setUser] = useState({ email: "", uid: uid, id: "" })
  let [validation, setValidation] = useState({ error: "", status: false })

  const handleLogout = async () => {
    await startLogout()
    history.push("/");
  }

  const handleProfile = async () => {
    history.push("/profile");
  }

  const handleClickSubmit = async () => {
    const newLinks = await updatedUser(
      user.id,
      links.facebook,
      links.instagram,
      links.twitter
    )

    setValidation({
      error: newLinks.error,
      status: newLinks.status,
    })

    if (newLinks.status) {
      history.push("/profile");
    }
  }

  useEffect(async () => {
    getUser(user.uid).then((data) => {
      setLinks({ facebook: data.facebookLink, instagram: data.instagramLink, twitter: data.twitterLink })
      setUser({ ...user, email: data.email, id: data.id })
      setUserAction(data.email, data.id, uid, data.facebookLink, data.instagramLink, data.twitterLink)
    })
  }, [])

  return (
    <div className="Dashboard">
      <div className="Dashboard__header">
        <h2 className="Dashboard__header__title">Dashboard</h2>
        <button className="Dashboard__header__botton" type="button" onClick={handleLogout}>Logout</button>
        <button className="Dashboard__header__botton" type="button" onClick={handleProfile}>Profile</button>
      </div>
      <div className="Dashboard__container">
        <input
          className="facebook"
          value={links.facebook}
          onChange={(e) => setLinks({ ...links, facebook: e.target.value })}
          placeholder="Facebook"
        ></input>
        <input
          className="instagram"
          value={links.instagram}
          onChange={(e) => setLinks({ ...links, instagram: e.target.value })}
          placeholder="Instagram"
        ></input>
        <input
          className="twitter"
          value={links.twitter}
          onChange={(e) => setLinks({ ...links, twitter: e.target.value })}
          placeholder="Twitter"
        ></input>
        {validation.status ? "" : <h2>{validation.error}</h2>}
      </div>
      <div className="Dashboard_footer">
        <button className="Dashboard_footer__botton" type="button" onClick={handleClickSubmit}>Submit</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  uid: state.auth.uid
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  setUserAction: (email, id, uid, facebook, instagram, twitter) => dispatch(setUserAction(email, id, uid, facebook, instagram, twitter))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
