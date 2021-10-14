import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button } from "react-native";
import Email from './Email';
import Password from './Password';
import { JSHash, CONSTANTS } from "react-native-hash";
import AsyncStorage from '@react-native-async-storage/async-storage';


const classes = StyleSheet.create({

  loginForm: {
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"space-evenly"
  },
  heading: {
    fontWeight:'bold', fontSize:23, color: '#7D83FF', textAlign:'center', marginBottom: 15
  },
  forgotPassword: {
    fontWeight:'bold', marginTop:20,textAlign:'center', fontSize:18
  },
  LoginButton: {
    display:"flex", justifyContent:'center',alignSelf:'center',width:'40%', padding:20, borderRadius:10, backgroundColor:"#7D83FF"
  },
  buttonText: {
    color:"white", textAlign:"center", fontSize:18, fontWeight:'bold'
  },
  redirect:{
    marginTop:5,color:"#7D83FF", textAlign:"center", fontSize:18, fontWeight:'bold'
  },
  question: {
    color:'black',marginTop:24,textAlign:'center', fontSize:18  
  }

});

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
  }
}


const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      return value
    }
  } catch(e) {
    // error reading value
  }
}


export default function Login ({ navigation }){

  getData('token')
  .then(value => {
      if (value !== "null"){
          navigation.navigate('Home', { replace: true })
      }
  })

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);

  function handleLogin(e){
    e.preventDefault();
    JSHash(email, CONSTANTS.HashAlgorithms.sha256)
      .then(encryptedEmail => {
        JSHash(password, CONSTANTS.HashAlgorithms.sha256)
        .then(encryptedPassword => {
            fetch(`https://mysustainability-api-123.herokuapp.com/log_in/?email=${encryptedEmail}&password=${encryptedPassword}`, {method: 'POST'})
              .then(resp => resp.json())
              .then(response => {
                //console.log(response)
                if(response['message'] == "Internal Server Error"){
                  setIsVisible(true)
                }else{
                  storeData ('token',response['token']);
                  storeData ('user_id',response['user_id']);
                  navigation.navigate('Home', { replace: true })
                }
              })
          })
      })
      .catch(e => console.log(e));
  }

  function handleSignUp(e){
    e.preventDefault();
    navigation.navigate('Signup', { replace: true })
  }

  return(
    <View style={{display:"flex", justifyContent:'center', alignItems:'center', width:'100%', height:'100%'}}>
      <Text style = {classes.heading}> Log-in </Text>
      <Modal
        onRequestClose={() => setIsVisible(false)}
        visible={isVisible}
      >
        <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize:23, marginBottom:'2%'}}> Incorrect username or password </Text>
          <Button onPress={() => setIsVisible(false)} title={'Dismiss'} color="#7D83FF"/>
        </View>
      </Modal>
      <View className={classes.loginForm}>
        <Email onChangeText={(email) => setEmail(email)}/>
        <Password onChangeText={(password) => setPassword(password)}/>

        <Text style={classes.forgotPassword}> Forgot password? </Text>
        <View style={{marginTop:20}}>
          <TouchableOpacity
            type="submit"
            onPress={(e) => handleLogin(e)}
            style={classes.LoginButton}
          >
            <Text style={classes.buttonText}> Log-in </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={classes.question}> Don't have an account? </Text>
      <TouchableOpacity
            type="submit"
            onPress={(e) => handleSignUp(e)}
          >
            <Text style={classes.redirect}> Create a new account</Text>
      </TouchableOpacity>
    </View>
  );
};