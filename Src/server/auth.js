import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { baseURL } from './env';

// Utility function to check token expiry
const isTokenExpired = async () => {
    const tokenString = await AsyncStorage.getItem('token');
    const token = JSON.parse(tokenString);
    return token && token.expiry && Date.now() >= token.expiry;
};

// Function to get a new access token
const fetchNewAccessToken = async () => {
    try {
        const response = await axios.post(`${baseURL}/get-new-token`); // Adjust URL as needed
        const { accessToken, expiry } = response.data;

        // Save the new access token and its expiry time to AsyncStorage
        await AsyncStorage.setItem('token', JSON.stringify({ accessToken, expiry }));
        console.log('New access token:', accessToken);

        return accessToken;
    } catch (error) {
        console.error('Failed to get new token:', error);
        throw new Error('Failed to get new token');
    }
};

// Refresh the token if it is expired
export const refreshToken = async () => {
    if (!(await isTokenExpired())) {
        console.log('Token is not expired.');
        const tokenString = await AsyncStorage.getItem('token');
        return JSON.parse(tokenString).accessToken;
    }
    return await fetchNewAccessToken();
};
