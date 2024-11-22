import Link from "next/link"

import { ButtonHeaderPropsType } from "@/types/header.types"

const ButtonHeader = ({ href, Icon, text, color }: ButtonHeaderPropsType) => {
    return (
        <Link className={`flex items-center justify-evenly text-white bg-${color}-700 hover:bg-${color}-800 active:bg-${color}-700 font-medium rounded-lg text-sm px-4 py-2 mx-4`} 
        href={href}>
            <Icon size={20} className="mr-2" />
            <p className="text-md">{text}</p>
        </Link>
    )
}

export default ButtonHeader