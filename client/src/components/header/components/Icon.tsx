import Image from "next/image"

const Icon = () => {
    return (
        <a href="/" className="flex items-center cursor-pointer">
            <Image src="/logo.png" className="h-full" width={96} height={0} alt="Civistano Logo" />
        </a>
    )
}

export default Icon