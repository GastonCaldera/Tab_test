import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signOut } from '../utils/login'

const Profile = (props) => {
    let history = useHistory();
    let [links, setLinks] = useState({
        facebook: props.location.state[0].facebookLink,
        instagram: props.location.state[0].instagramLink,
        twitter: props.location.state[0].twitterLink
    })
    let [user, setUser] = useState({
        email: props.location.state[0].email,
        id: props.location.state[0].id,
        uid: props.location.state[0].uid
    })

    const handleLogout = async () => {
        await signOut()
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

export default Profile;