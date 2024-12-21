'use client'

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'

import SurveyData from "@/components/general/SurveyData";
import Main from "@/components/home/Main";
import Question from "@/components/general/Question";
import Return from "@/components/general/Return";
import Register from "@/components/general/Register";
import Process from "@/components/home/Process";
import Posibilities from "@/components/home/Posibilities";
import Choose from "@/components/home/Choose";

export default function Home() {

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
    <div className="w-full">
      {
        isSurveyData && <SurveyData handleClose={handleClose} handleShowQuestion={handleShowQuestion} />
      }
      {
        isQuestion && <Question setIsAdministrative={setIsAdministrative}
          setIsJudicial={setIsJudicial}
          setIsNotPossible={setIsNotPossible}
          setIsQuestion={setIsQuestion} />
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
      <Main handleSurveyData={handleSurveyData} />
      <Process />
      <Posibilities />
      <Choose />
    </div>
  );
}
