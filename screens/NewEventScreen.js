import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, AsyncStorage, Button, Image, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MapView, { Marker } from 'react-native-maps';
import SessionContext from './../context/session.context';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import LoaderComponent from './../components/loaderComponent';

const INITIAL_REGION = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
};

export default function NewEventScreen({ route, navigation }) {

    const [title, onChangeTitle] = useState(route.params.event !== null ? route.params.event.title : null);
    const [description, onChangeDescription] = useState(route.params.event !== null ? route.params.event.description : null);
    const [picture, setPicture] = useState(route.params.event !== null ? route.params.event.picture : null);
    const [responseStorage, setResponseStorage] = useState(route.params.event !== null ? route.params.event.picture : null);
    const [region, setRegion] = useState(
        route.params.event !== null ? {
            latitude: parseFloat(route.params.event.latitude),
            longitude: parseFloat(route.params.event.longitude),
            latitudeDelta: parseFloat(route.params.event.latitude_delta),
            longitudeDelta: parseFloat(route.params.event.longitude_delta)
        } : INITIAL_REGION);

    const [loader, setLoader] = useState(false);

    useEffect(() => {

        async function getPermissionAsync() {
            if (Platform.OS === 'ios') {
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        }

        getPermissionAsync();
    }, []);

    const onRegionChange = (region) => {
        setRegion({
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
        });
    }

    const _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });

            if (!result.cancelled) {

                const uri = result.uri;
                const type = result.type;
                const name = result.uri;
                const source = {
                    uri,
                    type,
                    name,
                }
                setResponseStorage(source);
                setPicture(source.uri);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const validateDataRegister = async (userId) => {

        setLoader(true);

        if (route.params.event !== null) {
            if (responseStorage !== picture) {
                await _cloudStorage(userId);
            } else {
                await registerEvent(userId, picture);
            }
        } else {
            await _cloudStorage(userId);
        }
    }

    const _cloudStorage = async (userId) => {

        const data = new FormData()
        data.append('file', responseStorage)
        data.append('upload_preset', 'dhk2sbwpg')
        data.append("cloud_name", "dhk2sbwpg")

        const response = await fetch(`https://api.cloudinary.com/v1_1/dhk2sbwpg/upload`, {
            method: "POST",
            body: data
        }),

            res = await response.json();

        await registerEvent(userId, res.url);

    }

    const registerEvent = async (userId, storagePicture) => {

        const pathUrl = (route.params.event === null) ? { url: 'http://localhost:8080/events', method: 'POST' } : { url: `http://localhost:8080/events/${route.params.event.id_event}`, method: 'PUT' }
        const payload = {
            title: title,
            description: description,
            picture: storagePicture,
            id_user: userId,
            latitude: region.latitude,
            longitude: region.longitude,
            latitude_delta: region.latitudeDelta,
            longitude_delta: region.longitudeDelta
        }

        const token = await AsyncStorage.getItem('TOKEN') || 'none';

        const response = await fetch(pathUrl.url, {
            method: pathUrl.method,
            body: JSON.stringify(payload),
            headers: new Headers({
                'Content-Type': 'application/json',
                'access-token': token
            })
        }),
            data = await response.json();

        if (data.status === 'OK') {
            setTimeout(() => {
                setLoader(false);
                navigation.navigate('Home Events');
            }, 1000)
        }
    }

    return (
        <SessionContext.Consumer>
            {
                value => (
                    <View style={styles.container}>
                        {
                            loader ? <LoaderComponent show={loader} />
                                :
                                <>
                                    <View style={styles.body}>
                                        <View style={styles.attach}>
                                            <Image source={{ uri: picture ? picture : 'https://www.shareicon.net/data/128x128/2017/02/05/878222_camera_512x512.png' }} style={styles.image} />
                                            <Button title="Choose an image" onPress={() => _pickImage()} />
                                        </View>
                                        <TextInput placeholder='Title' style={styles.inputText} onChangeText={title => onChangeTitle(title)} value={title} autoCapitalize="none" />
                                        <TextInput placeholder='Description' style={styles.inputText} onChangeText={description => onChangeDescription(description)} value={description} autoCapitalize="none" />
                                        <View style={styles.mapContainer}>
                                            <MapView style={styles.map} region={region} onRegionChange={onRegionChange}>
                                                <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
                                            </MapView>
                                        </View>
                                    </View>
                                    <View style={styles.footer}>
                                        <TouchableOpacity onPress={() => { validateDataRegister(value) }}>
                                            <View style={styles.buttonContent} >
                                                <Text style={styles.buttonText}>{route.params.event === null ? 'Create' : 'Update'} Event</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </>
                        }
                    </View>
                )}
        </SessionContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    body: {
        flex: 8,
        justifyContent: 'center'
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#2433AC"
    },
    buttonContent: {
        width: wp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
        textTransform: "uppercase"
    },
    attach: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 100,
        opacity: 0.6
    },
    mapContainer: {
        marginVertical: 20,
        height: 200,
    },
    map: {
        height: 200
    },
    inputText: {
        height: 48,
        width: wp('90%'),
        marginVertical: 8,
        borderWidth: 1,
        borderColor: "#ededed",
        borderRadius: 4,
        color: "#20232a",
        fontSize: 20,
        fontWeight: "300",
        paddingStart: 8,
        paddingEnd: 8,
    },
    bottomView: {
        width: '100%',
        height: 60,
        backgroundColor: "#2433AC",
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    textStyle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '400',
        textTransform: "uppercase"
    }
});
