'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'

import HeaderLogin from "@/components/auth/HeaderLogin";
import CodeForm from "@/components/auth/CodeForm";

import { IEmail } from "@/interface/User";
import { IReducer } from "@/interface/General";

import { loginUser } from "@/server/actions/user.action";
import { selector } from "@/server/reducer/selector";

import { emailSchema } from "@/schema/user.schema";

const Auth = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const user = useSelector((state: IReducer) => selector(state).user)

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(emailSchema),
    })

    const handleSumbitLogin = (data: IEmail) => {
        dispatch(loginUser({
            emailData: data,
            setIsLoggedIn
        }) as any)
    }

    return (
        <div className="max-w-7xl my-48 mx-auto w-full px-4">
            {
                isLoggedIn && <CodeForm dispatch={dispatch} router={router} token={user.user.token!} />
            }
            <form className="max-w-xl p-4 mx-auto border border-gray-300 border-solid rounded-md shadow-md"
                onReset={reset as any} onSubmit={handleSubmit((data) => handleSumbitLogin(data))}>
                <p className="text-sky-700 font-semibold text-3xl">Iniciar sesión</p>
                <HeaderLogin />
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
                <p className="my-4 text-gray-900 text-md">¿Todavia no respondiste el cuestionario?
                    <Link href="/" className="text-sky-700 font-semibold ml-2 hover:underline active:no-underline">Empezar ahora</Link>
                </p>
                <div className="my-4">
                    <button className="text-white w-full bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-lg px-4 py-2 mt-4">
                        ACEPTAR
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Auth