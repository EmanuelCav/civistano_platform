import { StepProccessPropsType } from "@/types/home.types"

const StepProccess = ({ step, index }: StepProccessPropsType) => {
    return (
        <div key={index} className="max-w-72 min-h-64 h-full text-center mb-4 shadow-md shadow-gray-300 p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center mx-auto justify-center w-12 h-12 rounded-full bg-sky-700 text-white font-bold mb-4">
                {index + 1}
            </div>
            <h3 className="text-lg text-sky-700 font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-700">{step.description}</p>
        </div>
    )
}

export default StepProccess