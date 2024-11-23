import { ProfileIncompletePropsType } from "@/types/profile.types"

const ProfileIncomplete = ({ ancestors, ancestryNumber, completeAncestry }: ProfileIncompletePropsType) => {

  return (
    <div className="my-4 flex flex-col sm:flex-row items-center sm:items-center justify-between w-full px-4 py-2 bg-gray-50 rounded shadow-md border border-gray-200">
      <p className="text-lg font-semibold">
        {
          ancestors.length > 0 &&
          <>
            {
              ancestors.filter(ancestry => ancestry.hierarchy === ancestryNumber)[0].ancestry
            } /
            {
              ancestors.filter(ancestry => ancestry.hierarchy === ancestryNumber)[1].ancestry
            }
          </>
        }
      </p>
      <button
        className="mt-2 px-4 py-1 bg-green-500 text-white font-semibold rounded hover:bg-green-600 active:bg-green-500 transition-all duration-200"
        onClick={() => completeAncestry(
          ancestors.filter(ancestry => ancestry.hierarchy === ancestryNumber)[0],
          ancestors.filter(ancestry => ancestry.hierarchy === ancestryNumber)[1]
        )}
      >
        COMPLETAR
      </button>
    </div>
  )
}

export default ProfileIncomplete