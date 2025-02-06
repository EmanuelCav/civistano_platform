import Image from 'next/image'
import Link from 'next/link'

const LogoFooter = () => {
    return (
        <div className="mb-6 md:mb-0">
            <Link href="/" className='items-center flex'>
                <Image src='/civistano.png' alt='logo' loading="lazy"
                 width={66} height={66} />
            </Link>
        </div>
    )
}

export default LogoFooter