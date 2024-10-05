import Image from "next/image"

const ImageMain = () => {
    return (
        <div className="flex justify-center items-center max-w-xl w-full">
            <Image src="/image_1.png" className="w-full h-full" width={400} height={0} alt="Imagen principal" />
        </div>
    )
}

export default ImageMain