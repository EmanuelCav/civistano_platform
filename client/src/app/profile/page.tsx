'use client'

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"

import ProfileAncestry from "@/components/profile/ProfileAncestry"

import { selector } from "@/server/reducer/selector"
import { getUser } from "@/server/actions/user.action"

import { IReducer } from "@/interface/General"

const Profile = () => {

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
        <div className="max-w-7xl mx-auto mt-32">
            {
                user.user.user?.ancestry.map((ancestor, index) => {
                    return <ProfileAncestry key={index} />
                })
            }
        </div>
    )
}

export default Profile