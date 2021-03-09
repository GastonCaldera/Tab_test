import firebase from '../config/firebase'

import { validateUrl } from './validation'

export const getUser = async (uid) => {
    try {
        const db = firebase.firestore()
        const snapshot = await db.collection('users').where('userUID', '==', uid).get()
        let user = {}
        snapshot.forEach(doc => {
            user = {
                id: doc.id,
                uid: doc.data().uid,
                email: doc.data().email,
                twitterLink: doc.data().twitterLink,
                instagramLink: doc.data().instagramLink,
                facebookLink: doc.data().facebookLink
            }
        });
        return user
    } catch (error) {
        console.log(error)
    }
}

export const updatedUser = async (id, facebookLink, instagramLink, twitterLink) => {
    try {

        const result = validateUrl(facebookLink, instagramLink, twitterLink)
        if (result.status) {
            const db = firebase.firestore()
            await db.collection('users').doc(id).update({
                twitterLink, instagramLink, facebookLink
            })

            return result
        }
        return result
    } catch (error) {
        console.log(error)
    }
}
