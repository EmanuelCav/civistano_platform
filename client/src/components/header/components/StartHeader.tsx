import Link from "next/link"

import { StartHeaderPropsType } from "@/types/header.types"

const StartHeader = ({ handleSurveyData, user, pathname }: StartHeaderPropsType) => {

    return (
        <div className="flex items-center justify-center">
            {
                user.isLoggedIn ? (
                    <button className="text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-sm px-4 py-2 mx-2" onClick={handleSurveyData}>
                        Perfil
                    </button>
                ) : (
                    <>
                        <button className="text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-sm px-4 py-2 mx-2" onClick={handleSurveyData}>
                            Empezar ahora
                        </button>
                        {
                            pathname !== "/auth" &&
                            <Link href="/auth" className="text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-sm px-4 py-2 mx-2">
                                Iniciar sesión
                            </Link>
                        }
                    </>
                )
            }
        </div >
    )
}

export default StartHeader