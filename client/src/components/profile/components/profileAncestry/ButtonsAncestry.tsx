import { ButtonsAncestryPropsType } from '@/types/profile.types'

const ButtonsAncestry = ({ isFemale, isDisabled, ancestry, ancestryMale, handleFemale }: ButtonsAncestryPropsType) => {
    return (
        <div className='w-full flex justify-around flex-col items-center my-6'>
            <p className="text-gray-900 text-xl my-2 text-center"></p>
            <div className="w-full mt-4 flex justify-evenly items-center">
                <button className={isFemale && !isDisabled ? 'py-4 px-8 border-gray-400 bg-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'
                    : 'py-4 px-8 border-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'} onClick={() => handleFemale(true)}>
                    {ancestry?.ancestry}
                </button>
                <button className={!isFemale && !isDisabled ? 'py-4 px-8 border-gray-400 bg-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'
                    : 'py-4 px-8 border-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'} onClick={() => handleFemale(false)}>
                    {ancestryMale?.ancestry}
                </button>
            </div>
        </div>
    )
}

export default ButtonsAncestry