'use client'

import { useState } from "react";

import SurveyData from "@/components/general/SurveyData";
import Main from "@/components/home/Main";
import Question from "@/components/general/Question";
import Return from "@/components/general/Return";

export default function Home() {

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
    <div className="max-w-7xl mx-auto">
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
        isAdministrative && <Return text="Es administrativo" />
      }
      {
        isJudicial && <Return text="Es judicial" />
      }
      {
        isNotPossible && <Return text="No es posible" />
      }
      <Main handleSurveyData={handleSurveyData} />
      <Main handleSurveyData={handleSurveyData} />
      <Main handleSurveyData={handleSurveyData} />
      <Main handleSurveyData={handleSurveyData} />
    </div>
  );
}
