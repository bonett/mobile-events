import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import DashboardScreen from './screens/DashboardScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

const AuthStack = createStackNavigator();

export default function App(props) {


  useEffect(() => {

    async function getToken() {
      try {
        const response = await fetch(`http://localhost:8080/auth/getToken`, { method: "GET" }),
          data = await response.json(),
          status = data && data.message,
          token = data && data.token;

        if (status === 'Granted') {
          saveToken(token)
        }
      } catch (e) {
        console.error(e);
      }
    }
    getToken();
  }, []);

  const saveToken = async token => {
    try {
      await AsyncStorage.setItem('TOKEN', token);
    } catch (error) {
      console.log(error.message);
    }
  };

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
