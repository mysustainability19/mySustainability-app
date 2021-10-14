import React from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity, useWindowDimensions, Modal, Button } from 'react-native';
import Email from './Email';
import Password from './Password';
import FullName from "./FullName";
import { JSHash, CONSTANTS } from "react-native-hash";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async (key) => {
  try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
          return value
      }else{
          return null
      }
  } catch(e) {
      // error reading value
  }
}


const classes = StyleSheet.create({

  signUpForm: {
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"space-evenly"
  },

  SignUpButton: { 
    display:"flex", justifyContent:'center',alignSelf:'center',width:'95%', padding:20, borderRadius:10, backgroundColor:"#7D83FF", marginBottom:10,
    marginTop:10
  },
  redirect: {
    color: '#7d83ff', padding:0, paddingLeft:5, marginBottom:2.5, fontWeight:'bold', fontSize:18
  },
  heading: {
    fontWeight:'bold', fontSize:23, color: '#7D83FF', textAlign:'center', marginBottom: 15
  },
  buttonText: {
    color:"white", textAlign:"center", fontSize:18, fontWeight:'bold'
  },
  question: {
    color:'black',textAlign:'center', fontSize:18, marginBottom: 10, marginTop: 10
  }
});


const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
  }
}


export default function Signup ({ navigation }){

  getData('token')
  .then(value => {
      if (value !== "null"){
          navigation.navigate('Home', { replace: true })
      }
  })


  const windowHeight = useWindowDimensions().height;
  const isMobile = windowHeight <= 850 ? true : false;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setfullName] = React.useState("");
  const [isVisible, setIsVisible] = React.useState({ message: "", visibility: false });

  
function handleSignUp(e){
  e.preventDefault();
  JSHash(email, CONSTANTS.HashAlgorithms.sha256)
      .then(encryptedEmail => {
        JSHash(password, CONSTANTS.HashAlgorithms.sha256)
        .then(encryptedPassword => {
            fetch(`https://mysustainability-api-123.herokuapp.com/sign_up/?name=${fullName}&email=${encryptedEmail}&password=${encryptedPassword}`, {method: 'POST'})
              .then(resp => resp.json())
              .then(response => {
                console.log(response)
                if(response['message'] == "Internal Server Error"){
                  setIsVisible({ message: "An account with this email already exists", visibility: true })
                }
                else{
                  storeData ('token', response['token']);
                  storeData ('user_id', response['user_id']);
                  navigation.navigate('Home', { replace: true, newUser: true })
                }
              })
          })
      })
      .catch(e => console.log(e));
}

  return(
    <View style={[isMobile ? {marginTop:'10%'} : {}, classes.signUpForm]}>
      <Modal
        onRequestClose={() => setIsVisible({ message: "", visibility: false })}
        visible={isVisible['visibility']}
      >
        <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize:18, marginBottom:'2%'}}> {isVisible['message']} </Text>
          <Button onPress={() => setIsVisible({ message: "", visibility: false })} title={'Dismiss'} color="#7D83FF"/>
        </View>
      </Modal>
      <Text style = {classes.heading}> Create a new account </Text>
      <View>
        <FullName  onChangeText={(fullName) => setfullName(fullName)}/>
        <Email  onChangeText={(email) => setEmail(email)}/>
        <Password  onChangeText={(password) => setPassword(password)}/>
        <View>
          <TouchableOpacity
              type="submit"
              onPress={(e) => handleSignUp(e)}
              style={classes.SignUpButton}
            >
              <Text style={classes.buttonText}> Create a new account </Text>
            </TouchableOpacity>
        </View>
      </View>
      <Text style = {classes.question}> Already have an account? </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login', { replace: true })}
        style={{margin:0, padding:0}}
      >
        <Text style={classes.redirect}> Log-in</Text>
      </TouchableOpacity>
    </View>
  );
};
