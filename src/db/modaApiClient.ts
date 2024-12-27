import axios, { AxiosError } from 'axios';
import { REACT_NATIVE_APP_MODAAPI_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const modaApiClient = axios.create({
    baseURL: REACT_NATIVE_APP_MODAAPI_URL,
});

modaApiClient.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token');
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

modaApiClient.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
        console.log(error.code);
        //! probar esta funcion con produccion!
        if (
            error.code === 'ECONNABORTED' ||
            error.code === 'ERR_NETWORK' ||
            error.code === 'ETIMEDOUT'
        ) {
            console.log(
                'La operación no se pudo completar, revisá tu conexión a internet.',
            );
        } else if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403)
        ) {
            await AsyncStorage.clear();
            alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
        }
        return Promise.reject(error);
    },
);

export default modaApiClient;
