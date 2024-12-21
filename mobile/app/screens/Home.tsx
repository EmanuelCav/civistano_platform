import { View } from 'react-native'

import HeaderHome from '../components/home/HeaderHome'
import AuthHome from '../components/home/AuthHome'

import { generalStyles } from '../styles/general.styles'

import { StackNavigation } from '../types/props.types'

const Home = ({ navigation }: { navigation: StackNavigation }) => {
    return (
        <View style={generalStyles.containerGeneral}>
            <HeaderHome />
            <AuthHome navigation={navigation} />
        </View>
    )
}

export default Home