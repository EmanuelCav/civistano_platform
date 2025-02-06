const TextMain = ({ handleSurveyData }: { handleSurveyData: () => void }) => {
    return (
        <div className="max-w-xl">
            <div className="bg-white shadow-md border-gray-300 flex justify-center items-center flex-col p-4 text-center">
                <h1 className="font-bold text-4xl text-sky-700">
                    ¡Obtén tu Ciudadanía Italiana de Forma Sencilla y Guiada!
                </h1>
                <p className="text-gray-600 font-medium text-lg mt-4">
                    Comenzamos con un cuestionario inicial que evalúa si es posible obtener la ciudadanía a través de tu ancestro. 
                    Este análisis detallado te permitirá saber con claridad si cumples con los requisitos necesarios. 
                    Una vez superado el cuestionario, te proporcionaremos una lista personalizada de tareas para completar tu trámite de manera efectiva y organizada.
                </p>
                <button
                    onClick={handleSurveyData}
                    className="text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-lg px-4 py-2 mt-4 w-full"
                >
                    Empezar ahora
                </button>
            </div>
        </div>
    );
};

export default TextMain;
