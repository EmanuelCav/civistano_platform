'use client'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import CompleteWarming from "@/components/panel/CompleteWarming";
import Checklist from "@/components/panel/Checklist";

import { IReducer } from "@/interface/General";

import { selector } from "@/server/reducer/selector";
import { authUser } from "@/server/reducer/user.reducer";

import { stepsCompleted } from "@/helper/functions";

const Panel = () => {

    const user = useSelector((state: IReducer) => selector(state).user)

    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if (user.user.token) {
            dispatch(authUser(user.user))
        } else {
            router.push("/")
        }
    }, [user.user.token])

    if (!user.user.token || !user.isLoggedIn) {
        return null
    }

    return (
        <div className="max-w-7xl mx-auto mt-32 p-2">
            <CompleteWarming />
            <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-xl">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Progreso</h1>
                <div className="space-y-8">
                    <p className="text-sky-700 text-xl font-semibold">
                        Pasos completados: ({stepsCompleted(user.user.user?.ancestry!)[0]}/{stepsCompleted(user.user.user?.ancestry!)[1]})
                    </p>
                    {user.user.user?.ancestry.map((ancestor) => {
                        return <div key={ancestor._id}>
                            {
                                ancestor.checklist.length > 0 && <p className="text-xl mb-4 ml-4">{ancestor.ancestry.ancestry} ({ancestor.checklist.filter(c => c.isChecked).length}/{ancestor.checklist.length})</p>
                            }
                            {
                                ancestor.checklist.map((item) => {
                                    return <Checklist dispatch={dispatch} item={item} aid={ancestor.ancestry._id} key={item._id} token={user.user.token!} />
                                })
                            }
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Panel;
