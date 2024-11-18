import { useState } from "react"
import { useForm } from "react-hook-form"

import ContainerFixed from "../general/ContainerFixed"

import { yupResolver } from "@hookform/resolvers/yup"

import { IUpdateAncestry } from "@/interface/User"
import { UpdateProfilePropsType } from "@/types/profile.types"

import { profileSchema } from "@/schema/user.schema"

const UpdateProfile = ({ dispatch, user, ancestry }: UpdateProfilePropsType) => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(profileSchema),
  })

  const [isMarried, setIsMarried] = useState<boolean>(user.ancestry[0].weddings ? user.ancestry[0].weddings === 0 : false)
  const [isDead, setIsDead] = useState<boolean>(user.ancestry[0].death ? user.ancestry[0].death : false)
  const [isDivorced, setIsDivorced] = useState<boolean>(user.ancestry[0].divorces ? user.ancestry[0].divorces === 0 : false)

  const handleSumbitUpdateProfile = (data: IUpdateAncestry) => {
    
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
      <p className="text-gray-900 text-xl my-2 text-center">{ancestry ? ancestry.ancestry : ""}</p>
      <form className="w-full" onReset={reset as any} onSubmit={handleSubmit((data) => handleSumbitUpdateProfile(data))}>
        <div className='w-full flex justify-around flex-col items-center mt-4'>
          <p className="text-gray-900 text-xl my-2 text-center">¿Su {ancestry ? ancestry.ancestry : ""} se ha casado alguna vez?</p>
          <div className="w-full mt-4 flex justify-evenly items-center">
            <button onClick={() => handleIsMarried(true)} className={isMarried ? 'py-4 px-8 border-gray-400 bg-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'
              : 'py-4 px-8 border-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'} >
              SI
            </button>
            <button onClick={() => handleIsMarried(false)} className={!isMarried ? 'py-4 px-8 border-gray-400 bg-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'
              : 'py-4 px-8 border-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'} >
              NO
            </button>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="weddings" className="block mb-2 text-sm font-medium text-gray-900">¿Cuántas veces se ha casado su {ancestry ? ancestry.ancestry : ""}?</label>
          {
            errors.weddings && <p className="text-red-500 text-xs italic my-2">{errors.weddings!.message}</p>
          }
          <div className="relative">
            <input type="number" {...register("weddings", { required: true })} min="0" id="weddings" defaultValue={0} className={
              errors.weddings ? "bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:border-orange-500 block w-full ps-10 p-2.5"
                : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-orange-500 block w-full ps-10 p-2.5"
            } />
          </div>
        </div>
        <div className='w-full flex justify-around flex-col items-center mt-4'>
          <p className="text-gray-900 text-xl my-2 text-center">¿Su {ancestry ? ancestry.ancestry : ""} se ha divorciado alguna vez?</p>
          <div className="w-full mt-4 flex justify-evenly items-center">
            <button onClick={() => handleIsDivorced(true)} className={isDivorced ? 'py-4 px-8 border-gray-400 bg-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'
              : 'py-4 px-8 border-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'} >
              SI
            </button>
            <button onClick={() => handleIsDivorced(false)} className={!isDivorced ? 'py-4 px-8 border-gray-400 bg-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'
              : 'py-4 px-8 border-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'}
            >
              NO
            </button>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="divorces" className="block mb-2 text-sm font-medium text-gray-900">
            ¿Cuántas veces se ha divorciado su {ancestry ? ancestry.ancestry : ""}?
          </label>
          {
            errors.weddings && <p className="text-red-500 text-xs italic my-2">{errors.divorces!.message}</p>
          }
          <div className="relative">
            <input type="number" {...register("divorces", { required: true })} min="0" id="divorces" defaultValue={0} className={
              errors.divorces ? "bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:border-orange-500 block w-full ps-10 p-2.5"
                : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-orange-500 block w-full ps-10 p-2.5"
            } />
          </div>
        </div>
        <div className='w-full flex justify-around flex-col items-center mt-4'>
          <p className="text-gray-900 text-xl my-2 text-center">¿Su {ancestry ? ancestry.ancestry : ""} ha fallecido?</p>
          <div className="w-full mt-4 flex justify-evenly items-center">
            <button onClick={() => handleIsDead(true)} className={isDead ? 'py-4 px-8 border-gray-400 bg-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'
              : 'py-4 px-8 border-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'}
            >
              SI
            </button>
            <button onClick={() => handleIsDead(false)} className={!isDead ? 'py-4 px-8 border-gray-400 bg-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'
              : 'py-4 px-8 border-gray-400 border border-solid hover:bg-gray-200 active:bg-white rounded-md text-gray-900 font-semibold'}
            >
              NO
            </button>
          </div>
        </div>
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