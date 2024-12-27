import modaApiClient from './modaApiClient';
import { jwtDecode } from 'jwt-decode';
import { getToken } from './auth';

export const getHistoryMovements = async () => {
    try {
        const extraParams = { params: {} };
        if (extraParams) {
            extraParams.params = {
                type: 'movimientos',
            };
        }

        const token = await getToken();
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.sub;

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

        const response = await modaApiClient.get('/modapago/movimientos', {
            params: {
                token: token,
                start: 0,
                _start: _start,
                _end: _end,
                lenght: 100,
                _brand: userId,
                status: 'all',
                order: 'payment',
                type: 'all',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
