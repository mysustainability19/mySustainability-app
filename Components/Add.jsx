import React, {useEffect} from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView, Dimensions, Button} from 'react-native';
import {ScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box'; 
import { Avatar } from 'react-native-paper';
import NavBar from './NavBar';
import ChallengeField from './ChallengeField';
import Profile from './Profile';
import { PhoneView, BodyContainer, StyledCard} from '../styles/GeneralStyles';
import { 
  TileHeading, RecommendationContainer, RecCard, RecCardText, MeetingCard,
  FriendTile
} from '../styles/HomeStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useParams } from "react-router";
import Modal from 'modal-enhanced-react-native-web';
import {Picker} from '@react-native-picker/picker';

  
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

const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
    }
}


export default function Add ({route, navigation}){


    getData('token')
    .then(token_value => {

        fetch(`https://mysustainability-api-123.herokuapp.com/auth_test/`, {method: 'GET', headers: {'Authorization': `Bearer ${String(token_value)}`}})
        .then(resp => resp.json())
        .then(response => {
          if (!JSON.stringify(response).includes("logged_in")){
            navigation.navigate('Login', { replace: true })
          }
        })
    })

    const isMobile = Dimensions.get("window").height <= 700 ? true : false;
    const [title, setTitle] = React.useState("");
    const [selectedValue, setSelectedValue] = React.useState("10");
    const [description, setDescription] = React.useState("");
    const [selected1stSDG, setSelected1stSDG] = React.useState("2");
    const [selected2ndSDG, setSelected2ndSDG] = React.useState("10");
    const [sdgText, setSDGtext] = React.useState("");
    const [reportingQuestion, set_reportingQuestion] = React.useState("");
    const [isVisible, setIsVisible] = React.useState(false);

    function addChallenge(){
        fetch(`https://mysustainability-api-123.herokuapp.com/updateChallenges/?challengeTitle=${title}&challengeDescription=${description}&pointsWorth=${selectedValue}&primarySDG=${String(selected1stSDG)}&secondarySDG=${String(selected2ndSDG)}&SDGtext=${sdgText}&reportingQuestion=${reportingQuestion}`, {method: 'POST'})
        .then(resp => resp.json())
        .then(response => {
          //console.log(response)
          if(response === 200){
            setIsVisible(true);
          }
        })
    }

    useEffect(() => {

    }, []);

  return (
    <PhoneView>
        <BodyContainer>
                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", flex:1}}>
                    <Text style={[{fontSize:20, color:'#7d83ff', fontWeight:'bold'}]}> mySustainability </Text>
                    <TouchableOpacity
                        //style={{paddingTop:'3%'}}
                        accessible={true}
                        accessibilityLabel="button to personal profile"
                        onPress={() =>  navigation.navigate('Profile', { replace: true })}>
                        <Image
                            style={{height:65, width:65}}
                            source={require('../icons/myprofile.png')}
                        />  
                    </TouchableOpacity>
                </View>
                    <View style={[styles.flexContainer, {flex:4, margin:'auto',  marginTop:'0'}]}>
                        <View style={styles.meetingsColumn}>

                            <Modal
                                onRequestClose={() => setIsVisible(false)}
                                visible={isVisible}
                                style={{backgroundColor:'#f2f2f2',  maxWidth: '100%', margin: 0, top: 0, bottom: 0, left: 0, right: 0, display:'flex'}}
                            >
                                <View style={{alignItems: 'center', flex: 1, width:'60%', justifyContent: 'center', margin:'auto', textAlign:'center'}}>
                                <Text style={{fontSize:18}}> Challenge has been successfully added! </Text>
                                <p/>
                                <p/>
                                <Button onPress={() => setIsVisible(false)} title={'Dismiss'} color="#7D83FF"/>
                                </View>
                            </Modal>



                            <ScrollView contentContainerStyle = {styles.loginForm}>
                                <Text style={{fontSize:23, marginBottom:'30px', fontWeight:'bold'}}>Add a new challenge to mySustainability </Text>
                                <Text> Challenge title 
                                    
                                    {"\n\n"}
                                    <ChallengeField onChangeText={(title) => setTitle(title)}/>
                                </Text>
                                <p/>
                                <Text> Challenge description
                                    
                                    {"\n\n"}
                                    <ChallengeField onChangeText={(description) => setDescription(description)}/>
                                </Text>
                                <p/>
                                <Text> Points challenge is worth: 
                                    {"\n\n"}
                                    <Picker
                                        selectedValue={selected1stSDG}
                                        style={{width:'50px', height:'20px'}}
                                        onValueChange={(value) =>
                                            setSelectedValue(value)
                                        }>
                                        <Picker.Item label="10" value="10" />
                                        <Picker.Item label="20" value="20" />
                                        <Picker.Item label="30" value="30" />
                                    </Picker>
                                </Text>
                                <p/>
                                <Text> Primary SDG (that the challenge is related to): 
                                    {"\n\n"}
                                    <Picker
                                        selectedValue={selected1stSDG}
                                        style={[{width:'50px', height:'20px'}, isMobile ? {marginTop:'10px'} : {}]}
                                        onValueChange={(value) =>
                                            setSelected1stSDG(value)
                                        }>
                                        <Picker.Item label="1" value="1" />
                                        <Picker.Item label="2" value="2" />
                                        <Picker.Item label="3" value="3" />
                                        <Picker.Item label="4" value="4" />
                                        <Picker.Item label="5" value="5" />
                                        <Picker.Item label="6" value="6" />
                                        <Picker.Item label="7" value="7" />
                                        <Picker.Item label="8" value="8" />
                                        <Picker.Item label="9" value="9" />
                                        <Picker.Item label="10" value="10" />
                                        <Picker.Item label="11" value="11" />
                                        <Picker.Item label="12" value="12" />
                                        <Picker.Item label="13" value="13" />
                                        <Picker.Item label="14" value="14" />
                                        <Picker.Item label="15" value="15" />
                                        <Picker.Item label="16" value="16" />
                                        <Picker.Item label="17" value="17" />
                                    </Picker>
                                </Text>
                                <p/>
                                <Text> Secondary SDG (that the challenge is related to): 
                                    {"\n\n"}
                                    <Picker
                                        selectedValue={selected2ndSDG}
                                        style={[{width:'50px', height:'20px'}, isMobile ? {marginTop:'10px'} : {}]}
                                        onValueChange={(value) =>
                                            setSelected2ndSDG(value)
                                        }>
                                        <Picker.Item label="1" value="1" />
                                        <Picker.Item label="2" value="2" />
                                        <Picker.Item label="3" value="3" />
                                        <Picker.Item label="4" value="4" />
                                        <Picker.Item label="5" value="5" />
                                        <Picker.Item label="6" value="6" />
                                        <Picker.Item label="7" value="7" />
                                        <Picker.Item label="8" value="8" />
                                        <Picker.Item label="9" value="9" />
                                        <Picker.Item label="10" value="10" />
                                        <Picker.Item label="11" value="11" />
                                        <Picker.Item label="12" value="12" />
                                        <Picker.Item label="13" value="13" />
                                        <Picker.Item label="14" value="14" />
                                        <Picker.Item label="15" value="15" />
                                        <Picker.Item label="16" value="16" />
                                        <Picker.Item label="17" value="17" />
                                    </Picker>
                                </Text>
                                <p/>
                                <Text> Accompanying SDG-related text
                                    {"\n\n"}
                                    <ChallengeField onChangeText={(sdgText) => setSDGtext(sdgText)}/>
                                </Text>
                                <p/>
                                <Text> Reporting question
                                    {"\n\n"}
                                    <ChallengeField onChangeText={(reportingQuestion) => set_reportingQuestion(reportingQuestion)}/>
                                </Text>
                                <p/>
                                <TouchableOpacity
                                    type="submit"
                                    onPress={() => addChallenge()}
                                    style={[styles.submit, {alignSelf: 'flex-start'}]}
                                >
                                    <Text style={styles.buttonText}> Submit </Text>
                                </TouchableOpacity>

                            </ScrollView>
                        </View>
                    </View>
        </BodyContainer>
        <NavBar navigation={navigation} selectedIcon="Add" admin={true}/>
    </PhoneView>
  );
};


const styles = StyleSheet.create({

    loginForm: {
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-start",
        justifyContent:"flex-start",
        width:'90vw',    //set this to center div
      //  padding:'5%',
        height:'150vh',
        maxWidth:'800px'
    },

    flexContainer: {
        display:"flex", flexDirection:"column", justifyContent:"center", alignItems:'center', height:"100vh", width:"100vw"
    },
    individualTile: {
        flex:0, width:'100%', borderRadius:10, padding:10, marginBottom:'5%'
    },
    meetingsColumn: {
        flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:'0', marginBottom:'5%', flex:1
    },
    avatar:{
        margin:5
    },
    navBar: {
        position: 'absolute', left: 0, right: 0, bottom: 0
    },
    viewAllButton: {
        display:"flex", justifyContent:'center',alignSelf:'center',width:'40%', padding:10, borderRadius:10, backgroundColor:"#3E3E3E"
    },
    buttonText: {
        color:"white", textAlign:"center", fontSize:15, fontWeight:'bold'
    },
    submit: {
        display:"flex", justifyContent:'center',alignSelf:'center',width:'40%', maxWidth:'150px', padding:20, borderRadius:10, backgroundColor:"#7D83FF", marginLeft:'30%'
    },

})

//all updated