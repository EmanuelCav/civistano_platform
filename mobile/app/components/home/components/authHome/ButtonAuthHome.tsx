import { Pressable, Text, View } from 'react-native'

import { homeStyles } from '../../../../styles/home.styles'

import { ButtonAuthHomePropsType } from '../../../../types/home.types'

const ButtonAuthHome = ({ title, text }: ButtonAuthHomePropsType) => {
    return (
        <View style={homeStyles.containerButtonAuth}>
            <Text style={homeStyles.titleButtonAuth}>{title}</Text>
            <Pressable style={({ pressed }) => [
                {
                    backgroundColor: pressed ? '#6b8cf2' : '#597EEE'
                },
                homeStyles.buttonAuth
            ]}>
                <Text style={homeStyles.textButtonAuth}>{text}</Text>
            </Pressable>
        </View>
    )
}

export default ButtonAuthHome