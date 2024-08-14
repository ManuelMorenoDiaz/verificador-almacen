import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_URL = 'http://192.168.100.12:5000'; // Ajusta esta URL según sea necesario

export const login = async (correo, contrasena) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { correo, contrasena });
    const { token, user } = response.data;
    
    // Guarda el token en AsyncStorage
    await AsyncStorage.setItem('token', token);
    
    return { token, user };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const getUserInfo = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${API_URL}/usuariosinfo`, {
      headers: {
        Authorization: `${token}`
      }
    });

    const { rol } = response.data; // Extrae el rol de la respuesta
    await AsyncStorage.setItem('rol', rol); // Guarda el rol en AsyncStorage
    
    return response.data;
  } catch (error) {
    console.error('Get user info error:', error);
    return null;
  }
};

export const getRole = async () => {
  return await AsyncStorage.getItem('rol');
};

export const logOut = async () => {
  try {
    const token = await getToken();
    const resp = await axios.post(`${API_URL}/logout`, { token });
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('rol'); // Elimina el rol de AsyncStorage al cerrar sesión
    return resp;
  } catch (error) {
    console.error(error);
  }
};
