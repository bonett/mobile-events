import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage, Button } from 'react-native';
import SessionContext from './../context/session.context';
import HomeScreen from './HomeScreen';
import EventDetailsScreen from './EventDetails';
import NewEventScreen from './NewEventScreen';
import {settings} from './../constants/settings';

const DashboardStack = createStackNavigator();

export default function DashboardScreen({ route, navigation }) {

    const [isAuthorized, setIsAuthorized] = useState(false),
        { session } = route.params;

    useEffect(() => {

        async function getToken() {
            try {
                const response = await fetch(`https://event-tzt-mobile.herokuapp.com/auth/getToken`, { method: "GET" }),
                    data = await response.json(),
                    status = data && data.message,
                    token = data && data.token;

                if (status === 'Granted') {
                    setIsAuthorized(true);
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

    const redirectLogin = async () => {
        try {
            navigation.navigate('Login');
            await AsyncStorage.removeItem('TOKEN');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            {
                isAuthorized ? <SessionContext.Provider value={session}>
                    <DashboardStack.Navigator>
                        <DashboardStack.Screen name="Home Events" component={HomeScreen} options={{
                            headerRight: () => (
                                <Button
                                    onPress={() => { redirectLogin() }}
                                    title="Log out"
                                    color="#000"
                                />
                            ),
                        }} />
                        <DashboardStack.Screen name="Detail" component={EventDetailsScreen} />
                        <DashboardStack.Screen name="Event" component={NewEventScreen} />
                    </DashboardStack.Navigator>
                </SessionContext.Provider>
                    : redirectLogin
            }
        </>
    );
}
