import React, { useEffect } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity, useWindowDimensions, Button, ScrollView } from 'react-native';
import Email from './Email';
import Password from './Password';
import FullName from "./FullName";
import Age from "./Age";
import School from "./School";
import Gender from "./Gender";
import Faculty from "./Faculty";
import ZID from "./ZID";
import { JSHash, CONSTANTS } from "react-native-hash";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'modal-enhanced-react-native-web';
import { useIsFocused } from "@react-navigation/native";
//import {globalDebug} from './consoleBlocking';
//globalDebug(false,true);

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

console.log(window.location.href)
console.log('tetsing')

const classes = StyleSheet.create({

  signUpForm: {
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"space-evenly"
  },

  SignUpButton: { 
    display:"flex", justifyContent:'center',alignSelf:'center',width:'85%', padding:15, borderRadius:10, backgroundColor:'rgb(255, 220, 0)', marginBottom:10,
    marginTop:10
  },
  redirect: {
    color: 'black', padding:0, paddingLeft:5, marginBottom:2.5, fontWeight:'bold', fontSize:18, textAlign: 'center'
  },
  heading: {
    fontWeight:'bold', fontSize:23, color: 'black', textAlign:'center', marginBottom: 15
  },
  buttonText: {
    color:"black", textAlign:"center", fontSize:18, fontWeight:'500'
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


  const windowHeight = useWindowDimensions().height;
  const isMobile = windowHeight <= 750 ? true : false;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setfullName] = React.useState("");
  const [isVisible, setIsVisible] = React.useState({ message: "", visibility: false });
  const [age, setAge] = React.useState("");
  const [faculty, setFaculty] = React.useState("");
  const [school, setSchool] = React.useState("");
  const [zid, setZID] = React.useState("");
  const [gender, setGender] = React.useState("");


  const isFocused = useIsFocused();
  useEffect(() => {

    setEmail('')
    setPassword('')

  },[isFocused])

  getData('token')
  .then(token_value => {

      fetch(`https://mysustainability-api-123.herokuapp.com/auth_test/`, {method: 'GET', headers: {'Authorization': `Bearer ${String(token_value)}`}})
      .then(resp => resp.json())
      .then(response => {
        //console.log(JSON.stringify(response).includes("logged_in"))
        if (JSON.stringify(response).includes("logged_in")){
          navigation.navigate('Profile', { replace: true })
        }
      })
  })

  function validateEmail (email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }
    
  function handleSignUp(e){
    validateEmail === false ?  setIsVisible({ message: "Please specify a valid email", visibility: true }) : ''
    if (email.length <= 4 || password.length < 3 || age.length == 0 || fullName.length <= 3 || faculty.length <= 2 || school.length < 3 || zid.length <= 6 || gender.length <= 3) {
      setIsVisible({ message: "Please check all fields and try again", visibility: true });
      return;
    }
    JSHash(email, CONSTANTS.HashAlgorithms.sha256)
        .then(encryptedEmail => {
          JSHash(password, CONSTANTS.HashAlgorithms.sha256)
          .then(encryptedPassword => {
              fetch(`https://mysustainability-api-123.herokuapp.com/sign_up/?name=${fullName}&email=${encryptedEmail}&password=${encryptedPassword}&school=${school}&faculty=${faculty}&zid=${zid}&age=${age}&gender=${gender}`, {method: 'POST'})
                .then(resp => resp.json())
                .then(response => {
                  //console.log(response)
                  if (email === 'admin') {
                    storeData ('admin', 'true') 
                  }
                  
                  if(response['message'] == "Internal Server Error"){
                    setIsVisible({ message: "An account with this email already exists", visibility: true })
                  }
                  
                  else if (response['message'] == "email, name and password all require valid values"){
                    setIsVisible({ message: "email, name and password all require valid values", visibility: true })
                  }else{
                    //console.log(response['token'])
                    storeData ('token', response['token']);
                    storeData ('user_id', response['user_id']);
                    storeData('reports', '0');
                    navigation.navigate('Profile', { replace: true, newUser: true })
                  }
                })
            })
        })
        .catch(e => console.log(e));
  }

    const height_variable = isMobile ? '120vh': '100vh';

    return(
      <ScrollView contentContainerStyle={{display:"flex", justifyContent:'flex-start', alignItems:'center', width:'100%', height: height_variable, marginTop:'5%', flexDirection:'column'}}>
        {/*//old style={[isMobile ? {marginTop:'10%'} : {}, classes.signUpForm]}>*/}
          <Modal
            onRequestClose={() => setIsVisible({ message: "", visibility: false })}
            visible={isVisible['visibility']}
            style={{height:'100vh', backgroundColor:'#f2f2f2'}}
          >
            <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
              <Text style={{fontSize:18, marginBottom:'2%'}}> {isVisible['message']} </Text>
              <Button onPress={() => setIsVisible({ message: "", visibility: false })} title={'Dismiss'} color="black"/>
            </View>
          </Modal>
          <Text style = {classes.heading}> Create a new account </Text>
          <View>
            <FullName  onChangeText={(fullName) => setfullName(fullName)} style = {{ width: 310, padding:13, marginBottom:10, backgroundColor:"white", borderRadius:10 }}/>
            <Email  onChangeText={(email) => setEmail(email)}  style = {{ width: 310, padding:13, marginBottom:10, backgroundColor:"white", borderRadius:10 }}/>
            <Password  onChangeText={(password) => setPassword(password)} style = {{ width: 310, padding:13, marginBottom:10, backgroundColor:"white", borderRadius:10 }}/>
            <Gender  onChangeText={(gender) => setGender(gender)} style = {{ width: 310, padding:13, marginBottom:10, backgroundColor:"white", borderRadius:10 }}/>
            <Age  onChangeText={(age) => setAge(age)}  style = {{ width: 310, padding:13, marginBottom:10, backgroundColor:"white", borderRadius:10 }}/>
            <Faculty  onChangeText={(faculty) => setFaculty(faculty)}  style = {{ width: 310, padding:13, marginBottom:10, backgroundColor:"white", borderRadius:10 }}/>
            <School  onChangeText={(school) => setSchool(school)}   style = {{ width: 310, padding:13, marginBottom:10, backgroundColor:"white", borderRadius:10 }}/>
            <ZID onChangeText={(zid) => setZID(zid)}  style = {{ width: 310, padding:13, marginBottom:10, backgroundColor:"white", borderRadius:10 }}/>
        
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
          <View style={{display: isVisible['visibility'] === true ? 'none' : '' }}>
            <Text style = {classes.question}> Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login', { replace: true })}
              style={{margin:0, padding:0}}
            >
              <Text style={classes.redirect}>Log-in</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    );
  };
