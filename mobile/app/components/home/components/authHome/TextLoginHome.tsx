import { View, Text } from 'react-native'

import { StackNavigation } from '../../../../types/props.types'

import { homeStyles } from '../../../../styles/home.styles'

const TextLoginHome = ({ navigation }: { navigation: StackNavigation }) => {
    return (
        <View style={homeStyles.containerTextLoginHome}>
            <Text style={homeStyles.titleButtonAuth}>¿Ya tienes un usuario?</Text>
            <Text style={homeStyles.linkHome} onPress={() => navigation.navigate('Auth')}>Iniciar sesión</Text>
        </View>
    )
}

export default TextLoginHome