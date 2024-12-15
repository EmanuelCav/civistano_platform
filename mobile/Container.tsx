import React, { ReactNode } from 'react'
import { StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native'

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaView style={styles.container}>
        {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: '#8de1e7'
    }
})

export default Container