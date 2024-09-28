import Link from "next/link"

import { NavItemPropsType } from "@/types/header.types"

const NavItem = ({ text, link }: NavItemPropsType) => {
    return (
        <li>
            <Link href={link} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0">
                {text}
            </Link>
        </li>
    )
}

export default NavItem