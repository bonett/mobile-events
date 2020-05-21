import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SessionContext from './../context/session.context';
import HomeScreen from './HomeScreen';
import EventDetailsScreen from './EventDetails';
import NewEventScreen from './NewEventScreen';
import { Button } from 'react-native';

const DashboardStack = createStackNavigator();

export default function DashboardScreen({ route, navigation }) {

    const { session } = route.params;

    return (
        <SessionContext.Provider value={session}>
            <DashboardStack.Navigator>
                <DashboardStack.Screen name="Home Events" component={HomeScreen} options={{
                    headerRight: () => (
                        <Button
                            onPress={() =>  {}}
                            title="Sign Out"
                            color="#2433AC"
                        />
                    ),
                }} />
                <DashboardStack.Screen name="Detail" component={EventDetailsScreen} />
                <DashboardStack.Screen name="Event" component={NewEventScreen} />
            </DashboardStack.Navigator>
        </SessionContext.Provider>
    );
}
