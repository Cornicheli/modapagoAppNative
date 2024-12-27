import modaApiClient from './modaApiClient';
import { getToken } from './auth';

export const proceedToTransaction = async () => {
    try {
        const token = await getToken();
        const response = await modaApiClient.get(`/modapago/qr_mail`, {
            params: {
                token: token,
                email: 'super-admin@modatex.com.ar',
            },
        });
        return response.data;
    } catch (error) {
        console.log('error proceedToTransaction', error);
    }
};
