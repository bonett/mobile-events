import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, TextInput, FlatList, View, ScrollView } from 'react-native';
import ItemEvent from './../components/itemEvent';

const eventList = [
    {
        id_event: 9,
        title: "Android Meet",
        description: "lorem ipsum details france",
        picture: "https://www.kindpng.com/picc/m/73-737324_abstract-submission-nutrition-congress-circle-meeting-icon-png.png",
        id_user: 1,
        latitude: "37.78825",
        longitude: "-122.4324",
        latitude_delta: "0.0922",
        longitude_delta: "0.0421"
    },
    {
        id_event: 14,
        title: "Angular Meet",
        description: "lorem ipsum details france",
        picture: "https://www.kindpng.com/picc/m/73-737324_abstract-submission-nutrition-congress-circle-meeting-icon-png.png",
        id_user: 1,
        latitude: "37.78825",
        longitude: "-122.4324",
        latitude_delta: "0.0922",
        longitude_delta: "0.0421"
    },
    {
        id_event: 9,
        title: "Android Meet",
        description: "lorem ipsum details france",
        picture: "https://www.kindpng.com/picc/m/73-737324_abstract-submission-nutrition-congress-circle-meeting-icon-png.png",
        id_user: 1,
        latitude: "37.78825",
        longitude: "-122.4324",
        latitude_delta: "0.0922",
        longitude_delta: "0.0421"
    },
    {
        id_event: 14,
        title: "Angular Meet",
        description: "lorem ipsum details france",
        picture: "https://www.kindpng.com/picc/m/73-737324_abstract-submission-nutrition-congress-circle-meeting-icon-png.png",
        id_user: 1,
        latitude: "37.78825",
        longitude: "-122.4324",
        latitude_delta: "0.0922",
        longitude_delta: "0.0421"
    },
    {
        id_event: 9,
        title: "Android Meet",
        description: "lorem ipsum details france",
        picture: "https://www.kindpng.com/picc/m/73-737324_abstract-submission-nutrition-congress-circle-meeting-icon-png.png",
        id_user: 1,
        latitude: "37.78825",
        longitude: "-122.4324",
        latitude_delta: "0.0922",
        longitude_delta: "0.0421"
    },
    {
        id_event: 14,
        title: "Angular Meet",
        description: "lorem ipsum details france",
        picture: "https://www.kindpng.com/picc/m/73-737324_abstract-submission-nutrition-congress-circle-meeting-icon-png.png",
        id_user: 1,
        latitude: "37.78825",
        longitude: "-122.4324",
        latitude_delta: "0.0922",
        longitude_delta: "0.0421"
    },
    {
        id_event: 9,
        title: "Android Meet",
        description: "lorem ipsum details france",
        picture: "https://www.kindpng.com/picc/m/73-737324_abstract-submission-nutrition-congress-circle-meeting-icon-png.png",
        id_user: 1,
        latitude: "37.78825",
        longitude: "-122.4324",
        latitude_delta: "0.0922",
        longitude_delta: "0.0421"
    },
    {
        id_event: 14,
        title: "Angular Meet",
        description: "lorem ipsum details france",
        picture: "https://www.kindpng.com/picc/m/73-737324_abstract-submission-nutrition-congress-circle-meeting-icon-png.png",
        id_user: 1,
        latitude: "37.78825",
        longitude: "-122.4324",
        latitude_delta: "0.0922",
        longitude_delta: "0.0421"
    },
    {
        id_event: 9,
        title: "Android Meet",
        description: "lorem ipsum details france",
        picture: "https://www.kindpng.com/picc/m/73-737324_abstract-submission-nutrition-congress-circle-meeting-icon-png.png",
        id_user: 1,
        latitude: "37.78825",
        longitude: "-122.4324",
        latitude_delta: "0.0922",
        longitude_delta: "0.0421"
    },
    {
        id_event: 14,
        title: "Angular Meet",
        description: "lorem ipsum details france",
        picture: "https://www.kindpng.com/picc/m/73-737324_abstract-submission-nutrition-congress-circle-meeting-icon-png.png",
        id_user: 1,
        latitude: "37.78825",
        longitude: "-122.4324",
        latitude_delta: "0.0922",
        longitude_delta: "0.0421"
    }
];

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <FlatList
                    data={eventList}
                    numColumns={2}
                    keyExtractor={(index) => index}
                    renderItem={({ item }) => (
                        <ItemEvent event={item} />
                    )}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    headingText: {
        fontSize: 22,
        fontWeight: "300"
    },
});
