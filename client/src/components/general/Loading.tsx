'use client'

import Image from 'next/image';
import { useSelector } from 'react-redux';

import ContainerFixed from './ContainerFixed';

import { IReducer } from '@/interface/General';

import { selector } from "@/server/reducer/selector";

const Loading = () => {

    const response = useSelector((state: IReducer) => selector(state).response)

    return (
        <>
            {
                response.loading &&
                <ContainerFixed>
                    <Image src={'/civistano.png'} alt='civistano_logo' width={40} height={40} loading='lazy' />
                </ContainerFixed>
            }
        </>
    )
}

export default Loading