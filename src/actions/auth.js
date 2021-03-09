import firebase from '../config/firebase'
import validator from 'validator'

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLogin = (email, password) => {
    return async () => {
        try {
            if (!validator.isEmail(email)) {
                return { error: "Please insert a valid email", status: false }
            }
            const result = await firebase.auth().signInWithEmailAndPassword(email, password)
            return { error: "", status: true, uid: result.user.uid }
        } catch (error) {
            return { error: "Email or Password incorrect", status: false }
        }
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        try {
            return firebase.auth().signOut()
        } catch (error) {
            console.log(error)
        }
    };
};