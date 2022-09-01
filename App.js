import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './src/Screens/LandingScreen.js'
import CounterScreen from './src/Screens/CounterScreen.js/index.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
<Stack.Screen name='Landing' component={LandingScreen}/>
<Stack.Screen name ='Counter' component ={CounterScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({

})