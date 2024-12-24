import { View } from "react-native"

import TabHome from "./components/infoHome/TabHome"

import { IFeature } from "../../interface/General"

import { homeStyles } from "../../styles/home.styles"

const FEATURES: IFeature[] = [
  {
    title: 'Profile Management',
    description: 'Easily update and manage your personal information, settings, and preferences',
    icon: 'account-circle-outline',
  },
  {
    title: 'Secure Messaging',
    description: 'Chat securely with friends and family in real-time.',
    icon: 'message-processing',
  },
  {
    title: 'Activity Tracking',
    description: 'Monitor your daily activities and track your progress over time.',
    icon: 'chart-timeline-variant',
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