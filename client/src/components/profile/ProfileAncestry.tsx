import { ProfileAncestryPropsType } from "@/types/profile.types"

const ProfileAncestry = ({ ancestor, updateProfile }: ProfileAncestryPropsType) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between w-full px-4 py-2 bg-gray-50 rounded shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold"><p>{ancestor.ancestry.ancestry}</p></h3>
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