import ContainerFixed from "./ContainerFixed"

import { ReturnPropsType } from "@/types/home.types"

const Return = ({ text, func, title }: ReturnPropsType) => {
  return (
    <ContainerFixed>
      <div className="flex h-full items-center justify-between flex-col w-full">
        <div className="items-center justify-start flex-col flex flex-1 w-full">
          <h3 className="text-lg text-sky-700 font-semibold mb-2">{title}</h3>
          <p className="text-gray-700">{text}</p>
        </div>
        <button onClick={func}
          className="text-white w-full bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-lg px-4 py-2 mt-4">
          CONTINUAR
        </button>
      </div>
    </ContainerFixed>
  )
}

export default Return