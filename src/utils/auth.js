export const logout = () => {
    localStorage.removeItem('authToken'); // Remove the token
    localStorage.removeItem('userID'); // Remove the userID
};
export const decodeToken = (token) => {
    try {
        if (!token || typeof token !== 'string') {
            console.error('Token is undefined, null, or not a string');
            return null;
        }

        // Split the token into its parts
        const parts = token.split('.');
        if (parts.length !== 3) {
            console.error('Invalid token format: Expected 3 parts');
            return null;
        }

        // Decode the payload
        const payload = JSON.parse(atob(parts[1]));
        return payload; // Return the entire payload
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        return false;
    }

    // Decode the token to check expiration
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) {
        return false;
    }

    // Check if the token is expired
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp > currentTime;
};