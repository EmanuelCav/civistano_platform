import { ReactNode } from "react"
import { View } from "react-native"

import { generalStyles } from "../../styles/general.styles"

const ContainerBackground = ({ children }: { children: ReactNode }) => {
  return (
    <View style={generalStyles.containerBackground}>
      <View style={generalStyles.cardBackground}>
        {children}
      </View>
    </View>
  )
}

export default ContainerBackground