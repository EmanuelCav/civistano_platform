import { FaTrash } from "react-icons/fa";

import { ProfileAncestryPropsType } from "@/types/profile.types"

const ProfileAncestry = ({ ancestor, updateProfile, removeAncestry, index }: ProfileAncestryPropsType) => {
  return (
    <div className="flex flex-wrap sm:flex-row flex-col items-center sm:items-center justify-between w-full px-4 py-2 bg-gray-50 rounded shadow-md border border-gray-200">
      <div>
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          {
            index === 0 && <FaTrash size={20} color="#ff0000" onClick={removeAncestry} className="cursor-pointer hover:bg-red-200 active:bg-white" />
          }
          <p>{ancestor.ancestry.ancestry}</p>
        </h3>
        <p className="text-gray-900 text-lg">Casamientos: {ancestor.weddings ? ancestor.weddings : 0}</p>
        <p className="text-gray-900 text-lg">Divorcios: {ancestor.divorces ? ancestor.divorces : 0}</p>
        {
          ancestor.ancestry.ancestry !== 'USTED' &&
          <p className="text-gray-900 text-lg">Difunto: {ancestor.death ? 'Si' : 'No'}</p>
        }
        {
          ancestor.ancestry.ancestry === 'USTED' &&
          <p className="text-gray-900 text-lg">Hijos menores de edad: {ancestor.children ? ancestor.children : 0}</p>
        }
      </div>
      <button
        className="mt-2 px-4 py-1 bg-blue-500 font-semibold text-white rounded hover:bg-blue-600 active:bg-blue-500 transition-all duration-200"
        onClick={() => updateProfile(ancestor.ancestry)}
      >
        ACTUALIZAR
      </button>
    </div>
  )
}

export default ProfileAncestry