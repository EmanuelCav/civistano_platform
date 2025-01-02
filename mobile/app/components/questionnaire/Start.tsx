import { Pressable, Text, View } from "react-native"

import Outcome from "../general/Outcome"

import { questionnaireStyles } from "../../styles/questionnaire.styles"
import { generalStyles } from "../../styles/general.styles"

import { StartPropsType } from "../../types/questionnnaire.types"

const Start = ({ navigation }: StartPropsType) => {
  return (
    <View style={questionnaireStyles.containerStart}>
      <Pressable style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#1f8eff' : '#007bff'
        },
        generalStyles.buttonContinue
      ]} onPress={() => navigation.navigate("Panel")}>
        <Text style={generalStyles.textButtonContinue}>Iniciar</Text>
      </Pressable>
      <Outcome func={() => navigation.navigate("Home")} question="¿Desea regresar?" text="Regresar" />
    </View>
  )
}

export default Start