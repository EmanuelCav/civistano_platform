
const Step = () => {
    return (
        <div className="flex items-start border-b border-gray-200 border-solid">
            <div className="w-10 h-10 bg-gray-400 rounded-full flex justify-center items-center text-white font-bold">
                -
            </div>
            <div className="ml-4 flex-1 p-2 rounded-md cursor-pointer hover:bg-gray-100 active:bg-white">
                <h2 className="text-2xl font-semibold text-gray-700">Initial Setup</h2>
                <p className="text-gray-800 mt-2">In this step, we lay the foundation by setting up the project environment and installing essential dependencies.</p>
                <p className="text-gray-600 mt-6">Pendiente</p>
            </div>
        </div>
    )
}

export default Step