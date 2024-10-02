export const questions = {
    question: "¿Alguno de tus ascendentes de primer grado (padres) tiene la ciudadania italiana?",
    no: {
        question: "¿Tu AVO (antepasado nacido en Italia del cual vas a tomar la ciudadanía) renunció a la ciudadania italiana antes de que naciera su descendencia?",
        no: {
            question: "¿Tu AVO (antepasado nacido en Italia del cual vas a tomar la ciudadanía) es de género femenino?",
            no: {

            },
            yes: {
                question: "¿El primer ancestro mujer de la linea directa nació antes de 1948?",
                no: undefined,
                yes: undefined,
                isAdministrative: true
            }
        },
        yes: {

        },
        isAdministrative: true
    },
    yes: {
        question: "¿Tu ascendencia renunció a la ciudadania italiana antes de que naciera su descendencia?",
        no: {
            question: "¿Tu AVO (antepasado nacido en Italia del cual vas a tomar la ciudadanía) es de género femenino?",
            no: {

            },
            yes: {
                question: "¿El primer ancestro mujer de la linea directa nació antes de 1948?",
                no: undefined,
                yes: undefined,
                isAdministrative: true
            }
        },
        yes: undefined,
        isAdministrative: true
    },
    isAdministrative: true
}