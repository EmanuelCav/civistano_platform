import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { IReducer } from '../../interface/General';

import { selector } from "../../server/reducer/selector";

import { generalStyles } from '../../styles/general.styles';

const Loading = () => {

    const response = useSelector((state: IReducer) => selector(state).response)

    return (
        <>
            {
                response.loading &&
                <View style={generalStyles.containerLoading}>
                    <Image source={require('../../../assets/imagen.png')} alt="icon"
                        width={Dimensions.get("window").width / 2} height={Dimensions.get("window").height / 2} resizeMode="center" />
                    <Text style={generalStyles.textLoading}>Cargando...</Text>
                </View>
            }
        </>
    )
}

export default Loading