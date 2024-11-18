import { ProfileAncestryPropsType } from "@/types/profile.types"

const ProfileAncestry = ({ ancestor, updateProfile }: ProfileAncestryPropsType) => {
  return (
    <div className="flex flex-col items-center w-1/3">
      <div className="bg-white shadow-lg p-4 m-2 rounded-lg w-48 text-center">
        <h3 className="text-lg font-semibold"><p>{ancestor.ancestry.ancestry}</p></h3>
        <button
          className="mt-2 px-4 py-1 bg-blue-500 font-semibold text-white rounded hover:bg-blue-600 active:bg-blue-500"
          onClick={() => updateProfile(ancestor.ancestry)}
        >
          ACTUALIZAR
        </button>
      </div>
    </div>
  )
}

export default ProfileAncestry