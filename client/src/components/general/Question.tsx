'use client'

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ContainerFixed from './ContainerFixed'
import ButtonsSurvey from "./components/question/ButtonsSurvey";

import { selector } from "@/server/reducer/selector";

import { updateQuestion } from "@/server/reducer/survey.reducer";

import { IReducer } from "@/interface/General";

import { questions } from '../../utils/questions'

const Question = () => {

    const survey = useSelector((state: IReducer) => selector(state).survey)

    const dispatch = useDispatch()

    const [isYes, setIsYes] = useState<boolean>(false)
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    const handleSelect = (value: boolean) => {
        setIsYes(value)
        setIsDisabled(false)
    }

    const handleContinue = () => {
        if (isYes) {
            dispatch(updateQuestion(questions.yes))
        } else {
            dispatch(updateQuestion(questions.no))
        }

        setIsDisabled(true)
    }

    useEffect(() => {
        dispatch(updateQuestion(questions))
    }, [])

    return (
        <ContainerFixed>
            <p className="text-gray-900 text-xl my-2 text-center">{survey.question.question}</p>
            <ButtonsSurvey handleSelect={handleSelect} isYes={isYes} isDisabled={isDisabled} />
            <button className={isDisabled ? "text-white w-full bg-sky-100 font-medium rounded-lg text-lg px-4 py-2 mt-4"
                : "text-white w-full bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-lg px-4 py-2 mt-4"}
                disabled={isDisabled} onClick={handleContinue}>
                CONTINUAR
            </button>
        </ContainerFixed>
    )
}

export default Question