import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import TabNavigator from './app/navigation/TabNavigator'

const CUSTON_THEME = {...DefaultTheme, colors: {...DefaultTheme.colors, background: "#fff"}}

const App = () => {
  return (
    <NavigationContainer theme={CUSTON_THEME}>
      <TabNavigator/>
    </NavigationContainer>
    
  )
}

export default App

const styles = StyleSheet.create({})
