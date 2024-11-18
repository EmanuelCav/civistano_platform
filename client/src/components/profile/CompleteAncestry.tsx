import { useState } from "react"

import ContainerFixed from "../general/ContainerFixed"
import ButtonsAncestry from "./components/profileAncestry/ButtonsAncestry"

import { createAncestryUser } from "@/server/actions/user.action"

import { CompleteAncestryPropsType } from "@/types/profile.types"

const CompleteAncestry = ({ ancestry, ancestryMale, mainAncestry, dispatch, user, setIsCompleteAncestry }: CompleteAncestryPropsType) => {

    const [isFemale, setIsFemale] = useState<boolean>(false)
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    const handleFemale = (isUpdateFemale: boolean) => {
        setIsFemale(isUpdateFemale)
        setIsDisabled(false)
    }

    const handleContinue = () => {
        dispatch(createAncestryUser({
            id: isFemale ? ancestry?._id! : ancestryMale?._id!,
            token: user.token!,
            setIsCompleteAncestry
        }))
    }

    return (
        <ContainerFixed>
            <p className="text-gray-900 text-xl my-2 text-center">Selecciona la persona descendiente de tu {mainAncestry}</p>
            <ButtonsAncestry isFemale={isFemale} isDisabled={isDisabled} ancestry={ancestry} ancestryMale={ancestryMale} handleFemale={handleFemale} />
            <button className={isDisabled ? "text-white w-full bg-sky-100 font-medium rounded-lg text-lg px-4 py-2 mt-4"
                : "text-white w-full bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-lg px-4 py-2 mt-4"}
                disabled={isDisabled} onClick={handleContinue}>
                CONTINUAR
            </button>
        </ContainerFixed>
    )
}

export default CompleteAncestry