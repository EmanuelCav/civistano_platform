import Icon from "./components/Icon"
import Navigation from "./components/Navigation"
import StartHeader from "./components/StartHeader"

const Header = () => {
    return (
        <div className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <Icon />
                <StartHeader />
                <Navigation />
            </div>
        </div>
    )
}

export default Header