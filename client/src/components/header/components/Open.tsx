import Link from "next/link"

import { OpenPropsType } from "@/types/header.types"

const Open = ({ handleSurveyData, router, token, setIsOpen }: OpenPropsType) => {

    const redirectAuth = () => {
        setIsOpen(false)
        router.push('/auth')
    }

    const redirectProfile = () => {
        setIsOpen(false)
        router.push('/profile')
    }

    return (
        <nav className="md:hidden bg-white border-t border-gray-200">
            <div className="flex flex-col items-center space-y-4 py-4">
                <Link href="/about" onClick={() => setIsOpen(false)}>
                    <p className="text-gray-600 hover:text-gray-800">Nosotros</p>
                </Link>
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <p className="text-gray-600 hover:text-gray-800">Contacto</p>
                </Link>
                <Link href="/questions" onClick={() => setIsOpen(false)}>
                    <p className="text-gray-600 hover:text-gray-800">Preguntas Frecuentes</p>
                </Link>
                {
                    !token && <button className="text-white bg-sky-700 hover:bg-sky-800 w-2/3 active:bg-sky-700 font-medium rounded-lg text-sm px-4 py-2 mx-2" onClick={handleSurveyData}>
                        Empezar ahora
                    </button>
                }
                {
                    !token && <button className="text-white bg-sky-700 hover:bg-sky-800 w-2/3 active:bg-sky-700 font-medium rounded-lg text-sm px-4 py-2 mx-2" onClick={redirectAuth}>
                        Iniciar sesión
                    </button>
                }
                {
                    token && <button className="text-white bg-sky-700 hover:bg-sky-800 w-2/3 active:bg-sky-700 font-medium rounded-lg text-sm px-4 py-2 mx-2" onClick={redirectProfile}>
                        Perfil
                    </button>
                }
            </div>
        </nav>
    )
}

export default Open