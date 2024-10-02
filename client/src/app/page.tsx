'use client'

import { useState } from "react";

import SurveyData from "@/components/general/SurveyData";
import Main from "@/components/home/Main";
import Question from "@/components/general/Question";

export default function Home() {

  const [isSurveyData, setIsSurveyData] = useState<boolean>(false)
  const [isQuestion, setIsQuestion] = useState<boolean>(false)

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
        isQuestion && <Question />
      }
      <Main handleSurveyData={handleSurveyData} />
    </div>
  );
}
