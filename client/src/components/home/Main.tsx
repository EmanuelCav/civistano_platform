import ImageMain from "./components/main/ImageMain"
import TextMain from "./components/main/TextMain"

const Main = () => {
    return (
        <div className="max-w-7xl mt-32 flex justify-center items-center w-full flex-wrap bg-red-200 p-5">
            <ImageMain />
            <TextMain />
        </div>
    )
}

export default Main