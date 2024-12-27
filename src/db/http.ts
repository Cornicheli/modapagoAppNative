import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const http = axios.create({
    baseURL: 'https://appapi.modapago.com/modapago',
    method: 'GET',
});

http.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token');
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

http.interceptors.response.use(
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

export default http;
