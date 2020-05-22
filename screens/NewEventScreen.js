import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, ScrollView, AsyncStorage, Button, Image, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SessionContext from './../context/session.context';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import LoaderComponent from './../components/loaderComponent';
import TextInputComponent from './../components/inputs/TextInputComponent';
import ButtonComponent from './../components/inputs/ButtonComponent';
import MapComponent from './../components/mapComponent';
import utilsHelper from '../helpers/utils_helper';
import serviceHelper from '../helpers/service_helper';
import validatorHelper from '../helpers/validator_helper';
import alertHelper from '../helpers/alert_helper';
;
import { staticText } from '../constants/static';

export default function NewEventScreen({ route, navigation }) {

    const [title, onChangeTitle] = useState(route.params.event !== null ? route.params.event.title : null),
        [description, onChangeDescription] = useState(route.params.event !== null ? route.params.event.description : null),
        [picture, setPicture] = useState(route.params.event !== null ? route.params.event.picture : null),
        [responseStorage, setResponseStorage] = useState(route.params.event !== null ? route.params.event.picture : null),
        [loader, setLoader] = useState(false),
        [region, setRegion] = useState(
            route.params.event !== null ? {
                latitude: parseFloat(route.params.event.latitude),
                longitude: parseFloat(route.params.event.longitude),
                latitudeDelta: parseFloat(route.params.event.latitude_delta),
                longitudeDelta: parseFloat(route.params.event.longitude_delta)
            } : utilsHelper.getDefaultLocationMap());

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

                const uri = result.uri,
                    type = result.type,
                    name = result.uri,
                    source = {
                        uri,
                        type,
                        name
                    };

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
                await cloudStorage(userId);
            } else {
                await registerEvent(userId, picture);
            }
        } else {
            await cloudStorage(userId);
        }
    }

    const cloudStorage = async (userId) => {

        const savedImage = await serviceHelper.saveImageOnStorage(responseStorage);

        if (savedImage.url) {
            await registerEvent(userId, savedImage.url);
        }

    }

    const registerEvent = async (userId, storagePicture) => {

        const baseRegisterEventUrl = serviceHelper.getUrlCreateEvent(route.params.event),
            payload = serviceHelper.newEventPayload(title, description, storagePicture, userId, region);

        const token = await AsyncStorage.getItem('TOKEN') || 'none';

        const response = await fetch(baseRegisterEventUrl.url, {
            method: baseRegisterEventUrl.method,
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

    const getTitleEvent = (value) => {
        onChangeTitle(value);
    }

    const getDescriptionEvent = (value) => {
        onChangeDescription(value);
    }

    return (
        <SessionContext.Consumer>
            {
                value => (
                    <View style={styles.container}>
                        <ScrollView contentContainerStyle={styles.contentContainer}>
                            <View style={styles.body}>
                                <View style={styles.attach}>
                                    <Image source={{ uri: picture ? picture : staticText.default_image }} style={styles.image} />
                                    <Button title={staticText.choose_image} onPress={() => _pickImage()} />
                                </View>
                                <View style={styles.formGroup}>
                                    <TextInputComponent
                                        value={title}
                                        placeholder={'Title'}
                                        setValue={getTitleEvent}
                                        secureTextEntry={false}
                                    />
                                </View>
                                <View style={styles.formGroup}>
                                    <TextInputComponent
                                        value={description}
                                        placeholder={'Description'}
                                        setValue={getDescriptionEvent}
                                        secureTextEntry={false}
                                    />
                                </View>
                                <View style={styles.formGroup}>
                                    <MapComponent region={region} getRegion={onRegionChange} />
                                </View>
                                <View style={styles.formGroup}>
                                    {
                                        loader ? <LoaderComponent show={loader} /> : null
                                    }
                                </View>
                            </View>
                        </ScrollView>
                        <View style={styles.footer}>
                            <TouchableOpacity onPress={() => { validateDataRegister(value) }}>
                                <ButtonComponent
                                    value={'save'} main={true} />
                            </TouchableOpacity>
                        </View>
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
    contentContainer: {
        paddingVertical: 20,
        width: wp('100%'),
        paddingHorizontal: 20
    },
    body: {
        flex: 8,
        justifyContent: 'center',
        width: wp('90%'),
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#2433AC",
        width: wp('100%'),
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
    }
});
