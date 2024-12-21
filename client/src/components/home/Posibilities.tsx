import Posibility from "./components/process/Posibility";

import { posibilieties } from "@/utils/steps";

const Posibilities = () => {
    return (
        <div className="bg-white w-full mt-8">
            <div className="max-w-7xl mx-auto h-full flex flex-col justify-evenly items-center w-full p-5">
                <h2 className="text-4xl text-sky-700 font-bold text-center mb-8 border-b-4 border-sky-700 pb-6 w-full">
                    Posibles resultados
                </h2>
                <p className="text-gray-800 font-medium text-lg text-center mb-8">
                    Responde a un cuestionario inicial para determinar si eres elegible, consulta tu resultado y obtén una lista de pasos personalizados para continuar. Después, ingresa información adicional para adaptar los requisitos y recibe una guía detallada que te apoyará en cada etapa del proceso.
                </p>
                <div className="flex items-start justify-evenly w-full flex-wrap">
                    {posibilieties.map((posibility, index) => (
                        <Posibility posibility={posibility} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Posibilities;
