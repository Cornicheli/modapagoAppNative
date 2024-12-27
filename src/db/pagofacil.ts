import axios from 'axios';
import * as Network from 'expo-network';
import {
    NODE_TLS_REJECT_UNAUTHORIZED,
    REACT_NATIVE_APP_RAPIPAGO_URL,
} from '@env';
import { getToken } from './auth';

const instance = axios.create({
    httpsAgent: {
        NODE_TLS_REJECT_UNAUTHORIZED,
    },
    proxy: false,
});

export const getTrendingCompanies = async () => {
    try {
        // Disable SSL verification for this request
        // axios.defaults.adapter = config => {
        //     return new Promise((resolve, reject) => {
        //         Network.fetchAsync(config.url, {
        //             method: config.method.toUpperCase(),
        //             headers: config.headers,
        //             body: config.data,
        //         })
        //             .then(response => {
        //                 resolve({
        //                     data: response.body,
        //                     status: response.status,
        //                     headers: response.headers,
        //                 });
        //             })
        //             .catch(error => reject(error));
        //     });
        // };

        const token = getToken();
        const response = await instance.get(
            `${REACT_NATIVE_APP_RAPIPAGO_URL}`,
            {
                params: {
                    token: token,
                },
            },
        );
        console.log('data pagofacil.ts data', response?.data);
        return response?.data;
    } catch (error: any) {
        console.error('Request error:', error);
    }
};
