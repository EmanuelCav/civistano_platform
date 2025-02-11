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
import { logoutAction, removeAncestryUser, removeUser, restartAncestryUser } from "@/server/actions/user.action"
import { getAncestors } from "@/server/actions/ancestry.action"
import { authUser } from "@/server/reducer/user.reducer"

import { IAncestry, IReducer } from "@/interface/General"

const Profile = () => {

    const user = useSelector((state: IReducer) => selector(state).user)

    const dispatch = useDispatch()
    const router = useRouter()

    const [isUpdateAncestry, setIsUpdateAncestry] = useState<boolean>(false)
    const [isCompleteAncestry, setIsCompleteAncestry] = useState<boolean>(false)
    const [isRemoveAncestry, setIsRemoveAncestry] = useState<boolean>(false)

    const [isRestart, setIsRestart] = useState<boolean>(false)
    const [isRemove, setIsRemove] = useState<boolean>(false)
    const [isLogout, setIsLogout] = useState<boolean>(false)
    const [isAdd, setIsAdd] = useState<boolean>(false)

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

    const addAncestry = (ancestryUpdateFemale: IAncestry, ancestryUpdateMale: IAncestry) => {
        setAncestry(ancestryUpdateFemale)
        setAncestryMale(ancestryUpdateMale)
        setIsAdd(!isAdd)
    }

    const handleRemoveUser = () => {
        dispatch(removeUser({
            id: user.user.user?._id!,
            router,
            token: user.user.token!
        }) as any)
    }

    const handleLogout = () => {
        dispatch(logoutAction(router) as any)
    }

    const handleRemoveAncestry = () => {
        dispatch(removeAncestryUser({
            token: user.user.token!,
            setIsRemoveAncestry
        }) as any)
    }

    const handleRestartUser = () => {
        dispatch(restartAncestryUser({
            token: user.user.token!,
            setIsRestart
        }) as any)
    }

    useEffect(() => {
        if (user.user.token) {
            dispatch(getAncestors(setAncestors) as any)
            dispatch(authUser(user.user))
        } else {
            router.push("/")
        }
    }, [user.user.token])

    if (!user.user.token || !user.isLoggedIn) {
        return null
    }

    return (
        <div className="max-w-7xl mx-auto mt-32">
            {
                isRemove && <Sure text="¿Esta seguro de que desea eliminar tu usuario?" func={handleRemoveUser} handleClose={() => setIsRemove(false)} />
            }
            {
                isRestart && <Sure text="¿Esta seguro de que desea restaurar toda la información?" func={handleRestartUser} handleClose={() => setIsRestart(false)} />
            }
            {
                isLogout && <Sure text="¿Esta seguro de que desea cerrar sesión?" func={handleLogout} handleClose={() => setIsLogout(false)} />
            }
            {
                isAdd && <CompleteAncestry user={user.user} ancestry={ancestry} ancestryMale={ancestryMale} upward={true}
                    setIsCompleteAncestry={setIsAdd} mainAncestry={user.user.user?.ancestry[0].ancestry.ancestry!} dispatch={dispatch} />
            }
            {
                isRemoveAncestry && <Sure text="¿Esta seguro de que desea eliminar el último ancestro?" func={handleRemoveAncestry} handleClose={() => setIsRemoveAncestry(false)} />
            }
            {
                isUpdateAncestry && <UpdateProfile dispatch={dispatch} user={user.user}
                    index={user.user.user?.ancestry.findIndex((a) => a.ancestry.ancestry === ancestry?.ancestry)!}
                    ancestry={ancestry} setIsUpdateProfile={setIsUpdateAncestry} />
            }
            {
                isCompleteAncestry && <CompleteAncestry ancestry={ancestry} ancestryMale={ancestryMale} setIsCompleteAncestry={setIsCompleteAncestry}
                    mainAncestry={user.user.user?.ancestry[0].ancestry.ancestry!} dispatch={dispatch} user={user.user} upward={false} />
            }
            <div className="w-full border-t border-gray-300 my-8 p-4 mx-auto max-w-4xl">
                <p className="text-2xl font-semibold mb-4">Árbol Genealógico</p>
                <div className="space-y-4">
                    {
                        user.user.user?.ancestry[0].ancestry.hierarchy! !== 1 ?
                            <>
                                {
                                    user.user.user?.ancestry.map((ancestor, index) => (
                                        <ProfileAncestry
                                            index={index}
                                            updateProfile={() => updateProfile(ancestor.ancestry)}
                                            ancestor={ancestor}
                                            removeAncestry={() => setIsRemoveAncestry(true)}
                                            key={ancestor._id}
                                        />
                                    ))
                                }
                            </> : <ProfileAncestry
                                index={user.user.user?.ancestry.length! - 1}
                                updateProfile={() => updateProfile(user.user.user?.ancestry[user.user.user?.ancestry.length - 1].ancestry!)}
                                ancestor={user.user.user?.ancestry[user.user.user?.ancestry.length - 1]!}
                                removeAncestry={() => setIsRemoveAncestry(true)}
                            />
                    }
                </div>
                <div className="space-y-4">
                    {ancestors.length > 0 && user.user.user?.ancestry.length! > 1 && user.user.user?.ancestry[0].ancestry.hierarchy &&
                        new Array(user.user.user?.ancestry[0].ancestry.hierarchy - (user.user.user?.ancestry[1].ancestry.hierarchy ? user.user.user?.ancestry[1].ancestry.hierarchy : 0) - 1)
                            .fill(0).map((_, index) => (
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
            <DangerZone handleIsLogout={() => setIsLogout(true)} handleIsRemove={() => setIsRemove(true)}
                handleIsRestart={() => setIsRestart(true)} completeAncestry={addAncestry} ancestors={ancestors} ancestor={user.user.user?.ancestry[0].ancestry!}
                ancestryNumber={user.user.user?.ancestry[0].ancestry.hierarchy ? user.user.user?.ancestry[0].ancestry.hierarchy + 1 : 1} />
        </div>
    )
}

export default Profile