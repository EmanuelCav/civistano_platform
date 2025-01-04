import { useState } from "react"
import { useForm } from "react-hook-form"
import { IoMdClose } from 'react-icons/io'

import ContainerFormFixed from "../general/ContainerFormFixed"
import ButtonsUpdate from "./components/updateProfile/ButtonsUpdate"
import InputUpdate from "./components/updateProfile/InputUpdate"

import { yupResolver } from "@hookform/resolvers/yup"

import { IUpdateAncestry, IAncestryData } from "@/interface/User"
import { UpdateProfilePropsType } from "@/types/profile.types"

import { updateAncestryUser } from "@/server/actions/user.action"

import { profileSchema } from "@/schema/user.schema"

const UpdateProfile = ({ dispatch, user, ancestry, setIsUpdateProfile, index }: UpdateProfilePropsType) => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(profileSchema),
  })

  const [isMarried, setIsMarried] = useState<boolean>(user.user!.ancestry[index].weddings ? user.user!.ancestry[index].weddings !== 0 : false)
  const [isDead, setIsDead] = useState<boolean>(user.user!.ancestry[index].death ? user.user!.ancestry[index].death : false)
  const [isDivorced, setIsDivorced] = useState<boolean>(user.user!.ancestry[index].divorces ? user.user!.ancestry[index].divorces !== 0 : false)
  const [isChildren, setIsChildren] = useState<boolean>(user.user!.ancestry[index].children ? user.user!.ancestry[index].children !== 0 : false)

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

  const handleIsChildren = (isChildrenButton: boolean) => {
    setIsChildren(isChildrenButton)
  }

  const handleIsDead = (isDeadButton: boolean) => {
    setIsDead(isDeadButton)
  }

  const handleIsDivorced = (isDivorced: boolean) => {
    setIsDivorced(isDivorced)
  }

  return (
    <ContainerFormFixed>
      <IoMdClose className="absolute top-5 right-10 cursor-pointer hover:bg-red-100 active:bg-white"
        color="#ff4444" size={28} onClick={() => setIsUpdateProfile(false)} />
      <form className="w-full" onReset={reset as any} onSubmit={handleSubmit((data) => handleSumbitUpdateProfile(data))}>
        <ButtonsUpdate func={handleIsMarried} isBoolean={isMarried}
          question={`${user.user?.ancestry[index].ancestry.ancestry === 'USTED' ? '' : '¿Su'} ${ancestry?.ancestry} se ha casado?`} />
        {
          isMarried && <InputUpdate register={register} value={user.user!.ancestry[index].weddings ? user.user!.ancestry[index].weddings : 0}
            error={errors.weddings} question={`¿Cuantas veces se ha casado ${user.user?.ancestry[index].ancestry.ancestry === 'USTED' ? '' : 'su'} ${ancestry?.ancestry}?`} text="weddings" />
        }
        <ButtonsUpdate func={handleIsDivorced} isBoolean={isDivorced}
          question={`${user.user?.ancestry[index].ancestry.ancestry === 'USTED' ? '' : '¿Su'} ${ancestry?.ancestry} se ha divorciado?`} />
        {
          isDivorced && <InputUpdate register={register}
            value={user.user!.ancestry[index].divorces ? user.user!.ancestry[index].divorces : 0} error={errors.divorces}
            question={`¿Cuantas veces se ha divorciado ${user.user?.ancestry[index].ancestry.ancestry === 'USTED' ? '' : 'su'} ${ancestry?.ancestry}?`} text="divorces" />
        }
        {
          user.user?.ancestry[index].ancestry.ancestry === 'USTED' ? (
            <>
              <ButtonsUpdate func={handleIsChildren} isBoolean={isChildren}
                question={`${user.user?.ancestry[index].ancestry.ancestry === 'USTED' ? '' : '¿Su'} ${ancestry?.ancestry} tiene hijos menor de edad?`} />
              {
                isChildren && <InputUpdate register={register}
                  value={user.user!.ancestry[index].children ? user.user!.ancestry[index].children : 0} error={errors.children}
                  question={`¿Cuantos hijos menores de edad tiene ${user.user?.ancestry[index].ancestry.ancestry === 'USTED' ? '' : 'su'} ${ancestry?.ancestry}?`} text="children" />
              }
            </>
          ) : (
            <ButtonsUpdate func={handleIsDead} isBoolean={isDead} question={`¿Su ${ancestry?.ancestry} ha fallecido?`} />
          )
        }
        <div className="mt-4 w-full">
          <button className="text-white w-full bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-lg px-4 py-2 mt-4">
            ACEPTAR
          </button>
        </div>
      </form>
    </ContainerFormFixed>
  )
}

export default UpdateProfile