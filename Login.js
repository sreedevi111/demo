import React, { useRef, useEffect, useState } from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import toast from 'react-native-simple-toast'
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
gap: 10px;

position: absolute;
width: 343px;
height: 56px;
left: 16px;
top: 410px;



background: #333333;
border-radius: 16px;
*/


const App = ({ navigation, route }) => {

      const [state, setState] = useState({ email: 'anubro@gmail.com', password: '123456789', passwordHidden: false, loader: false, emailTestFail: null, passwordTestFail: null  })


      const onChangeEmail  = (text) => {
          setState(prev => ({...prev,  email: text }))
      }

      const onChangePassword  = (text) => {
          setState(prev => ({...prev,  password: text }))
      }

      const validEmail = () => {
        console.log('this line will trigger when we move from email to password field')
        const pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        console.log(pattern.test(state.email))
        setState(prev => ({...prev,  emailTestFail: !pattern.test(state.email) }))
      }

      const validPassword = () => {
        console.log('state.password value is',state.password)
        var pass = String(state.password).trim()
        console.log('pass',pass, pass.length, !pass.length > 6)
        setState(prev => ({...prev,  passwordTestFail: !(pass.length > 6) }))
      }


      const submitForm = () => {

        // email validation starts here //
        const email = String(state.email).trim().toLowerCase()
        const pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        var email_test = pattern.test(email) // true , false
        if (email_test === false){
          setState(prev => ({...prev,  emailTestFail: true }))
          return
        }
        if(email_test){
          setState(prev => ({...prev,  emailTestFail: false }))
        }
        // email validation ends here //



        // password validation starts here //
        const password = String(state.password).trim()
        if(password.length >= 6){
          setState(prev => ({...prev,  passwordTestFail: false }))
        } else {
            setState(prev => ({...prev,  passwordTestFail: true }))
            return;
        }

        //toast.show('everything is good so far')

        auth().signInWithEmailAndPassword(email, password)
        .then(response =>{
            toast.show('You are loggedin successfully')
        }).catch(err => {
            console.log('error to login',err)
            toast.show('error to login')
        })




      }


      return (
          <View style={{ flex: 1, backgroundColor: 'white'}}>


                  <View style={{ paddingHorizontal: 16, paddingTop: 40 }}>

                      <TextInput
                        style={{ color: 'grey', paddingVertical: 12, paddingHorizontal: 16, borderColor: '#d8d8e1', borderWidth: 1, borderRadius: 16  }}
                        onChangeText={text => onChangeEmail(text)}
                        value={state.email}
                        placeholder={'Type your email here'}
                        placeholderTextColor={'grey'}
                      />
                      {state.emailTestFail === true && (
                        <Text style={{ color: 'red', fontSize: 10, paddingLeft: 20 }}>invalid email</Text>
                      )}

                      {/*state.emailTestFail === false && (
                        <Text style={{ color: 'green', fontSize: 10, paddingLeft: 20 }}>valid email</Text>
                      )*/}



                      <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', borderColor: '#d8d8e1', borderWidth: 1, borderRadius: 16 }}>

                          <View style={{ flex: 9 }}>
                             <TextInput
                                style={{ color: 'grey', paddingVertical: 12, paddingHorizontal: 16  }}
                                onChangeText={text => onChangePassword(text)}
                                value={state.password}
                                secureTextEntry={state.passwordHidden}
                                placeholder={'Type your password here'}
                                placeholderTextColor={'grey'}
                              />
                          </View>

                            <TouchableOpacity onPress={()=>setState(prev => ({...prev, passwordHidden: !state.passwordHidden }))} style={{ flex: 1 }}>
                              <Feather name={state.passwordHidden ? 'eye' : 'eye-off'} size={13} color={'black'} />
                            </TouchableOpacity>

                      </View>

                      {state.passwordTestFail === true && (
                        <Text style={{ color: 'red', fontSize: 10, paddingLeft: 20 }}>invalid password</Text>
                      )}


                      {/*state.passwordTestFail === false && (
                        <Text style={{ color: 'green', fontSize: 10, paddingLeft: 20 }}>valid password</Text>
                      )*/}





                        <TouchableOpacity onPress={submitForm} style={{ marginTop: 20, height: 56, backgroundColor: '#333333', borderRadius: 16, padding: 8, justifyContent: 'center', alignItems: 'center'  }} >
                            <Text style={{ fontSize: 18, lineHeight: 20, color: '#FCFCFC'  }}>Login</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={()=>navigation.navigate('register')} style={{ marginTop: 20, height: 56,  padding: 8, justifyContent: 'center', alignItems: 'center'  }} >
                            <Text style={{ fontSize: 15, lineHeight: 20, color: 'blue'  }}>Not having an account ? Register here</Text>
                        </TouchableOpacity>




                  </View>


          </View>
      )


}



export default App;
