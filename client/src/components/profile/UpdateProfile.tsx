import { useState } from "react"
import { useForm } from "react-hook-form"

import ContainerFixed from "../general/ContainerFixed"
import ButtonsUpdate from "./components/updateProfile/ButtonsUpdate"
import InputUpdate from "./components/updateProfile/InputUpdate"

import { yupResolver } from "@hookform/resolvers/yup"

import { IUpdateAncestry, IAncestryData } from "@/interface/User"
import { UpdateProfilePropsType } from "@/types/profile.types"

import { updateAncestryUser } from "@/server/actions/user.action"

import { profileSchema } from "@/schema/user.schema"

const UpdateProfile = ({ dispatch, user, ancestry, setIsUpdateProfile }: UpdateProfilePropsType) => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(profileSchema),
  })

  const [isMarried, setIsMarried] = useState<boolean>(user.user!.ancestry[0].weddings ? user.user!.ancestry[0].weddings === 0 : false)
  const [isDead, setIsDead] = useState<boolean>(user.user!.ancestry[0].death ? user.user!.ancestry[0].death : false)
  const [isDivorced, setIsDivorced] = useState<boolean>(user.user!.ancestry[0].divorces ? user.user!.ancestry[0].divorces === 0 : false)

  const handleSumbitUpdateProfile = (data: IUpdateAncestry) => {

    const ancestryData: IAncestryData = {
      children: data.children!,
      death: isDead!,
      divorces: data.divorces!,
      weddings: data.weddings!
    }

    dispatch(updateAncestryUser({
      userData: ancestryData,
      id: ancestry?._id!,
      token: user.token!,
      setIsUpdateProfile
    }))
  }

  const handleIsMarried = (isMarriedButton: boolean) => {
    setIsMarried(isMarriedButton)
  }

  const handleIsDead = (isDeadButton: boolean) => {
    setIsDead(isDeadButton)
  }

  const handleIsDivorced = (isDivorced: boolean) => {
    setIsDivorced(isDivorced)
  }

  return (
    <ContainerFixed>
      <p className="text-gray-900 text-xl my-2 text-center">{ancestry?.ancestry}</p>
      <form className="w-full" onReset={reset as any} onSubmit={handleSubmit((data) => handleSumbitUpdateProfile(data))}>
        <ButtonsUpdate func={handleIsMarried} isBoolean={isMarried} question={`¿Su ${ancestry?.ancestry} se ha casado?`} />
        {
          isMarried && <InputUpdate register={register} error={errors.weddings} question={`¿Cuantas veces se ha casado su ${ancestry?.ancestry}?`} text="weddings" />
        }
        <ButtonsUpdate func={handleIsDivorced} isBoolean={isDivorced} question={`¿Su ${ancestry?.ancestry} se ha divorciado?`} />
        {
          isDivorced && <InputUpdate register={register} error={errors.divorces} question={`¿Cuantas veces se ha divorciado su ${ancestry?.ancestry}?`} text="divorces" />
        }
        <ButtonsUpdate func={handleIsDead} isBoolean={isDead} question={`¿Su ${ancestry?.ancestry} ha fallecido?`} />
        <div className="mt-4">
          <button className="text-white w-full bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-lg px-4 py-2 mt-4">
            ACEPTAR
          </button>
        </div>
      </form>
    </ContainerFixed>
  )
}

export default UpdateProfile