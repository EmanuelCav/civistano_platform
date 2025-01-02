import { Text, View } from 'react-native'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IAncestry, IReducer } from '../../interface/General'
import { QuestionPropsType } from '../../types/questionnnaire.types'

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

    const handleSelectAncestry = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        setPersonAncestry(value)
    }

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

    const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSelect(false)

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
        <View>
            <Text>Question</Text>
        </View>
    )
}

export default Question