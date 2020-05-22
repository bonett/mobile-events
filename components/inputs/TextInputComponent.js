import React, { useState } from 'react';
import { TextInput, StyleSheet } from "react-native";

const TextInputComponent = (props) => {

    const { value, placeholder, setValue, secureTextEntry } = props;

    const onChangeValue = (value) => {
        setValue(value);
    }

    return (
        <TextInput
            placeholder={placeholder}
            style={styles.element}
            onChangeText={value => onChangeValue(value)}
            value={value}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none" />
    )
}

export default TextInputComponent

const styles = StyleSheet.create({
    element: {
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
    }
});
