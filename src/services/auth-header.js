export default authHeader => {
    const user = JSON.parse(localStorage.getItem('user'))

    if(user && user.accessToken) {
        return { 'jwt-token': user.accessToken}
    } else {
        return {}
    }
}
