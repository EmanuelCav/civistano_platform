import Link from "next/link"

import { SectionPropsType } from "@/types/home.types"

const Section = ({ title, tabs }: SectionPropsType) => {
    return (
        <div className="mt-2 text-center">
            <h2 className="mb-6 text-sm font-bold text-gray-100 uppercase select-none">{title}</h2>
            <ul className="text-gray-500 font-medium">
                {
                    tabs.map((tab, index) => {
                        return <li className="mb-4 text-gray-300" key={index}>
                            <Link href={tab.url} className="hover:underline">{tab.tab}</Link>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default Section