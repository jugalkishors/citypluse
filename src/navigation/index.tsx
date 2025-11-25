import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import LoginScreen from '../screens/AuthScreens/LoginScreen';
import RegisterScreen from '../screens/AuthScreens/RegisterScreen';
import HomeScreen from '../screens/AppScreens/HomeScreen';
import ProfileScreen from '../screens/AppScreens/ProfileScreen';
import EventDetailScreen from '../screens/AppScreens/EventDetailScreen';
import FavEventScreen from '../screens/AppScreens/FavEventScreen';

interface IScreenNames {
  screenName:
    | 'Login'
    | 'Register'
    | 'Home'
    | 'Profile'
    | 'EventDetail'
    | 'FavEvent';
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: undefined;
  EventDetail: { event: any };
  FavEvent: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator({ screenName }: IScreenNames) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={screenName}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
        <Stack.Screen name="FavEvent" component={FavEventScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
