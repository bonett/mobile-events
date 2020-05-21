import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, AsyncStorage, Button, Image, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import SessionContext from './../context/session.context';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default function NewEventScreen({ route, navigation }) {

    const [title, onChangeTitle] = useState(route.params.event !== null ? route.params.event.title : null);
    const [description, onChangeDescription] = useState(route.params.event !== null ? route.params.event.description : null);
    const [picture, setPicture] = useState(route.params.event !== null ? { image: { uri: route.params.event.picture } } : null);
    const [storageImage, setStorageImage] = useState(route.params.event !== null ? route.params.event.picture : null);
    const [region, setRegion] = useState(
        route.params.event !== null ? {
            latitude: parseFloat(route.params.event.latitude),
            longitude: parseFloat(route.params.event.longitude),
            latitudeDelta: parseFloat(route.params.event.latitude_delta),
            longitudeDelta: parseFloat(route.params.event.longitude_delta)
        } : {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            });

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

    const validateDataRegister = async (userId) => {
        await _cloudStorage();
        await registerEvent(userId);
    }

    const registerEvent = async (userId) => {

        if (storageImage) {

            const payload = {
                title: title,
                description: description,
                picture: storageImage,
                id_user: userId,
                latitude: region.latitude,
                longitude: region.longitude,
                latitude_delta: region.latitudeDelta,
                longitude_delta: region.longitudeDelta
            }

            const token = await AsyncStorage.getItem('TOKEN') || 'none';

            const response = await fetch(`http://localhost:8080/events`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'access-token': token
                })
            }),
                data = await response.json();

            if (data.status === 'OK') {
                navigation.navigate('Home Events');
            }
        }
    }

    const _cloudStorage = async () => {
        const data = new FormData()
        data.append('file', picture.image)
        data.append('upload_preset', 'dhk2sbwpg')
        data.append("cloud_name", "dhk2sbwpg")

        const response = await fetch(`https://api.cloudinary.com/v1_1/dhk2sbwpg/upload`, {
            method: "POST",
            body: data
        }),
            res = await response.json();
        setStorageImage(res.url);
    }

    const _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });
            console.log(result)
            if (!result.cancelled) {

                const uri = result.uri;
                const type = result.type;
                const name = result.uri;
                const source = {
                    uri,
                    type,
                    name,
                }

                setPicture({ image: source });
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <SessionContext.Consumer>
            {
                value => (
                    <>
                        <View style={styles.container}>
                            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                                <View style={styles.attach}>
                                    {
                                        picture && <Image source={{ uri: picture.image.uri }} style={styles.avatar} />
                                    }
                                    <Button title="Choose an image" onPress={() => _pickImage()} />
                                </View>
                                <TextInput placeholder='Title' style={styles.inputText} onChangeText={title => onChangeTitle(title)} value={title} autoCapitalize="none" />
                                <TextInput placeholder='Description' style={styles.inputText} onChangeText={description => onChangeDescription(description)} value={description} autoCapitalize="none" />
                                <View style={styles.mapContainer}>
                                    <MapView style={styles.map} region={region} onRegionChange={onRegionChange}>
                                        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
                                    </MapView>
                                </View>
                            </ScrollView>
                        </View>
                        <TouchableOpacity onPress={() => { validateDataRegister(value) }}>
                            <View style={styles.bottomView} >
                                <Text style={styles.textStyle}>Create Event</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                )}
        </SessionContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        paddingTop: 20,
        paddingStart: 20,
        paddingEnd: 20,
    },
    attach: {
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 80
    },
    headingText: {
        fontSize: 30,
        fontWeight: "400"
    },
    descriptionText: {
        fontSize: 36,
        fontWeight: "200",
        paddingVertical: 10
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
