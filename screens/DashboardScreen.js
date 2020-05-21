import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import AccountScreen from './AccountScreen';
import EventDetailsScreen from './EventDetails';
import NewEventScreen from './NewEventScreen';

const DashboardStack = createStackNavigator();

export default function DashboardScreen({ navigation }) {
    return (
        <DashboardStack.Navigator >
            <DashboardStack.Screen name="Home Events" component={HomeScreen} />
            <DashboardStack.Screen name="Account" component={AccountScreen} />
            <DashboardStack.Screen name="Detail" component={EventDetailsScreen} />
            <DashboardStack.Screen name="New Event" component={NewEventScreen} />
        </DashboardStack.Navigator>
    );
}
