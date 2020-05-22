import React from 'react';
import { View, Text, StyleSheet } from "react-native";

const ButtonComponent = (props) => {

    const { value, main } = props;

    return (
        <>
            {
                main ?
                    <View style={styles.mainButton}>
                        <Text style={styles.mainButtonText}>{value}</Text>
                    </View>
                    : <View style={styles.secondaryButton}>
                        <Text style={styles.secondaryButtonText}>{value}</Text>
                    </View>
            }
        </>
    )
}

export default ButtonComponent

const styles = StyleSheet.create({
    mainButton: {
        backgroundColor: "#2433AC",
        height: 48,
        marginVertical: 8,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: "600"
    },
    mainButtonText: {
        fontSize: 18,
        fontWeight: '400',
        textTransform: "uppercase",
        color: "#fff",
    },
    secondaryButton: {
        height: 48,
        marginVertical: 8,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: "600"
    },
    secondaryButtonText: {
        fontSize: 14,
        fontWeight: '300',
        color: "#2433AC",
    },
});
