import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const CounterScreen = () => {
  return (
    <View>
      <Text style={styles.text}>CounterScreen</Text>  
    </View>
  )
}

export default CounterScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  text:{
color:'black'
  }
})