'use client'

import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ContainerFixed from './ContainerFixed'
import ButtonsSurvey from "./components/question/ButtonsSurvey";

import { selector } from "@/server/reducer/selector";
import { updateQuestion } from "@/server/reducer/survey.reducer";
import { updateAncestry } from "@/server/reducer/user.reducer";

import { IReducer } from "@/interface/General";
import { QuestionPropsType } from "@/types/header.types";

import { questions } from '../../utils/questions'
import { ancestry } from "@/utils/selects";

const Question = ({ setIsAdministrative, setIsJudicial, setIsNotPossible, setIsQuestion }: QuestionPropsType) => {

    const survey = useSelector((state: IReducer) => selector(state).survey)

    const dispatch = useDispatch()

    const [isSelect, setIsSelect] = useState<boolean>(true)
    const [isYes, setIsYes] = useState<boolean>(false)
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    const [personAncestry, setPersonAncestry] = useState<string>('')

    const [questionId, setQuestionId] = useState<number | undefined>()

    const handleSelectAncestry = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        setPersonAncestry(value)
        dispatch(updateAncestry(ancestry.find(a => a.ancestry === personAncestry)!))
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

        if (ancestry.find((a) => a.ancestry === personAncestry)?.isFemale) {
            setQuestionId(1)
            dispatch(updateQuestion(questions.find((question => question.id === 1))))
        } else {
            setQuestionId(2)
            dispatch(updateQuestion(questions.find((question => question.id === 2))))
        }
    }

    return (
        <ContainerFixed>
            {
                isSelect ? <>
                    <p className="text-gray-900 text-xl my-2 text-center">Selecciona tu ascendiente italiano</p>
                    <form className="w-full" onSubmit={handleSumbit}>
                        <select defaultValue="" name="ancestry" id="ancestry" onChange={handleSelectAncestry}
                            className="bg-gray-50 my-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-orange-500 block w-full p-2.5">
                            <option disabled value="">Ascendiente italiano</option>
                            {
                                ancestry.map((value, index) => {
                                    return <option value={value.ancestry} key={index}>{value.ancestry}</option>
                                })
                            }
                        </select>
                        <button className={personAncestry.length === 0 ? "text-white w-full bg-sky-100 font-medium rounded-lg text-lg px-4 py-2 mt-4"
                            : "text-white w-full bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-lg px-4 py-2 mt-4"}
                            disabled={personAncestry.length === 0}>
                            CONTINUAR
                        </button>
                    </form>
                </> : <>
                    <p className="text-gray-900 text-xl my-2 text-center">{survey.question.question}</p>
                    <ButtonsSurvey handleSelect={handleSelect} isYes={isYes} isDisabled={isDisabled}
                        question={questions.find((question => question.question === survey.question.question))!} />
                    <button className={isDisabled ? "text-white w-full bg-sky-100 font-medium rounded-lg text-lg px-4 py-2 mt-4"
                        : "text-white w-full bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-lg px-4 py-2 mt-4"}
                        disabled={isDisabled} onClick={handleContinue}>
                        CONTINUAR
                    </button>
                </>
            }
        </ContainerFixed >
    )
}

export default Question