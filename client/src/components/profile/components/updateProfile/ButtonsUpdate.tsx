import { ButtonsUpdatePropsType } from "@/types/profile.types"

const ButtonsUpdate = ({ func, isBoolean, question }: ButtonsUpdatePropsType) => {
    return (
        <div className='w-full flex justify-around flex-col items-center mt-4'>
            <p className="text-gray-900 text-xl my-2 text-center">{question}</p>
            <div className="w-full mt-4 flex justify-evenly items-center">
                <button onClick={(e) => {
                    e.preventDefault();
                    func(true);
                }} className={isBoolean ? 'py-4 px-8 border-gray-400 bg-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'
                    : 'py-4 px-8 border-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'} >
                    SI
                </button>
                <button onClick={(e) => {
                    e.preventDefault();
                    func(false);
                }} className={!isBoolean ? 'py-4 px-8 border-gray-400 bg-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'
                    : 'py-4 px-8 border-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'} >
                    NO
                </button>
            </div>
        </div>
    )
}

export default ButtonsUpdate