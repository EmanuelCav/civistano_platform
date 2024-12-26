import Image from "next/image"

const HeaderLogin = () => {
    return (
        <div className="my-4 flex justify-between items-center w-full">
            <Image src="/logo.png" alt="civistano" height={400} width={100} />
            <p className="text-gray-900 text-2xl">¡Obtén tu Ciudadanía Italiana de Forma Sencilla y Guiada!</p>
        </div>
    )
}

export default HeaderLogin