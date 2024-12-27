import modaApiClient from './modaApiClient';
import { getToken } from './auth';

export const getDiscount = async () => {
    try {
        const token = await getToken();
        const response = await modaApiClient.get(
            `/modapago/descuentos?token=${token}`,
        );
        return response.data;
    } catch (error) {
        console.log('error getDiscount axios', error);
    }
};
