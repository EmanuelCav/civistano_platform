import { ReactNode } from 'react'

const ContainerFixed = ({ children }: { children: ReactNode }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-screen z-30 flex justify-center items-center p-4" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="relative bg-white w-full max-w-lg bg-white border border-gray-200 border-solid rounded-lg shadow p-6 h-full sm:h-auto overflow-y-auto">
                {children}
            </div>
        </div>
    )
}

export default ContainerFixed