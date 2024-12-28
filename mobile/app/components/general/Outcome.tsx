import { Text, TouchableOpacity, View } from 'react-native'

import { OutcomePropsType } from '../../types/general.types'

import { homeStyles } from '../../styles/home.styles'

const Outcome = ({ func, question, text }: OutcomePropsType) => {
    return (
        <View style={homeStyles.containerTextLoginHome}>
            <Text style={homeStyles.titleButtonAuth}>{question}</Text>
            <TouchableOpacity>
                <Text style={homeStyles.linkHome} onPress={func}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Outcome