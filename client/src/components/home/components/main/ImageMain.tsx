import Image from "next/image"

const ImageMain = () => {
    return (
        <div className="flex justify-center items-center max-w-xl">
            <Image src="/logo.png" className="w-full h-full" width={400} height={0} alt="Imagen principal" />
        </div>
    )
}

export default ImageMain