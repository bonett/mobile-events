import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';
import SessionContext from './../context/session.context';
import HomeScreen from './HomeScreen';
import EventDetailsScreen from './EventDetails';
import NewEventScreen from './NewEventScreen';

const DashboardStack = createStackNavigator();

export default function DashboardScreen({ route, navigation }) {

    const { session } = route.params;

    useEffect(() => {

        async function getToken() {
            try {
                const response = await fetch(`http://localhost:8080/auth/getToken`, { method: "GET" }),
                    data = await response.json(),
                    status = data && data.message,
                    token = data && data.token;

                if (status === 'Granted') {
                    saveToken(token);
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

    return (
        <SessionContext.Provider value={session}>
            <DashboardStack.Navigator>
                <DashboardStack.Screen name="Home Events" component={HomeScreen} />
                <DashboardStack.Screen name="Detail" component={EventDetailsScreen} />
                <DashboardStack.Screen name="Event" component={NewEventScreen} />
            </DashboardStack.Navigator>
        </SessionContext.Provider>
    );
}
