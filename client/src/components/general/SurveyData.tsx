import Image from "next/image"

import { IoMdClose } from "react-icons/io";

import ContainerFixed from "./ContainerFixed";

import { SurveyDataPropsType } from "@/types/header.types";

const SurveyData = ({ handleClose, handleShowQuestion }: SurveyDataPropsType) => {
    return (
        <ContainerFixed>
            <div className="flex h-full items-center justify-between flex-col">
                <div className="p-2 w-full flex justify-end">
                    <IoMdClose color="#ff0000" size={28} className="cursor-pointer hover:bg-gray-200 active:bg-white" onClick={handleClose} />
                </div>
                <div className="items-center justify-start flex-col flex flex-1">
                    <Image src='/image_1.png' width={174} height={0} alt="image_1" />
                    <p className="text-gray-900 text-xl my-2">Responde a un cuestionario inicial para determinar si eres elegible, consulta tu resultado y obtén una lista de pasos personalizados para continuar.</p>
                </div>
                <button className="text-white w-full bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-lg px-4 py-2 mt-4" onClick={handleShowQuestion}>
                    INICIAR
                </button>
            </div>
        </ContainerFixed>
    )
}

export default SurveyData