import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { useAuth } from './AuthContext'; 
import { login as apiLogin, getUserInfo } from './api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); 

  const handleLogin = async () => {
    const result = await apiLogin(correo, contrasena);
    if (result && result.token) {
      setError('');
      await AsyncStorage.setItem('userToken', result.token);
      login(result.token); // Usa 'login' en lugar de 'setIsAuthenticated'
      navigation.navigate('HomeTabs');
    } else {
      setError('Invalid correo or password');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
      <Icon name="diamond-outline" size={150} color="black" />

        <Text style={styles.title}>FOREVER 21</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          onChangeText={setCorreo}
          value={correo}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          onChangeText={setContrasena}
          value={contrasena}
          placeholder="Password"
          secureTextEntry
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  title: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black', // Color naranja
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 300,
  },
  input: {
    height: 40,

    borderRadius: 25,
    paddingHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  forgotPassword: {
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: 'gray',
  },
  button: {
    height: 40,
    borderRadius: 25,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 8,
    fontSize: 14,
    color: 'gray',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    marginVertical: 8,
    width: '100%',
    maxWidth: 300,
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
  footerText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 16,
  },
  signUpText: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default LoginScreen;
