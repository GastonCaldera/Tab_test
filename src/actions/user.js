export const setUserAction = (
    email,
    id,
    uid,
    facebook,
    instagram,
    twitter
) => ({
    type: 'SET',
    user: {
        email,
        id,
        uid,
        facebook,
        instagram,
        twitter
    }
});