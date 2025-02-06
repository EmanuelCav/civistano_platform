'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

import { IContact, IReducer } from "@/interface/General";

import { selector } from "@/server/reducer/selector";
import { contactUser } from "@/server/actions/user.action";

import { contactSchema } from "@/schema/user.schema";

const Contact = () => {

  const user = useSelector((state: IReducer) => selector(state).user)

  const dispatch = useDispatch()

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(contactSchema),
  })

  const handleSumbitLogin = (data: IContact) => {
    dispatch(contactUser({
      contactData: data,
      token: user.user.token!
    }) as any)
  }

  return (
    <div className="min-h-screen mt-12 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Contáctanos</h1>
        <p className="text-gray-600 mb-2">
          Completa el formulario a continuación para contactarnos o mandanos un correo a:
        </p>
        <div className="flex justify-start items-center mt-1">
          <MdOutlineEmail size={20} color='#000000' />
          <p className="text-gray-600 ml-1">civistano@gmail.com</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit((data) => handleSumbitLogin(data))} onReset={reset as any}>
          <div className="mt-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
            {
              errors.email && <p className="text-red-500 text-xs italic my-2">{errors.email!.message}</p>
            }
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <IoPerson size={20} color='#000000' />
              </div>
              <input type="text" autoComplete="off" {...register("name", { required: true })} id="email" className={
                errors.email ? "bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:border-orange-500 block w-full ps-10 p-2.5"
                  : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-orange-500 block w-full ps-10 p-2.5"
              } placeholder="Nombre" maxLength={60} />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Correo electrónico</label>
            {
              errors.email && <p className="text-red-500 text-xs italic my-2">{errors.email!.message}</p>
            }
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <MdOutlineAlternateEmail size={20} color='#000000' />
              </div>
              <input type="text" {...register("email", { required: true })} id="email" className={
                errors.email ? "bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:border-orange-500 block w-full ps-10 p-2.5"
                  : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-orange-500 block w-full ps-10 p-2.5"
              } placeholder="Ej: tucorreo@gmail.com" maxLength={60} />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Mensaje</label>
            <textarea
              {...register("message", { required: true })}
              id="message"
              name="message"
              rows={6}
              className="mt-1 block w-full px-4 py-2 border bg-gray-50 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Escribe tu mensaje aquí"
              required
              maxLength={200}
            ></textarea>
          </div>
          <div className="my-4">
            <button className="text-white w-full bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-lg px-4 py-2 mt-4">
              ENVIAR
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact