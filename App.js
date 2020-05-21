import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import useCachedResources from './hooks/useCachedResources';
import DashboardScreen from './screens/DashboardScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

const AuthStack = createStackNavigator();

export default function App(props) {

  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Login" component={SignInScreen} />
          <AuthStack.Screen name="Register" component={SignUpScreen} />
          <AuthStack.Screen name="Dashboard" component={DashboardScreen} />
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }
}
