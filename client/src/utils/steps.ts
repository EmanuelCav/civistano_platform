import { IPosibility, IStep } from "@/interface/General";

export const steps: IStep[] = [
    {
        title: "Completa el cuestionario inicial",
        description: "Responde un cuestionario corto y conciso para analizar si puedes obtener la ciudadanía italiana a través de tu ancestro.",
    },
    {
        title: "Observa tu resultado",
        description: "Una vez completado el cuestionario, obtendrás tu resultado. Revisa tu estado y, a continuación, se generará una lista detallada con los pasos a seguir.",
    },
    {
        title: "Completa tu perfil",
        description: "Proporciona información adicional para personalizar los requisitos y recibir una guía completa. Te acompañaremos en cada paso del proceso.",
    },
];

export const posibilieties: IPosibility[] = [
    {
        title: "Vía Administrativa",
        description: "Si tienes ascendencia italiana, es el camino más común para obtener la ciudadanía. Puede brindarse en casos de descendencia, matrimonio o naturalización.",
        image: "/home/process.png"
    },
    {
        title: "Vía Judicial",
        description: "Situaciones donde hay complicaciones con los documentos o si el solicitante no puede demostrar claramente su derecho a la ciudadanía.",
        image: "/home/judgment.png"
    },
    {
        title: "Falta de Requisitos",
        description: "En ciertos casos, no es posible obtener la ciudadanía italiana. Esto puede ocurrir cuando no hay vínculo de ascendencia italiano válido o por renuncia a la ciudadania italiana.",
        image: "/home/file.png"
    },
]

export const experiences: IStep[] = [
    {
        title: "Personalización",
        description: "Checklists adaptados a tu situación."
    },
    {
        title: "Simplicidad",
        description: "Una interfaz intuitiva para facilitar el proceso."
    },
    {
        title: "Soporte",
        description: "Te acompañamos con información clara y precisa en cada paso."
    }
]
