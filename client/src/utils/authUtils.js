import * as jwt_decode from 'jwt-decode';

export const setAuthToken = (token) => {
    sessionStorage.setItem('authToken', token)
}
export const getAuthToken = (token) => {
    return sessionStorage.setItem('authToken', token)
}
export const removeAuthToken = (token) => {
    sessionStorage.setItem('authToken', token)
}

export const getUserIdFromToken = () => {
    const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage

    if (!token) {
        console.error('Token not found');
        return null; // Return null if token is not found
    }

    try {
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;

        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTimestamp) {
            
        }
        return userId;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null; // Return null if there's an error decoding the token
    }
}


