import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from "react-native";

const MapComponent = (props) => {

    const { region, getRegion } = props;

    const onChangeRegion = (region) => {
        getRegion({
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
        })
    }

    return (
        <MapView style={styles.mapContainer} region={region} onRegionChange={onChangeRegion}>
            <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        </MapView>
    )
}

export default MapComponent

const styles = StyleSheet.create({
    mapContainer: {
        height: 200
    }
});
