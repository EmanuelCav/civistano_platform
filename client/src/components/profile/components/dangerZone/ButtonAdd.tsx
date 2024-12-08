import { ButtonAddPropsType } from "@/types/profile.types"

const ButtonAdd = ({ text, textButton, completeAncestry, Icon, ancestors, ancestryNumber }: ButtonAddPropsType) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between w-full px-4 py-2 bg-gray-50 rounded shadow-md border border-gray-200">
      <p className="text-gray-900 text-lg font-semibold mb-2 sm:mb-0 sm:mr-4">
        {text}
      </p>
      <button
        className="flex items-center justify-evenly bg-green-500 border p-2 text-white hover:bg-green-600 active:bg-green-500 rounded font-semibold w-44 transition-all duration-200"
        onClick={() => completeAncestry(
          ancestors.filter(ancestry => ancestry.hierarchy === ancestryNumber)[0],
          ancestors.filter(ancestry => ancestry.hierarchy === ancestryNumber)[1]
        )}>
        <Icon size={20} color={'#fff'} />
        <p className="text-md">{textButton}</p>
      </button>
    </div>
  )
}

export default ButtonAdd