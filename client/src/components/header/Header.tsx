'use client'

import { useState } from "react"

import Icon from "./components/Icon"
import Navigation from "./components/Navigation"
import StartHeader from "./components/StartHeader"
import SurveyData from "../general/SurveyData"
import Question from "../general/Question"
import Return from "../general/Return"

const Header = () => {

    const [isSurveyData, setIsSurveyData] = useState<boolean>(false)
    const [isQuestion, setIsQuestion] = useState<boolean>(false)

    const [isAdministrative, setIsAdministrative] = useState<boolean>(false)
    const [isJudicial, setIsJudicial] = useState<boolean>(false)
    const [isNotPossible, setIsNotPossible] = useState<boolean>(false)

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
                isAdministrative && <Return text="Es administrativo" />
            }
            {
                isJudicial && <Return text="Es judicial" />
            }
            {
                isNotPossible && <Return text="No es posible" />
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