import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function EventDetailsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Details</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center'
    }
});
