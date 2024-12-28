import { View } from "react-native"

import TabHome from "./components/infoHome/TabHome"

import { IFeature } from "../../interface/General"

import { homeStyles } from "../../styles/home.styles"

const FEATURES: IFeature[] = [
  {
    title: 'Completa el cuestionario inicial',
    description: 'Responde un cuestionario corto y conciso para analizar si puedes obtener la ciudadanía italiana.',
    icon: 'edit',
  },
  {
    title: 'Observa tu resultado',
    description: 'Revisa tu estado y, a continuación, se generará una lista detallada con los pasos a seguir.',
    icon: 'visibility',
  },
  {
    title: 'Completa tu perfil',
    description: 'Proporciona información adicional para personalizar los requisitos y recibir una guía completa.',
    icon: 'person',
  },
]

const InfoHome = () => {
  return (
    <View style={homeStyles.containerInfoHome}>
      {
        FEATURES.map((feature, index) => {
          return <TabHome feature={feature} key={index} />
        })
      }
    </View>
  )
}

export default InfoHome