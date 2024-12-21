import ImageMain from "./components/main/ImageMain"
import TextMain from "./components/main/TextMain"

const Main = ({ handleSurveyData }: { handleSurveyData: () => void }) => {
    return (
        <div className="bg-process-background bg-cover h-auto xl:h-screen mt-24 xl:mt-0">
            <div className="max-w-7xl mx-auto h-full flex justify-center items-center w-full flex-wrap p-5">
                <ImageMain />
                <TextMain handleSurveyData={handleSurveyData} />
            </div>
        </div>
    )
}

export default Main