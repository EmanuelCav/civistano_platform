import React, { ReactNode } from 'react'
import { StyleSheet, StatusBar, Platform, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <View style={styles.container}>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: '#f5f5f5'
    }
})

export default Container