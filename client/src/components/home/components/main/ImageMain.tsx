import Image from "next/image"

const ImageMain = () => {
    return (
        <div className="flex justify-center items-center max-w-xl w-full">
            <Image src="/image_1.png" width={500} height={500} loading="lazy"
            alt="Obtén tu Ciudadanía Italiana de Forma Sencilla y Guiada" className="max-w-full max-h-[200px] xl:max-h-[500px] object-contain" />
        </div>
    )
}

export default ImageMain