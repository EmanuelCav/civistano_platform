import { ProfileIncompletePropsType } from "@/types/profile.types"

const ProfileIncomplete = ({ ancestors, ancestryNumber, completeAncestry }: ProfileIncompletePropsType) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white shadow-lg p-4 m-2 rounded-lg w-48 text-center">
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
          className="mt-2 px-4 py-1 bg-green-500 text-white font-semibold rounded hover:bg-green-600 active:bg-green-500"
          onClick={() => completeAncestry(
            ancestors.filter(ancestry => ancestry.hierarchy === ancestryNumber)[0],
            ancestors.filter(ancestry => ancestry.hierarchy === ancestryNumber)[1]
          )}
        >
          COMPLETAR
        </button>
      </div>
    </div>
  )
}

export default ProfileIncomplete