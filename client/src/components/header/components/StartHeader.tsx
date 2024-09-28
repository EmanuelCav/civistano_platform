import Link from "next/link"

const StartHeader = () => {
    return (
        <div className="flex items-center justify-center">
            <Link href="#" className="text-white bg-sky-700	hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-sm px-4 py-2 ">
                Empezar ahora
            </Link>
        </div>
    )
}

export default StartHeader