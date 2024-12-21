import Experiences from "./components/choose/Experiences";
import Start from "./components/choose/Start";

const Choose = () => {
    return (
        <div className="bg-choose-background bg-cover min-h-screen flex flex-col items-center justify-evenly p-8">
            <Experiences />
            <Start />
        </div>
    );
}

export default Choose