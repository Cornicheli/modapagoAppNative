import modaApiClient from './modaApiClient';
import { getToken } from './auth';

export const getEmail = async (email: string) => {
    try {
        const token = await getToken();
        const response = await modaApiClient.get('/modapago/get_mails?token', {
            params: {
                token: token,
                email: email,
            },
        });
        const data = response.data;
        return data;
    } catch (error) {
        throw error;
    }
};
