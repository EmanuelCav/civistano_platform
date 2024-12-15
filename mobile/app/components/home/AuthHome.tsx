import { View } from 'react-native'

import ButtonAuthHome from './components/authHome/ButtonAuthHome'

import { homeStyles } from '../../styles/home.styles'

const AuthHome = () => {
    return (
        <View style={homeStyles.containerAuthHome}>
            <ButtonAuthHome text='Empezar Ahora' title='Iniciar cuestionario' />
            <ButtonAuthHome text='Iniciar sesión' title='¿Ya tienes un usuario?' />
        </View>
    )
}

export default AuthHome