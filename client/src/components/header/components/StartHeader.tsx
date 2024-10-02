
const StartHeader = ({ handleSurveyData }: { handleSurveyData: () => void }) => {
    return (
        <div className="flex items-center justify-center">
            <button className="text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-sm px-4 py-2" onClick={handleSurveyData}>
                Empezar ahora
            </button>
        </div>
    )
}

export default StartHeader