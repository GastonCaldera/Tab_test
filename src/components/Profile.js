import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { startLogout } from '../actions/auth';

const Profile = ({ startLogout, userState }) => {
    let history = useHistory();
    let [links, setLinks] = useState({
        facebook: userState.facebook,
        instagram: userState.instagram,
        twitter: userState.twitter
    })
    let [user, setUser] = useState({
        email: userState.email,
        id: userState.id,
        uid: userState.uid
    })

    const handleLogout = async () => {
        await startLogout()
        history.push("/");
    }

    const handleDashboard = async () => {
        history.push("/dashboard", [{ email: user.email, uid: user.uid }])
    }

    return (
        <div className="Profile">
            <div className="Profile__header">
                <button className="Login__botton" type="button" onClick={handleLogout}>Logout</button>
                <button className="Login__botton" type="button" onClick={handleDashboard}>Dashboard</button>
            </div>
            <div className="Profile__container">
                {links.facebook && links.instagram && links.twitter ? (
                    <div>
                        <h2>{user.email}</h2>
                        <ul>
                            <li>
                                <a href={links.facebook}>Facebook</a>
                            </li>
                            <li>
                                <a href={links.instagram}>Instagram</a>
                            </li>
                            <li>
                                <a href={links.twitter}>Twitter</a></li>
                        </ul>
                    </div>
                ) : (
                    <div>
                        <h2>Please update your Urls</h2>
                    </div>
                )}
            </div>
            <div className="Profile_footer">

            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userState: state.user
});

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
