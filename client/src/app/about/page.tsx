import Link from "next/link"

const About = () => {
    return (
        <div className="max-w-7xl my-48 mx-auto w-full px-4">
            <p className="mt-2 text-gray-900">En Civistano, estamos comprometidos a simplificar el proceso para obtener la ciudadanía italiana. Sabemos que este trámite puede parecer complejo y abrumador, por eso hemos creado una solución intuitiva que guía a cada usuario paso a paso, desde la evaluación inicial hasta la obtención de la ciudadanía.</p>
            <h2 className="mt-2 font-semibold text-xl text-gray-900">Nuestra Misión</h2>
            <p className="mt-2 text-gray-900">Brindar una experiencia personalizada y eficiente que permita a cualquier persona con ascendencia italiana descubrir su elegibilidad y gestionar su solicitud de ciudadanía de forma clara, organizada y sin complicaciones.</p>
            <p className="mt-2 text-gray-900">Nuestra plataforma ofrece un enfoque personalizado que adapta las tareas a cada usuario, mostrando solo los pasos relevantes para su caso. Además, cuenta con una interfaz intuitiva que facilita el seguimiento de cada etapa y brinda soporte constante con información precisa, consejos útiles y orientación clara en todo momento.</p>
            <h2 className="mt-2 font-semibold text-xl text-gray-900">¿Por qué elegirnos?</h2>
            <p className="mt-2 text-gray-900">En Civistano, creemos que obtener tu ciudadanía italiana no debería ser un proceso complicado. Estamos aquí para hacerlo sencillo, claro y accesible para ti.</p>
            <p className="mt-2 text-gray-900">Iniciamos con un análisis detallado mediante un cuestionario que evalúa tu elegibilidad, seguido de una guía completa con una hoja de ruta personalizada que abarca desde la recopilación de documentos hasta el contacto con las autoridades italianas. Además, te acompañamos en todo el proceso, brindándote el apoyo necesario para superar cualquier obstáculo que pueda surgir.</p>
            <p className="mt-2 text-gray-900">¡Da el primer paso hacia tu ciudadanía italiana con nosotros hoy mismo!</p>
            <p className="mt-6 text-gray-900 font-semibold">Contacto: civistano@gmail.com</p>
            <p className="mt-2 text-gray-900 font-semibold">Términos y condiciones:
                <Link href="/policies/terms-of-service" className="ml-2 text-blue-500 text-lg hover:underline active:no-underline">Términos y condiciones</Link>
            </p>
            <p className="mt-2 text-gray-900 font-semibold">Políticas de privacidad:
                <Link href="/policies/privacy-policy" className="ml-2 text-blue-500 text-lg hover:underline active:no-underline">Políticas y privacidad</Link>
            </p>
        </div>
    )
}

export default About