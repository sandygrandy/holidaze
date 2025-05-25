function getAccessToken() {
    const userData = localStorage.getItem("user");
    const accessToken = userData ? JSON.parse(userData).accessToken : null;
    return accessToken;
}

export default getAccessToken;