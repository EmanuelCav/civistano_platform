import { View } from 'react-native'

import HeaderHome from '../components/home/HeaderHome'
import AuthHome from '../components/home/AuthHome'

import { generalStyles } from '../styles/general.styles'

const Home = () => {
    return (
        <View style={generalStyles.containerGeneral}>
            <HeaderHome />
            <AuthHome />
        </View>
    )
}

export default Home