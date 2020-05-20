import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Login';

export default function BottomTabNavigator({ navigation, route }) {

  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Login"
        component={SignInScreen}
        options={{
          title: 'I have Account',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-star" />,
        }}
      />
      <BottomTab.Screen
        name="Register"
        component={SignUpScreen}
        options={{
          title: `Don't have account?`,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Login':
      return 'Sign in';
    case 'Register':
      return 'Sign up';
  }
}
