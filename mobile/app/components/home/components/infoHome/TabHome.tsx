import { Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

import { IFeature } from '../../../../interface/General'

const TabHome = ({ feature }: { feature: IFeature }) => {
    return (
        <View>
            <Icon name={feature.icon} />
            <Text>{feature.title}</Text>
            <Text>{feature.description}</Text>
        </View>
    )
}

export default TabHome