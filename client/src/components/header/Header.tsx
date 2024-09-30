'use client'

import { useState } from "react"

import Icon from "./components/Icon"
import Navigation from "./components/Navigation"
import StartHeader from "./components/StartHeader"
import SurveyData from "../general/SurveyData"

const Header = () => {

    const [isSurveyData, setIsSurveyData] = useState<boolean>(false)

    const handleSurveyData = () => {
        setIsSurveyData(!isSurveyData)
    }

    return (
        <div className="bg-white border-gray-200 px-4 border-b border-solid fixed top-0 w-full">
            {
                isSurveyData && <SurveyData handleSurveyData={handleSurveyData} />
            }
            <div className="flex justify-between items-center mx-auto max-w-screen-xl px-2">
                <Icon />
                <Navigation />
                <StartHeader />
            </div>
        </div>
    )
}

export default Header