import { Pressable, Text, View } from "react-native"

import { ButtonsSurveyPropsType } from "../../../types/questionnnaire.types"

import { questionnaireStyles } from "../../../styles/questionnaire.styles"

const ButtonsSurvey = ({ handleSelect, isDisabled, isYes, question }: ButtonsSurveyPropsType) => {
  return (
    <View style={questionnaireStyles.containButtonsSurvey}>
      <Pressable style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#1f8eff' : (isYes && !isDisabled) ? '#007bff' : '#9CA38F'
        },
        questionnaireStyles.buttonSurvey
      ]} onPress={() => handleSelect(true, question ? question.yes : undefined)}>
        <Text style={questionnaireStyles.textButtonSurvey}>SI</Text>
      </Pressable>
      <Pressable style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#1f8eff' : (!isYes && !isDisabled) ? '#007bff' : '#9CA38F'
        },
        questionnaireStyles.buttonSurvey
      ]} onPress={() => handleSelect(false, question ? question.no : undefined)}>
        <Text style={questionnaireStyles.textButtonSurvey}>NO</Text>
      </Pressable>
    </View>
  )
}

export default ButtonsSurvey