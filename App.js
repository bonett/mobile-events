import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import useCachedResources from './hooks/useCachedResources';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import EventDetailsScreen from './screens/EventDetails';

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Login';

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={INITIAL_ROUTE_NAME} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={SignInScreen} />
          <Stack.Screen name="Register" component={SignUpScreen} />
          <Stack.Screen name="Dashboard" component={HomeScreen} />
          <Stack.Screen name="Detail" component={EventDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
