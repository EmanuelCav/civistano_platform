import Link from "next/link"

import { NavItemPropsType } from "@/types/header.types"

const NavItem = ({ text, link }: NavItemPropsType) => {
    return (
        <li className="mx-4">
            <Link href={link} className="block py-2 pr-4 pl-3 font-semibold text-gray-700 hover:bg-gray-100 active:bg-white">
                {text}
            </Link>
        </li>
    )
}

export default NavItem