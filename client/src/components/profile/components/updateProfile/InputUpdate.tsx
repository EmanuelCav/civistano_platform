import { InputUpdatePropsType } from "@/types/profile.types"

const InputUpdate = ({ question, error, register, text, value }: InputUpdatePropsType) => {
    return (
        <div className="w-full flex items-center justify-center flex-col mt-4">
            {error && <p className="text-red-500 text-xs italic my-2">{error.message}</p>}
                <label
                    htmlFor={text}
                    className="text-center block mb-1 text-md font-medium text-gray-900"
                >
                    {question}
                </label>
                <div className="flex items-center gap-4">
                    <input
                        type="number"
                        {...register(`${text}`, { required: true })}
                        min="0"
                        id={text}
                        defaultValue={value}
                        className={
                            `bg-gray-50 border mt-2 text-center text-gray-900 text-md rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5 w-28 
                    ${error ? "border-red-500" : "border-gray-300"}`
                        }
                    />
            </div>
        </div>

    )
}

export default InputUpdate