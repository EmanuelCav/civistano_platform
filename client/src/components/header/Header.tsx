'use client'

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter, usePathname } from 'next/navigation'
import { GiHamburgerMenu } from "react-icons/gi";

import Icon from "./components/Icon"
import Navigation from "./components/Navigation"
import StartHeader from "./components/StartHeader"
import SurveyData from "../general/SurveyData"
import Question from "../general/Question"
import Return from "../general/Return"
import Register from "../general/Register"
import Open from "./components/Open";

import { IReducer } from "@/interface/General"

import { selector } from "@/server/reducer/selector"

const Header = () => {

    const user = useSelector((state: IReducer) => selector(state).user)

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const dispatch = useDispatch()
    const router = useRouter()
    const pathname = usePathname()

    const [isSurveyData, setIsSurveyData] = useState<boolean>(false)
    const [isQuestion, setIsQuestion] = useState<boolean>(false)

    const [isAdministrative, setIsAdministrative] = useState<boolean>(false)
    const [isJudicial, setIsJudicial] = useState<boolean>(false)
    const [isNotPossible, setIsNotPossible] = useState<boolean>(false)
    const [isEmail, setIsEmail] = useState<boolean>(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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

    const handleCancel = () => {
        setIsAdministrative(false)
        setIsJudicial(false)
        setIsNotPossible(false)
    }

    return (
        <header className="bg-white border-gray-200 z-20 px-4 border-b border-solid fixed top-0 w-full">
            {
                isOpen && <Open router={router} handleSurveyData={handleSurveyData} token={user.user.token!} setIsOpen={setIsOpen} />
            }
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
                isAdministrative && <Return title="Vía Administrativa" 
                text="Si tienes ascendencia italiana, es el camino más común para obtener la ciudadanía. Puede brindarse en casos de descendencia, matrimonio o naturalización." 
                func={handleContinue} />
            }
            {
                isJudicial && <Return title="Vía Judicial" 
                text="Situaciones donde hay complicaciones con los documentos o si el solicitante no puede demostrar claramente su derecho a la ciudadanía." 
                func={handleCancel} />
            }
            {
                isNotPossible && <Return title="Falta de Requisitos" 
                text="En ciertos casos, no es posible obtener la ciudadanía italiana. Esto puede ocurrir cuando no hay vínculo de ascendencia italiano válido o por renuncia a la ciudadania italiana." 
                func={handleCancel} />
            }
            {
                isEmail && <Register dispatch={dispatch} router={router} setIsEmail={setIsEmail} />
            }
            <div className="hidden md:block w-full">
                <div className="flex justify-between items-center mx-auto max-w-screen-xl px-2">
                    <Icon href={user.user.token ? "/panel" : "/"} />
                    <Navigation />
                    <StartHeader handleSurveyData={handleSurveyData} user={user} pathname={pathname} />
                </div>
            </div>
            <div className="md:hidden w-full flex justify-between items-center">
                <Icon href={user.user.token ? "/panel" : "/"} />
                <GiHamburgerMenu size={24} className="text-gray-600 cursor-pointer" onClick={toggleMenu} />
            </div>
        </header>
    )
}

export default Header