import { Pressable, Text, View } from 'react-native'

import { homeStyles } from '../../../../styles/home.styles'
import { generalStyles } from '../../../../styles/general.styles'

import { ButtonAuthHomePropsType } from '../../../../types/home.types'

const ButtonAuthHome = ({ title, text, func, route }: ButtonAuthHomePropsType) => {
    return (
        <View style={homeStyles.containerButtonAuth}>
            <Text style={homeStyles.titleButtonAuth}>{title}</Text>
            <Pressable style={({ pressed }) => [
                {
                    backgroundColor: pressed ? '#1f8eff' : '#007bff'
                },
                generalStyles.buttonContinue
            ]} onPress={() => func(route)}>
                <Text style={generalStyles.textButtonContinue}>{text}</Text>
            </Pressable>
        </View>
    )
}

export default ButtonAuthHome