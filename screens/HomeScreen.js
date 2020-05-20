import * as React from 'react';
import { StyleSheet, Text, TextInput, FlatList, View, ScrollView, TouchableOpacity } from 'react-native';
import ItemEvent from './../components/itemEvent';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
    }
];

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <FlatList
                    data={eventList}
                    numColumns={2}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => { navigation.push('Detail') }} style={styles.itemContent}>
                            <ItemEvent event={item} key={index} />
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
            <TouchableOpacity onPress={() => { navigation.push('New Event') }}>
                <View style={styles.bottomView} >
                    <Text style={styles.textStyle}>Create Event</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingVertical: 10,
        width: wp('98%'),
        backgroundColor: '#F9F9F9'
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
