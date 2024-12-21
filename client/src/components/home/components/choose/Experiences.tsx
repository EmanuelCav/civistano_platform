import Experience from "./components/Experience"

import { experiences } from "@/utils/steps"

const Experiences = () => {
    return (
        <div className="max-w-5xl bg-white shadow-lg rounded-lg p-8 mb-12">
            <h2 className="text-4xl font-bold text-sky-700 text-center mb-4">
                Tu mejor aliado en el camino hacia la ciudadanía italiana
            </h2>
            <ul className="space-y-4">
                {
                    experiences.map((experience, index) => {
                        return <Experience experience={experience} key={index} />
                    })
                }
            </ul>
        </div>
    )
}

export default Experiences