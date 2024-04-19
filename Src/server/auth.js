import axios from 'axios';
import { baseURL } from './env';

export const refreshToken = async () => {
    try { 
        const response = await axios.post(`${baseURL}/refresh-token`, {});
        const { accessToken } = response.data;
        console.log('New access token:', accessToken);
        return accessToken;
    } catch (error) {
        console.error('Failed to refresh token:', error);
        throw new Error('Failed to refresh token');
    }
};
