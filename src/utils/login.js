import validator from 'validator'
import firebase from '../config/firebase'

export const signIn = async (email, password) => {
    try {
        if (!validator.isEmail(email)) {
            return { error: "Please insert a valid email", status: false }
        }
        const result = await firebase.auth().signInWithEmailAndPassword(email, password)
        return { error: "", status: true, uid: result.user.uid }
    } catch (error) {
        return { error: "Email or Password incorrect", status: false }
    }
}

export const signOut = async (email, password) => {
    try {
        await firebase.auth().signOut()
    } catch (error) {
        console.log(error)
    }
}