import { View } from 'react-native'

import ButtonAuthHome from './components/authHome/ButtonAuthHome'
import Outcome from '../general/Outcome'

import { homeStyles } from '../../styles/home.styles'

import { RoutesProps, StackNavigation } from '../../types/props.types'

const AuthHome = ({ navigation }: { navigation: StackNavigation }) => {

    const handleNavigate = (route: keyof RoutesProps) => {
        navigation.navigate(route)
    }

    return (
        <View style={homeStyles.containerAuthHome}>
            <ButtonAuthHome text='Empezar Ahora' title='Iniciar cuestionario' func={handleNavigate} route='Questionnaire' />
            <Outcome func={() => navigation.navigate('Auth')} question='¿Ya tienes un usuario?' text='Iniciar sesión' />
        </View>
    )
}

export default AuthHome