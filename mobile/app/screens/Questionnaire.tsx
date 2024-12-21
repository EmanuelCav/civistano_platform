import { Text, View, Pressable } from 'react-native'

import { generalStyles } from '../styles/general.styles'
import { questionnaireStyles } from '../styles/questionnaire.styles'

const Questionnaire = () => {
    return (
        <View style={generalStyles.containerGeneral}>
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sed minima pariatur aspernatur, rerum nam totam quasi! Voluptas impedit non enim sequi, alias facilis ipsum fugit provident cupiditate inventore optio!</Text>
            <Pressable style={({ pressed }) => [
                {
                    backgroundColor: pressed ? '#6b8cf2' : '#597EEE'
                },
                questionnaireStyles.buttonQuestionnaire
            ]}>
                <Text style={questionnaireStyles.textButtonQuestionnaire}>INICIAR</Text>
            </Pressable>
        </View>
    )
}

export default Questionnaire