
const TextMain = ({ handleSurveyData }: { handleSurveyData: () => void }) => {
    return (
        <div className="flex justify-center items-center max-w-xl flex-col text-center">
            <p className="text-gray-900 font-bold text-4xl">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
            <p className="text-gray-900 font-semibold text-lg mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat atque reprehenderit voluptatem qui eveniet culpa soluta, quibusdam ut a eum doloremque ullam unde aut perspiciatis suscipit sapiente neque! Obcaecati, perferendis.</p>
            <button onClick={handleSurveyData} className="text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-lg px-4 py-2 mt-4">
                Empezar ahora
            </button>
        </div>
    )
}

export default TextMain