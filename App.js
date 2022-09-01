import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LandingScreen from './src/Screens/LandingScreen.js'
import Button from './src/Components/Button.js'

const App = () => {
  return (
    <View style={{flex:1, backgroundColor:'white'}}>
     {/* <LandingScreen/> */}
     <Button />
    </View>
  )
}

export default App

const styles = StyleSheet.create({

})