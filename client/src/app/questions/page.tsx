import OftenQuestion from "@/components/questions/OftenQuestion"

import { oftenQuestions } from "@/utils/oftenQuestions"

const Questions = () => {
  return (
    <div className="max-w-7xl my-48 mx-auto w-full px-4">
      <p className="my-2 text-gray-800 text-xl font-semibold text-center">¿Necesitas ayuda? Contáctanos a civistano@gmail.com</p>
      {
        oftenQuestions.map((question, index) => {
          return <OftenQuestion key={index} question={question} />
        })
      }
    </div>
  )
}

export default Questions