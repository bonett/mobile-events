import React from 'react';
import { Text } from "react-native";

const TextComponent = (props) => {

    const { value, size, weight } = props;

    return (
        <Text style={{ fontSize: `${size}`, fontWeight: `${weight}` }}>{value}</Text>
    )
}

export default TextComponent