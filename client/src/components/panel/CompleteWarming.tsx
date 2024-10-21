import Link from "next/link"

import { IoIosInformationCircle } from "react-icons/io";

const CompleteWarming = () => {
  return (
    <div className="my-4 mx-auto w-full flex justify-between items-center p-4 border-gray-200 shadow border-solid border flex-wrap">
        <div className="flex justify-center items-center flex-wrap">
            <IoIosInformationCircle size={24} color="#ff0000" />
            <p className="text-gray-900 text-xl ml-2">Para poder ayudarte necesitamos más información acerca de tí y tu ascendencia</p>
        </div>
        <Link href="/profile" className="bg-sky-700 rounded mt-2 p-2 text-white text-lg hover:bg-sky-800 active:bg-sky-700 font-semibold text-center">
            Completar ahora
        </Link>
    </div>
  )
}

export default CompleteWarming