import { Text, View } from "react-native"

import { questionnaireStyles } from "../../styles/questionnaire.styles"

const TitleQuestionnaire = () => {
    return (
        <View style={questionnaireStyles.containerTitleQuestionnaire}>
            <Text style={questionnaireStyles.titleQuestionnaire}>
                Responde a un cuestionario inicial para determinar si eres elegible, consulta tu resultado y obtén una lista de pasos personalizados para continuar.
            </Text>
        </View>
    )
}

export default TitleQuestionnaire