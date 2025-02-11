import { Pressable, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Picker } from '@react-native-picker/picker';

import ContainerBackground from '../general/ContainerBackground'
import ButtonsSurvey from './components/ButtonsSurvey';

import { IAncestry, IReducer } from '../../interface/General'
import { QuestionPropsType } from '../../types/questionnnaire.types'

import { questionnaireStyles } from '../../styles/questionnaire.styles';
import { generalStyles } from '../../styles/general.styles';

import { selector } from '../../server/reducer/selector'
import { updateQuestion } from '../../server/reducer/survey.reducer'
import { updateAncestry } from '../../server/reducer/user.reducer'
import { getAncestors } from '../../server/actions/ancestry.action'

import { questions } from '../../utils/questions'

const Question = ({ setIsAdministrative, setIsJudicial, setIsNotPossible, setIsQuestion }: QuestionPropsType) => {

    const survey = useSelector((state: IReducer) => selector(state).survey)

    const dispatch = useDispatch()

    const [isSelect, setIsSelect] = useState<boolean>(true)
    const [isYes, setIsYes] = useState<boolean>(false)
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    const [ancestors, setAncestors] = useState<IAncestry[]>([])

    const [personAncestry, setPersonAncestry] = useState<string>('')

    const [questionId, setQuestionId] = useState<number | undefined>()

    const handleSelect = (value: boolean, id: number | undefined) => {
        setIsYes(value)
        setQuestionId(id)
        setIsDisabled(false)
    }

    const handleContinue = () => {
        if (!questionId) {
            if (questions.find((question) => question.id === survey.question.id)?.id === 2) {
                if (isYes) {
                    setIsNotPossible(true)
                } else {
                    setIsAdministrative(true)
                }

                setIsQuestion(false)
                dispatch(updateQuestion(questions.find((question => question.id === 1))))
                return
            }

            setIsJudicial(true)
            setIsQuestion(false)
            dispatch(updateQuestion(questions.find((question => question.id === 1))))
            return
        }

        dispatch(updateQuestion(questions.find((question => question.id === questionId))))
        setIsDisabled(true)
    }

    const handleSumbit = () => {
        setIsSelect(false)

        if(personAncestry === "CÓNYUGE") {
            setQuestionId(3)
            dispatch(updateQuestion(questions.find((question => question.id === 3))))
            dispatch(updateAncestry(ancestors.find((a) => a.ancestry === personAncestry)!))
            return
        }

        if (ancestors.find((a) => a.ancestry === personAncestry)?.isFemale) {
            setQuestionId(1)
            dispatch(updateQuestion(questions.find((question => question.id === 1))))
        } else {
            setQuestionId(2)
            dispatch(updateQuestion(questions.find((question => question.id === 2))))
        }

        dispatch(updateAncestry(ancestors.find((a) => a.ancestry === personAncestry)!))
    }

    useEffect(() => {
        dispatch(getAncestors(setAncestors) as any)
    }, [])

    return (
        <ContainerBackground>
            {
                isSelect ? (
                    <View style={questionnaireStyles.containFormQuestionnaire}>
                        <Text style={questionnaireStyles.titleFormQuestionnaire}>Selecciona tu ascendiente italiano</Text>
                        <Picker
                            selectedValue={personAncestry}
                            onValueChange={(itemValue) => setPersonAncestry(itemValue)}
                            style={generalStyles.input}
                            >
                            <Picker.Item label="Selecciona una opción" value="" enabled={false} />
                            {
                                ancestors.map((ancestor) => {
                                    return <Picker.Item label={ancestor.ancestry} value={ancestor.ancestry} key={ancestor._id} />
                                })
                            }
                        </Picker>
                        <Pressable style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? '#1f8eff' : '#007bff'
                            },
                            generalStyles.buttonContinue
                        ]} onPress={handleSumbit}>
                            <Text style={generalStyles.textButtonContinue}>Continuar</Text>
                        </Pressable>
                    </View>
                ) : (
                    <View style={questionnaireStyles.containFormQuestionnaire}>
                        <Text style={questionnaireStyles.titleFormQuestionnaire}>{survey.question.question}</Text>
                        <ButtonsSurvey handleSelect={handleSelect} isYes={isYes} isDisabled={isDisabled}
                            question={questions.find((question => question.question === survey.question.question))!} />
                        <Pressable style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? '#1f8eff' : isDisabled ? '#c1dbf7' : '#007bff'
                            },
                            generalStyles.buttonContinue
                        ]} onPress={handleContinue} disabled={isDisabled}>
                            <Text style={generalStyles.textButtonContinue}>Continuar</Text>
                        </Pressable>
                    </View>
                )
            }
        </ContainerBackground>
    )
}

export default Question