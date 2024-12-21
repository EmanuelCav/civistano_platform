import { IStep } from "@/interface/General"

const Experience = ({ experience }: { experience: IStep }) => {
    return (
        <li>
            <p className="text-gray-800">
                <span className="font-semibold text-sky-700 text-lg">{experience.title}: </span>
                {experience.description}</p>
        </li>
    )
}

export default Experience