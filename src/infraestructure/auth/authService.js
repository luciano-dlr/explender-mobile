// authService.js en React Native con expo-secure-store
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = 'https://mycountry.net.ar/Api/v1/';

export const login = async (usuario) => {
    try {
        const response = await fetch(`${API_BASE_URL}/Auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        });

        const data = await response.json();

        if (response.ok) {
            // Autenticación exitosa
            await SecureStore.setItemAsync('authResponse', JSON.stringify(data));
            console.log('Token almacenado con éxito:', data.token);
        } else {
            // Manejar errores de autenticación
            console.error('Error de autenticación:', data);
        }

        return data;
    } catch (error) {
        console.error('Error en la solicitud de autenticación:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        // Eliminar token de expo-secure-store al cerrar sesión
        await SecureStore.deleteItemAsync('token');
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        throw error;
    }
};

export const isLogged = async () => {
    try {
        // Verificar si hay un token almacenado en expo-secure-store
        const token = await SecureStore.getItemAsync('token');
        return token !== null && token.length > 2;
    } catch (error) {
        console.error('Error al verificar el estado de inicio de sesión:', error);
        throw error;
    }
};
