'use client'

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from 'next/navigation'

import Icon from "./components/Icon"
import Navigation from "./components/Navigation"
import StartHeader from "./components/StartHeader"
import SurveyData from "../general/SurveyData"
import Question from "../general/Question"
import Return from "../general/Return"
import Register from "../general/Register"

const Header = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const [isSurveyData, setIsSurveyData] = useState<boolean>(false)
    const [isQuestion, setIsQuestion] = useState<boolean>(false)

    const [isAdministrative, setIsAdministrative] = useState<boolean>(false)
    const [isJudicial, setIsJudicial] = useState<boolean>(false)
    const [isNotPossible, setIsNotPossible] = useState<boolean>(false)
    const [isEmail, setIsEmail] = useState<boolean>(false)

    const handleClose = () => {
        setIsSurveyData(false)
        setIsQuestion(false)
    }

    const handleSurveyData = () => {
        setIsSurveyData(!isSurveyData)
    }

    const handleShowQuestion = () => {
        setIsSurveyData(false)
        setIsQuestion(!isQuestion)
    }

    const handleContinue = () => {
        setIsAdministrative(false)
        setIsJudicial(false)
        setIsNotPossible(false)
        setIsEmail(true)
    }

    return (
        <div className="bg-white border-gray-200 px-4 border-b border-solid fixed top-0 w-full">
            {
                isSurveyData && <SurveyData handleClose={handleClose} handleShowQuestion={handleShowQuestion} />
            }
            {
                isQuestion && <Question setIsAdministrative={setIsAdministrative}
                    setIsNotPossible={setIsNotPossible}
                    setIsQuestion={setIsQuestion}
                    setIsJudicial={setIsJudicial} />
            }
            {
                isAdministrative && <Return text="Es administrativo" func={handleContinue} />
            }
            {
                isJudicial && <Return text="Es judicial" func={handleContinue} />
            }
            {
                isNotPossible && <Return text="No es posible" func={handleContinue} />
            }
            {
                isEmail && <Register dispatch={dispatch} router={router} setIsEmail={setIsEmail} />
            }
            <div className="flex justify-between items-center mx-auto max-w-screen-xl px-2">
                <Icon />
                <Navigation />
                <StartHeader handleSurveyData={handleSurveyData} />
            </div>
        </div>
    )
}

export default Header