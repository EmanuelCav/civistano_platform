import Link from "next/link"

import LogoFooter from "./components/LogoFooter"
import Section from "./components/Section"

import { policiesTab, resourceTab } from "@/utils/tabs"

const Footer = () => {
    return (
        <footer className="bg-slate-950 mt-32">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="flex justify-center items-center">
                    <div className="flex w-full justify-around items-start flex-wrap">
                        <Section title="Recursos" tabs={resourceTab} />
                        <Section title="Información importante" tabs={policiesTab} />
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <LogoFooter />
                    <p className="text-sm text-gray-100 sm:text-center select-none">© 2024 <Link href="/" className="hover:underline">Civistano</Link>. Copyright.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer