'use client'

import { useState } from "react";

import SurveyData from "@/components/general/SurveyData";
import Main from "@/components/home/Main";

export default function Home() {

  const [isSurveyData, setIsSurveyData] = useState<boolean>(false)

  const handleSurveyData = () => {
    setIsSurveyData(!isSurveyData)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {
        isSurveyData && <SurveyData handleSurveyData={handleSurveyData} />
      }
      <Main handleSurveyData={handleSurveyData} />
    </div>
  );
}
