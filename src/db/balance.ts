import { jwtDecode } from 'jwt-decode';
import { getToken } from './auth';
import modaApiClient from './modaApiClient';

export const getBalance = async (onlyBalance: boolean = false) => {
    try {
        const extraParams = { params: {} };
        if (onlyBalance) {
            extraParams.params = {
                type: 'balance',
            };
        }
        const token = await getToken();
        const response = await modaApiClient.get(
            `/modapago/balance?token=${token}`,
            extraParams,
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMostTransfered = async () => {
    try {
        const token = await getToken();
        const decodeToken: any = jwtDecode(token);
        const userId = decodeToken.sub;

        const formatDate = (date: Date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        const _start = formatDate(startDate);
        const _end = formatDate(new Date());

        const response = await modaApiClient.get('/modapago/most_transfered', {
            params: {
                token: token,
                start: 0,
                _start: _start,
                _end: _end,
                lenght: 100,
                _brand: userId,
                status: 'all',
                order: 'desc',
                type: 'all',
            },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getBankAccounts = async () => {
    try {
        const token = await getToken();
        const response = await modaApiClient.get('/modapago/request/accounts', {
            params: {
                token: token,
            },
        });
        return response;
    } catch (error) {
        console.log('error getBankAccounts', getBankAccounts);
    }
};
