import { ButtonsAncestryPropsType } from '@/types/profile.types'

const ButtonsAncestry = ({ isFemale, isDisabled, ancestry, ancestryMale, handleFemale }: ButtonsAncestryPropsType) => {
    return (
        <div className='w-full flex justify-around flex-col mt-2 items-center'>
            <div className="w-full flex justify-evenly items-center">
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