import validator from 'validator'
import firebase from '../config/firebase'

export const validateCreateUser = async (email, password) => {
    try {
        if (!validator.isEmail(email)) {
            return { error: "Please insert a valid email", status: false }
        } else if (password.length <= 7) {
            return { error: "Password must be 8 characters or more", status: false }
        }

        const db = firebase.firestore()
        const createUserLogin = await firebase.auth().createUserWithEmailAndPassword(email, password)

        const createUserDoc = await db.collection(`users`).doc()
        await createUserDoc.set({
            userUID: createUserLogin.user.uid,
            email,
            password,
            facebookLink: '',
            instagramLink: '',
            twitterLink: '',
        })
        
        return { error: "", status: true, uid: createUserLogin.user.uid }
    } catch (error) {
        return { error: error.message, status: false }
    }
}

export const validateUrl = (facebookLink, instagramLink, twitterLink) => {
    if (!validator.isURL(facebookLink) || !facebookLink.startsWith('https://www.facebook.com/')){
        return { error: "Please insert a valid Facebook url.", status: false }
    }
    if (!validator.isURL(instagramLink) || !instagramLink.startsWith('https://www.instagram.com/')){
        return { error: "Please insert a valid Instagram url.", status: false }
    }
    if (!validator.isURL(twitterLink) || !twitterLink.startsWith('https://twitter.com/')){
        return { error: "Please insert a valid Twitter url.", status: false }
    }

    return { error: "", status: true }
}