'use client'

import Image from 'next/image';
import { useSelector } from 'react-redux';

import { IReducer } from '@/interface/General';

import { selector } from "@/server/reducer/selector";

const Loading = () => {

    const response = useSelector((state: IReducer) => selector(state).response)

    return (
        <>
            {
                response.loading &&
                <div className="fixed top-0 left-0 w-full h-screen z-50 flex justify-center items-center p-4" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="relative bg-white flex flex-col justify-center items-center bg-white border border-gray-200 border-solid rounded-lg shadow p-6">
                        <Image src={'/civistano.png'} alt='civistano_logo' width={60} height={60} loading='lazy' />
                        <p className='text-sky-700 text-xl mt-4 font-semibold'>Cargando...</p>
                    </div>
                </div>
            }
        </>
    )
}

export default Loading