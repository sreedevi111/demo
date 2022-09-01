import {Text, View, Button } from 'react-native'
import React from 'react'
import styles from './styles'

const LandingScreen = ({navigation}) => {
  return (
    <View>
      <Button
       title="Go to Counter Screen"
       onPress={() => navigation.navigate('Counter')}
      />
    </View>
  )
}

export default LandingScreen

