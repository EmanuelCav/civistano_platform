import { IOftenQuestion } from '@/interface/General'

const OftenQuestion = ({ question }: { question: IOftenQuestion }) => {
    return (
        <div className="max-w-4xl mx-auto my-4 p-4 bg-white rounded-lg shadow-md shadow-gray-300 
        w-full flex justify-start items-center hover:shadow-lg transition-shadow flex-col">
            <h2 className="text-2xl text-sky-700 font-bold text-center pb-6 w-full">
                {question.question}
            </h2>
            <p className='text-gray-800 text-lg text-center'>{question.answer}</p>
        </div>
    )
}

export default OftenQuestion