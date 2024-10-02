import { ReactNode } from 'react'

const ContainerFixed = ({ children }: { children: ReactNode }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-screen z-30 flex justify-center items-center p-4" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="bg-white w-full flex justify-center items-center flex-col max-w-lg border border-gray-200 border-solid rounded-lg shadow p-6">
                {children}
            </div>
        </div>
    )
}

export default ContainerFixed