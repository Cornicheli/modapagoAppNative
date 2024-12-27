import axios from 'axios';
import modaApiClient from './modaApiClient';
import { LoginCredentials } from '@/interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (creadential: LoginCredentials) => {
    try {
        const response = await modaApiClient.post(
            '/modapago/login',
            creadential,
        );
        const token = response.data.token;
        if (token) {
            await AsyncStorage.setItem('token', token);
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage =
                error.response?.data.message || 'Error al iniciar sesión';
            alert(errorMessage);
        } else {
            alert('Error inesperado al iniciar sesión');
        }
        return null;
    }
};

export const getToken = async () => {
    try {
        const tokenFetch: any = await AsyncStorage.getItem('token');
        if (!tokenFetch) {
            throw new Error('Token NO encontrado');
        }
        console.log('Token guardado correctamente : ', tokenFetch);
        return tokenFetch;
    } catch (error) {
        console.log('Token NO guardado', error);
        throw error;
    }
};
