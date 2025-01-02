import { Text, View } from "react-native"
import { Icon } from 'react-native-elements'

import { IFeature } from "../../../interface/General"

import { homeStyles } from "../../../styles/home.styles"

const Odd = ({ odd }: { odd: IFeature }) => {
    return (
        <View style={homeStyles.containTabHome}>
            <Icon name={odd.icon} style={homeStyles.logoHome} color={"#0369A1"} reverse={true} />
            <View style={homeStyles.textContainerHome}>
                <Text style={homeStyles.titleTab}>{odd.title}</Text>
                <Text style={homeStyles.descriptionTab}>{odd.description}</Text>
            </View>
        </View>
    )
}

export default Odd