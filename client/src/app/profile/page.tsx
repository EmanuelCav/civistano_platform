'use client'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"

import ProfileAncestry from "@/components/profile/ProfileAncestry"
import ProfileIncomplete from "@/components/profile/ProfileIncomplete"
import UpdateProfile from "@/components/profile/UpdateProfile"
import CompleteAncestry from "@/components/profile/CompleteAncestry"

import { selector } from "@/server/reducer/selector"
import { getUser } from "@/server/actions/user.action"
import { getAncestors } from "@/server/actions/ancestry.action"

import { IAncestry, IReducer } from "@/interface/General"

const Profile = () => {

    const user = useSelector((state: IReducer) => selector(state).user)

    const dispatch = useDispatch()
    const router = useRouter()

    const [isUpdateAncestry, setIsUpdateAncestry] = useState<boolean>(false)
    const [isCompleteAncestry, setIsCompleteAncestry] = useState<boolean>(false)

    const [ancestors, setAncestors] = useState<IAncestry[]>([])
    const [ancestry, setAncestry] = useState<IAncestry | undefined>()
    const [ancestryMale, setAncestryMale] = useState<IAncestry | undefined>()

    const updateProfile = (ancestryUpdate: IAncestry) => {
        setAncestry(ancestryUpdate)
        setIsUpdateAncestry(!isUpdateAncestry)
    }

    const completeAncestry = (ancestryUpdateFemale: IAncestry, ancestryUpdateMale: IAncestry) => {
        setAncestry(ancestryUpdateFemale)
        setAncestryMale(ancestryUpdateMale)
        setIsCompleteAncestry(!isCompleteAncestry)
    }

    useEffect(() => {
        if (user.user.token) {
            dispatch(getAncestors(setAncestors) as any)
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
                isUpdateAncestry && <UpdateProfile dispatch={dispatch} user={user.user} ancestry={ancestry} setIsUpdateProfile={setIsUpdateAncestry} />
            }
            {
                isCompleteAncestry && <CompleteAncestry ancestry={ancestry} ancestryMale={ancestryMale} setIsCompleteAncestry={setIsCompleteAncestry}
                mainAncestry={user.user.user?.ancestry[0].ancestry.ancestry!} dispatch={dispatch} user={user.user} />
            }
            <div className="flex flex-col items-center space-y-6">
                <h1 className="text-2xl font-bold mb-6">Árbol Genealógico</h1>
                {
                    user.user.user?.ancestry.map((ancestor) => {
                        return <ProfileAncestry updateProfile={updateProfile} ancestor={ancestor} key={ancestor._id} />
                    })
                }
                {
                    new Array((user.user.user?.ancestry.length! - user.user.user?.ancestry[user.user.user?.ancestry.length - 1].ancestry.hierarchy! - 1)).fill(0)
                    .map((_, index) => {
                        return <ProfileIncomplete ancestryNumber={user.user.user?.ancestry[user.user.user?.ancestry.length - 1].ancestry.hierarchy! - index - 1} 
                        ancestors={ancestors} completeAncestry={completeAncestry} key={index} />
                    })
                }
            </div>
        </div>
    )
}

export default Profile