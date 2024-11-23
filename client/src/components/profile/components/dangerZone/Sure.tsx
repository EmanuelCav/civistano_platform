import { IoMdClose } from "react-icons/io";

import ContainerFixed from "@/components/general/ContainerFixed"

import { SurePropsType } from "@/types/profile.types"

const Sure = ({ text, handleClose, func }: SurePropsType) => {
    return (
        <ContainerFixed>
            <div className="p-2 w-full flex justify-end">
                <IoMdClose color="#ff0000" size={28} className="cursor-pointer hover:bg-gray-200 active:bg-white" onClick={handleClose} />
            </div>
            <p className="text-gray-900 text-xl text-center">{text}</p>
            <div className="mt-4 w-full">
                <button onClick={func}
                    className="text-white w-full bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-lg px-4 py-2 mt-4">
                    ACEPTAR
                </button>
            </div>
        </ContainerFixed>
    )
}

export default Sure