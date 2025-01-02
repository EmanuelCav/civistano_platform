import Link from "next/link"

import { OpenPropsType } from "@/types/header.types"

const Open = ({ handleSurveyData, router, token }: OpenPropsType) => {
    return (
        <nav className="md:hidden bg-white border-t border-gray-200">
            <div className="flex flex-col items-center space-y-4 py-4">
                <Link href="/about">
                    <p className="text-gray-600 hover:text-gray-800">Nosotros</p>
                </Link>
                <Link href="/contact">
                    <p className="text-gray-600 hover:text-gray-800">Contacto</p>
                </Link>
                {
                    !token && <button className="text-white bg-sky-700 hover:bg-sky-800 w-2/3 active:bg-sky-700 font-medium rounded-lg text-sm px-4 py-2 mx-2" onClick={handleSurveyData}>
                        Empezar ahora
                    </button>
                }
                {
                    !token && <button className="text-white bg-sky-700 hover:bg-sky-800 w-2/3 active:bg-sky-700 font-medium rounded-lg text-sm px-4 py-2 mx-2" onClick={() => router.push('/auth')}>
                        Iniciar sesión
                    </button>
                }
                {
                    token && <button className="text-white bg-sky-700 hover:bg-sky-800 w-2/3 active:bg-sky-700 font-medium rounded-lg text-sm px-4 py-2 mx-2" onClick={() => router.push('/profile')}>
                        Perfil
                    </button>
                }
            </div>
        </nav>
    )
}

export default Open