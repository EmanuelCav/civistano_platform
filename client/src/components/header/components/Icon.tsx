import Image from "next/image"
import Link from "next/link"

const Icon = ({ href }: { href: string }) => {
    return (
        <Link href={href} className="flex items-center cursor-pointer">
            <Image src="/logo.png" className="h-full" width={96} height={0} alt="Civistano Logo" />
        </Link>
    )
}

export default Icon