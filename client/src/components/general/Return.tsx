import ContainerFixed from "./ContainerFixed"

const Return = ({ text }: { text: string }) => {
  return (
    <ContainerFixed>
        <p>{text}</p>
    </ContainerFixed>
  )
}

export default Return