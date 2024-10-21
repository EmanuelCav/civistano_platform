import Image from "next/image"

const HeaderLogin = () => {
    return (
        <div className="my-4 flex justify-between items-center w-full">
            <Image src="/logo.png" alt="civistano" height={400} width={100} />
            <p className="text-gray-900 text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
        </div>
    )
}

export default HeaderLogin