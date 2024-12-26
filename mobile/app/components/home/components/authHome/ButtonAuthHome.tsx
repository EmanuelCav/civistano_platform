import { Pressable, Text, View } from 'react-native'

import { homeStyles } from '../../../../styles/home.styles'

import { ButtonAuthHomePropsType } from '../../../../types/home.types'

const ButtonAuthHome = ({ title, text, func, route }: ButtonAuthHomePropsType) => {
    return (
        <View style={homeStyles.containerButtonAuth}>
            <Text style={homeStyles.titleButtonAuth}>{title}</Text>
            <Pressable style={({ pressed }) => [
                {
                    backgroundColor: pressed ? '#007fff' : '#007bff'
                },
                homeStyles.buttonAuth
            ]} onPress={() => func(route)}>
                <Text style={homeStyles.textButtonAuth}>{text}</Text>
            </Pressable>
        </View>
    )
}

export default ButtonAuthHome