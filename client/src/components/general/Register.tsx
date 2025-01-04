import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { yupResolver } from "@hookform/resolvers/yup";
import { MdOutlineAlternateEmail } from "react-icons/md";

import ContainerFixed from "./ContainerFixed"

import { getEmail } from '@/server/actions/user.action';
import { selector } from '@/server/reducer/selector';

import { IEmail } from '@/interface/User';
import { IReducer } from '@/interface/General';
import { RegisterPropsType } from '@/types/home.types';

import { emailSchema } from '@/schema/user.schema';

const Register = ({ dispatch, router, setIsEmail }: RegisterPropsType) => {

    const user = useSelector((state: IReducer) => selector(state).user)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(emailSchema),
    })

    const handleSumbitRegister = (data: IEmail) => {
        dispatch(getEmail({
            data,
            id: user.user.ancestry?._id!,
            router,
            setIsEmail
        }))
    }

    return (
        <ContainerFixed>
            <form className="flex h-full items-center justify-between flex-col w-full" onReset={reset as any} onSubmit={handleSubmit((data) => handleSumbitRegister(data))}>
                <div className="items-center justify-start flex-col flex flex-1 w-full">
                    <div className="mt-4 w-full">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Correo electrónico</label>
                        {
                            errors.email && <p className="text-red-500 text-xs italic my-2">{errors.email!.message}</p>
                        }
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 z-10 flex items-center ps-3.5 pointer-events-none">
                                <MdOutlineAlternateEmail size={20} color='#000000' />
                            </div>
                            <input type="text" {...register("email", { required: true })} id="email" className={
                                errors.email ? "bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:border-orange-500 block w-full ps-10 p-2.5"
                                    : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-orange-500 block w-full ps-10 p-2.5"
                            } placeholder="Ej: tucorreo@gmail.com" maxLength={60} />
                        </div>
                    </div>
                </div>
                <div className="mt-4 w-full">
                    <button className="text-white w-full bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-lg px-4 py-2 mt-4">
                        ACEPTAR
                    </button>
                </div>
            </form>
        </ContainerFixed>
    )
}

export default Register