import { ChecklistPropsType } from "@/types/panel.types"

import { checkAncestryUser } from "@/server/actions/user.action"

const Checklist = ({ item, dispatch, aid, token }: ChecklistPropsType) => {

    const handleCheck = () => {
        dispatch(checkAncestryUser({
            aid,
            cid: item.checklist._id,
            token
        }) as any)
    }

    return (
        <div className="flex items-start border-b border-gray-200 border-solid py-2">
            <div className={`w-10 h-10 ${item.isChecked ? "bg-emerald-400" : "bg-gray-400"} rounded-full flex justify-center items-center text-white font-bold 
            cursor-pointer hover:bg-gray-200 select-none`} onClick={handleCheck}>
                {item.isChecked ? "✓" : "-"}
            </div>
            <div className="ml-4 flex-1 p-2 rounded-md">
                <h2 className="text-xl font-semibold text-sky-700">{item.checklist.title}</h2>
                <p className="text-gray-800 mt-2">{item.checklist.description}</p>
                <p className={`mt-6 ${item.isChecked ? "text-emerald-600" : "text-gray-600"}`}>{item.isChecked ? "Hecho" : "Pendiente"}</p>
            </div>
        </div>
    )
}

export default Checklist