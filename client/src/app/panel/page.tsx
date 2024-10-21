'use client'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation'

import Step from "@/components/panel/Step";
import CompleteWarming from "@/components/panel/CompleteWarming";

import { getUser } from "@/server/actions/user.action";
import { selector } from "@/server/reducer/selector";

import { IReducer } from "@/interface/General";

const Panel = () => {

    const user = useSelector((state: IReducer) => selector(state).user)

    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if(user.user.token) {
            dispatch(getUser({
                id: user.user.user?._id!,
                router,
                token: user.user.token
            }) as any)
        }
    }, [])

    return (
        <div className="max-w-7xl mx-auto mt-32 p-2">
            <CompleteWarming />
            <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-xl">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Roadmap</h1>
                <div className="space-y-8">
                    <Step />
                    <Step />
                    <Step />
                    <Step />
                </div>
            </div>
        </div>
    )
}

export default Panel;
