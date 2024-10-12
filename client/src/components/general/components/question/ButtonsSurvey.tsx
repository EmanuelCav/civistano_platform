import { ButtonsSurveyPropsType } from "@/types/header.types"

const ButtonsSurvey = ({ handleSelect, isDisabled, isYes, question }: ButtonsSurveyPropsType) => {
  return (
    <div className='w-full flex justify-around items-center my-6'>
        <button className={isYes && !isDisabled ? 'py-4 px-8 border-gray-400 bg-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold' 
        : 'py-4 px-8 border-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'} 
        onClick={() => handleSelect(true, question ? question.yes : undefined)}>
            SI
        </button>
        <button className={!isYes && !isDisabled ? 'py-4 px-8 border-gray-400 bg-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold' 
        : 'py-4 px-8 border-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'} 
        onClick={() => handleSelect(false, question ? question.no : undefined)}>
            NO
        </button>
    </div>
  )
}

export default ButtonsSurvey