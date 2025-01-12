import { Pressable, Text } from 'react-native'

import ContainerBackground from '../general/ContainerBackground'

import { ReturnPropsType } from '../../types/questionnnaire.types'

import { generalStyles } from '../../styles/general.styles'
import { questionnaireStyles } from '../../styles/questionnaire.styles'

const Return = ({ title, text, func }: ReturnPropsType) => {
    return (
        <ContainerBackground>
            <Text style={questionnaireStyles.titleFormQuestionnaire}>{title}</Text>
            <Text style={questionnaireStyles.textFormQuestionnaire}>{text}</Text>
            <Pressable style={({ pressed }) => [
                {
                    backgroundColor: pressed ? '#1f8eff' : '#007bff'
                },
                generalStyles.buttonContinue
            ]} onPress={func}>
                <Text style={generalStyles.textButtonContinue}>Continuar</Text>
            </Pressable>
        </ContainerBackground>
    )
}

export default Return