import ContainerFixed from "./ContainerFixed"

import { ReturnPropsType } from "@/types/home.types"

const Return = ({ text, func }: ReturnPropsType) => {
  return (
    <ContainerFixed>
      <p>{text}</p>
      <button onClick={func}
      className="text-white w-full bg-sky-700 hover:bg-sky-800 active:bg-sky-700 font-medium rounded-lg text-lg px-4 py-2 mt-4">
        CONTINUAR
      </button>
    </ContainerFixed>
  )
}

export default Return