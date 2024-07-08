import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

const Tab = createBottomTabNavigator();

export default function HomeTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="DetailsScreen" component={DetailsScreen} options={{ tabBarLabel: 'Details' }} />
    </Tab.Navigator>
  );
}
