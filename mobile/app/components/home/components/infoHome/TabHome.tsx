import { Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

import { IFeature } from '../../../../interface/General'

import { homeStyles } from '../../../../styles/home.styles'

const TabHome = ({ feature }: { feature: IFeature }) => {
    return (
        <View style={homeStyles.containTabHome}>
            <Icon name={feature.icon} style={homeStyles.logoHome} />
            <View style={homeStyles.textContainerHome}>
                <Text style={homeStyles.titleTab}>{feature.title}</Text>
                <Text style={homeStyles.descriptionTab}>{feature.description}</Text>
            </View>
        </View>
    )
}

export default TabHome