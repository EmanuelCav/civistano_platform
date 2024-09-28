import Link from "next/link"

const StartHeader = () => {
    return (
        <div className="flex items-center">
            <Link href="#" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                Get started
            </Link>
        </div>
    )
}

export default StartHeader