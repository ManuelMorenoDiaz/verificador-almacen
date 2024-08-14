import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import LoginScreen from './LoginScreen';
import ProductsScreen from './ProductsScreen';
import SucursalesScreen from './SucursalesScreen';
import CategoriasScreen from './CategoriasScreen';
import UsuariosScreen from './UsuariosScreen';
import OrdenesScreen from './OrdenesScreen';
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthProvider, useAuth } from './AuthContext';
import { ProductProvider } from './api/ProductContext';
import { CategoryProvider } from './api/CategoriesContext';
import { SucursalProvider } from './api/SucursalesContext';
import { UserProvider } from './api/UsersContext';
import { UsuarioSucursalProvider } from './api/UsuariosSucursalesContext';
import { OrdenProvider } from './api/OrdenesContext';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <SucursalProvider>
      <UserProvider>
      <UsuarioSucursalProvider>
      <CategoryProvider>
      <ProductProvider>
      <OrdenProvider>
        <AppNavigator />
      </OrdenProvider>
      </ProductProvider>
      </CategoryProvider>
      </UsuarioSucursalProvider>
      </UserProvider>
      </SucursalProvider>
    </AuthProvider>
  );
}

function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

function HomeTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: 20,
          right: 20,
          backgroundColor: '#ffffff',
          borderRadius: 10,
          height: 60,
          ...styles.shadow
        }
      }}
    >
      <Tab.Screen 
        name="Productos" 
        component={ProductsStackNavigator} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="cart-outline" color={color} size={size} />
          )
        }} 
      />
      <Tab.Screen 
        name="Inicio" 
        component={HomeStackNavigator} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{
              top: -20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <View style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: focused ? 'black' : '#ffffff',
                justifyContent: 'center',
                alignItems: 'center',
                ...styles.shadow
              }}>
                <Icon 
                  name="home-outline" 
                  color={focused ? '#ffffff' : '#748c94'} 
                  size={40} 
                />
              </View>
            </View>
          )
        }} 
      />
      <Tab.Screen 
        name="Ordenes" 
        component={OrdenesStackNavigator} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="list-outline" color={color} size={size} />
          )
        }} 
      />
    </Tab.Navigator>
  );
}

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Usuarios" component={UsuariosScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Sucursales" component={SucursalesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Categorias" component={CategoriasScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function OrdenesStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ordenes" component={OrdenesScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function ProductsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Productos" component={ProductsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Detalles" component={DetailsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
});
