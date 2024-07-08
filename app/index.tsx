import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import LoginScreen from './LoginScreen';
import ProductsScreen from './ProductsScreen';
import SucursalesScreen from './SucursalesScreen';
import CategoriasScreen from './CategoriasScreen';
import UsuariosScreen from './UsuariosScreen';
import OrdenesScreen from './OrdenesScreen';

import { AuthProvider, useAuth } from './AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
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
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Ordenes" component={OrdenesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Usuarios" component={UsuariosScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Sucursales" component={SucursalesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Categorias" component={CategoriasScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Products" component={ProductsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
