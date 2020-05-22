import React from 'react';
import { ActivityIndicator } from "react-native";

const LoaderComponent = (props) => {

    const { show } = props;

    return (
        <>
            {
                show ? <ActivityIndicator color={"#000"} /> : null
            }
        </>
    )
}

export default LoaderComponent