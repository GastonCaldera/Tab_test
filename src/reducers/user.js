export default (state = {}, action) => {
    switch (action.type) {
        case 'SET':
            return {
                email: action.user.email,
                id: action.user.id,
                uid: action.user.uid,
                facebook: action.user.facebook,
                instagram: action.user.instagram,
                twitter: action.user.twitter
            }
        default:
            return state
    }
}