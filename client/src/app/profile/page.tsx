'use client'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"

import ProfileAncestry from "@/components/profile/ProfileAncestry"
import ProfileIncomplete from "@/components/profile/ProfileIncomplete"
import UpdateProfile from "@/components/profile/UpdateProfile"
import CompleteAncestry from "@/components/profile/CompleteAncestry"
import DangerZone from "@/components/profile/DangerZone"
import Sure from "@/components/profile/components/dangerZone/Sure"

import { selector } from "@/server/reducer/selector"
import { getUser, logoutAction, removeUser } from "@/server/actions/user.action"
import { getAncestors } from "@/server/actions/ancestry.action"

import { IAncestry, IReducer } from "@/interface/General"

const Profile = () => {

    const user = useSelector((state: IReducer) => selector(state).user)

    const dispatch = useDispatch()
    const router = useRouter()

    const [isUpdateAncestry, setIsUpdateAncestry] = useState<boolean>(false)
    const [isCompleteAncestry, setIsCompleteAncestry] = useState<boolean>(false)

    const [isRestart, setIsRestart] = useState<boolean>(false)
    const [isRemove, setIsRemove] = useState<boolean>(false)
    const [isLogout, setIsLogout] = useState<boolean>(false)

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

    const handleRemoveUser = () => {
        dispatch(removeUser({
            id: user.user.user?._id!,
            router,
            token: user.user.token!
        }) as any)
    }

    const handleRestartUser = () => {

    }

    const handleLogout = () => {
        dispatch(logoutAction(router) as any)
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
                isRemove && <Sure text="¿Esta seguro de que desea restaurar toda la información?" func={handleRemoveUser} handleClose={() => setIsRemove(false)} />
            }
            {
                isRestart && <Sure text="¿Esta seguro de que desea eliminar tu usuario?" func={handleRestartUser} handleClose={() => setIsRestart(false)} />
            }
            {
                isLogout && <Sure text="¿Esta seguro de que desea cerrar sesión?" func={handleLogout} handleClose={() => setIsLogout(false)} />
            }
            {
                isUpdateAncestry && <UpdateProfile dispatch={dispatch} user={user.user}
                    index={user.user.user?.ancestry.findIndex((a) => a.ancestry.ancestry === ancestry?.ancestry)!}
                    ancestry={ancestry} setIsUpdateProfile={setIsUpdateAncestry} />
            }
            {
                isCompleteAncestry && <CompleteAncestry ancestry={ancestry} ancestryMale={ancestryMale} setIsCompleteAncestry={setIsCompleteAncestry}
                    mainAncestry={user.user.user?.ancestry[0].ancestry.ancestry!} dispatch={dispatch} user={user.user} />
            }
            <div className="w-full border-t border-gray-300 my-8 p-4 mx-auto max-w-4xl">
                <p className="text-2xl font-semibold mb-4">Árbol Genealógico</p>
                <div className="space-y-4">
                    {user.user.user?.ancestry.map((ancestor) => (
                        <ProfileAncestry
                            updateProfile={() => updateProfile(ancestor.ancestry)}
                            ancestor={ancestor}
                            key={ancestor._id}
                        />
                    ))}
                </div>
                <div className="space-y-4">
                    {ancestors.length > 0 &&
                        new Array(user.user.user?.ancestry.length! - 1).fill(0).map((_, index) => (
                            <ProfileIncomplete
                                ancestryNumber={
                                    user.user.user?.ancestry[0].ancestry.hierarchy! - index - 1
                                }
                                ancestors={ancestors}
                                completeAncestry={completeAncestry}
                                key={index}
                            />
                        ))}
                </div>
            </div>
            <DangerZone handleIsLogout={() => setIsLogout(true)} handleIsRemove={() => setIsRemove(true)} handleIsRestart={() => setIsRestart(true)} />
        </div>
    )
}

export default Profile