import React,  { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Button, TextInput, FlatList, Alert } from 'react-native'

import database from '@react-native-firebase/database';

import AntDesign from 'react-native-vector-icons/AntDesign'
import toast from 'react-native-simple-toast'
import auth from '@react-native-firebase/auth';
import _ from 'lodash'


import { useSelector, useDispatch } from 'react-redux'


const App = ({navigation }) => {


  const dispatch = useDispatch()
  const [usersList, set_usersList] = useState([])


  useEffect(()=> {
    var user = auth().currentUser
    console.log('user.uid',user.uid)
    database().ref('/users/').once('value')
    .then(snapshot => {
      console.log('snapshot.val()',snapshot.val())
      var dataArray = []
      let data =   snapshot.val()
      _.map(data, (each, index) => {
          console.log('each',each,'index',index)
          if(index !== user.uid){
            dataArray.push({id: index, ...each})
          }
      })
      console.log('dataArray',dataArray)
      set_usersList(dataArray)
  }).catch(ER => {
      console.log('er',ER)
  })
  },[])

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('chat', { chatUser: item })} style={{ borderBottomWidth: 0.5, borderBottomColor: 'grey', height: 60, justifyContent: 'center' }}>
          <Text style={{ paddingLeft: 20, color: 'black' }}>{item.name}</Text>
      </TouchableOpacity>
    )
  }


    return (
        <View style={{ flex: 1, backgroundColor: 'white'}}>

          <View style={{ flex: 1, maxHeight: 50, alignItems: 'flex-end', justifyContent: 'center', elevation: 2, backgroundColor: '#fafafa' }}>
            <TouchableOpacity style={{ marginTop: 20, width: 40, height: 40  }} onPress={()=>auth().signOut()}>
            <AntDesign name={'logout'} size={20} color={'tomato'}/>
            </TouchableOpacity>
          </View>

            <FlatList
             data={usersList}
             renderItem={renderItem}
             keyExtractor={item => item.id}
           />


       </View>
    )


}

export default App;
