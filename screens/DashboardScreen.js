import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SessionContext from './../context/session.context';
import HomeScreen from './HomeScreen';
import AccountScreen from './AccountScreen';
import EventDetailsScreen from './EventDetails';
import NewEventScreen from './NewEventScreen';

const DashboardStack = createStackNavigator();

export default function DashboardScreen({ route, navigation }) {

    const { session } = route.params;

    return (
        <SessionContext.Provider value={session}>
            <DashboardStack.Navigator>
                <DashboardStack.Screen name="Home Events" component={HomeScreen} />
                <DashboardStack.Screen name="Account" component={AccountScreen} />
                <DashboardStack.Screen name="Detail" component={EventDetailsScreen} />
                <DashboardStack.Screen name="Event" component={NewEventScreen} />
            </DashboardStack.Navigator>
        </SessionContext.Provider>
    );
}
