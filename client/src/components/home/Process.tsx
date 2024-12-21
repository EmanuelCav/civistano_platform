import StepProccess from "./components/process/StepProcess";

import { steps } from "@/utils/steps";

const Process = () => {
    return (
        <div className="bg-white w-full mt-8">
            <div className="max-w-7xl mx-auto h-full flex flex-col justify-evenly items-center w-full p-5">
                <h2 className="text-4xl text-sky-700 font-bold text-center mb-8 border-b-4 border-sky-700 pb-6 w-full">
                    Pasos para iniciar
                </h2>
                <p className="text-gray-800 font-semibold text-lg text-center mb-8">
                    Responde a un cuestionario inicial para determinar si eres elegible, consulta tu resultado y obtén una lista de pasos personalizados para continuar. Después, ingresa información adicional para adaptar los requisitos y recibe una guía detallada que te apoyará en cada etapa del proceso.
                </p>
                <div className="flex items-start justify-evenly w-full flex-wrap">
                    {steps.map((step, index) => (
                        <StepProccess step={step} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Process