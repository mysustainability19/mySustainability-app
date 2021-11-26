import React, {useEffect} from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView, useWindowDimensions, Button} from 'react-native';
import {ScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box'; 
import { Avatar } from 'react-native-paper';
import NavBar from './NavBar';
import Profile from './Profile';
import { PhoneView, BodyContainer, StyledCard} from '../styles/GeneralStyles';
import { 
  TileHeading, RecommendationContainer, RecCard, RecCardText, MeetingCard,
  FriendTile
} from '../styles/HomeStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useParams } from "react-router";
import Modal from 'modal-enhanced-react-native-web';
import { useIsFocused } from "@react-navigation/native";

  
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

const styles = StyleSheet.create({
    flexContainer: {
        display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:'center', height:"100vh", width:"100vw"
    },
    individualTile: {
        flex:0, width:'100%', borderRadius:10, padding:10, marginBottom:'5%'
    },
    meetingsColumn: {
        flexDirection:"column", justifyContent:"flex-start", alignItems:"center", marginTop:'0', marginBottom:'5%', flex:1
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

})

export default function Home ({route, navigation}){
    const [is_focused, set_is_focused] = React.useState(false)
    const isFocused = useIsFocused();

    getData('token')
    .then(token_value => {
        fetch(`https://mysustainability-api-123.herokuapp.com/auth_test/`, {method: 'GET', headers: {'Authorization': `Bearer ${String(token_value)}`}})
        .then(resp => resp.json())
        .then(response => {
          //console.log(response)
          if (!JSON.stringify(response).includes("logged_in")){
            navigation.navigate('Login', { replace: true })
          }
        })
    })

    getData('admin')
    .then(value => {
        if (value === 'true'){
            setAdmin(true)
        }
    })
    //maybe have better admin code here instead of just checking value === 'true'.

    const {newUser} = route.params;

    function openChallengePage(challengeID){
        //console.log(challengeID)
        navigation.navigate('challengePage', { replace: true, challengeID: challengeID })
    }
    

    const windowHeight = useWindowDimensions().height;
    const isMobile = windowHeight <= 700 ? true : false;

    const [more, setMore] = React.useState(false);
    const [challengeList, setChallengeList] = React.useState([])
    const [isVisible, setIsVisible] = React.useState(newUser === true ? true : false);
    const [admin, setAdmin] = React.useState(false);
    //const [isVisible, setIsVisible] = React.useState(true);
    const [delete_challenge_modal, set_delete_challenge_modal] = React.useState([false, 'challenge_id_', 'challengeTitle']);
    const [refresh_challenges, set_refresh_challenges] = React.useState(1);

    const toggleMore = () => {
        if (more === true){
            setMore(false);
        } else {
            setMore(true);
        }
    }

    function openDeleteChallengeModal(challenge_id_, challengeTitle){
        set_delete_challenge_modal([true, challenge_id_, challengeTitle]);
    }

    function deleteChallenge(){
        fetch(`https://mysustainability-api-123.herokuapp.com/deleteChallenge/?challengeID=${delete_challenge_modal[1]}`, {method:'DELETE'})
            .then(resp => resp.json())
            .then(resp_json => {
                //console.log(delete_challenge_modal[1])
                //console.log(resp_json)
                if(resp_json === 200){
                    set_delete_challenge_modal([false, 'challenge_id_', 'challengeTitle'])
                    set_refresh_challenges(refresh_challenges+1);
                }
            })
    }

    useEffect(() => {

        fetch(`https://mysustainability-api-123.herokuapp.com/getChallenges`, {method: 'GET'})
        .then(resp => resp.json())
        .then(response => {
            setChallengeList(response['challenges'])
        })
    }, []);

    useEffect(() => {

        fetch(`https://mysustainability-api-123.herokuapp.com/getChallenges`, {method: 'GET'})
        .then(resp => resp.json())
        .then(response => {
            setChallengeList(response['challenges'])
        })
    }, [refresh_challenges, isFocused]);

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
                            source={require('../public/icons/myprofile.png')}
                        />  
                    </TouchableOpacity>
                </View>
                    <View style={[styles.flexContainer, {flex:4, margin:'auto',  marginTop:'0', }]}>
                        <View style={styles.meetingsColumn}>

                            <Modal
                                onRequestClose={() => setIsVisible(false)}
                                visible={isVisible}
                                style={{backgroundColor:'#f2f2f2',  maxWidth: '100%', margin: 0, top: 0, bottom: 0, left: 0, right: 0, display:'flex'}}
                            >
                                <View style={{alignItems: 'center', flex: 1, width:'60%', justifyContent: 'center', margin:'auto', textAlign:'center'}}>
                                <Text style={{fontSize:18}}> Welcome to mySustainability! {'\n'} {'\n'} You have earnt your first badge: The Beginner badge! {'\n'} {'\n'} Earn more badges and Green XP by completing challenges, goals or the dynamic quiz. In no time, you will find yourself climbing the leaderboard ranks. </Text>
                                <Image source={require("../icons/badges/beginner.PNG")} style={{width:'200px', height:'200px', marginTop:'5%', marginBottom:'5%'}}/>
                                <Button onPress={() => setIsVisible(false)} title={'Dismiss'} color="#7D83FF"/>
                                </View>
                            </Modal>

                            
                            <Modal
                                onRequestClose={() => set_delete_challenge_modal([false, '', ''])}
                                visible={delete_challenge_modal[0]}
                                style={{backgroundColor:'#f2f2f2',  maxWidth: '100%', margin: 0, top: 0, bottom: 0, left: 0, right: 0, display:'flex'}}
                            >
                                <View style={{alignItems: 'center', flex: 1, width:'60%', justifyContent: 'center', margin:'auto', textAlign:'center'}}>
                                    <Text style={{fontSize:18}}> Are you sure you want to delete the following challenge: {'\n'} {'\n'}  {delete_challenge_modal[2]} {'\n'}  {'\n'}  </Text>
                                    <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>

                                        <TouchableOpacity onPress={() => deleteChallenge()} style={{backgroundColor:'green', padding:'2%', borderRadius:'20px', width:'40%', maxWidth:'100px'}}>
                                            <Text style={{color:'white', textAlign:'center', fontSize:25,fontWeight:'bold'}}>Yes</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => set_delete_challenge_modal([false, '', ''])} style={{backgroundColor:'red', padding:'2%', borderRadius:'20px',width:'40%', maxWidth:'100px'}}>
                                            <Text style={{color:'white', textAlign:'center', fontSize:25,fontWeight:'bold'}}>No</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>

                            <ScrollView contentContainerStyle = {{display:"flex", flexDirection:'column', height:'120vh', marginLeft: isMobile ? '5%' : '0%'}}>

                                {
                                    challengeList === [] ? (
                                        <Text style = {{width:'auto', fontSize: 18, textAlign:'auto'}}> None yet!</Text>
                                    ): (
                                        challengeList.map((challenge)=> {
                                            return (
                                                <div style={{marginBottom:'3vh'}}>
                                                    <StyledCard key={challenge['challengeID']} style={{marginTop:'0'}}>
                                                        <TouchableOpacity onPress={() => openChallengePage(challenge['challengeID'])} >
                                                            <Text style={{textAlign:'center', fontSize:25,fontWeight:'bold'}}>{challenge['title']}</Text>
                                                        </TouchableOpacity>
                                                        {admin === true ?
                                                        
                                                            <TouchableOpacity onPress={() => openDeleteChallengeModal(challenge['challengeID'], challenge['title'])} style={{position:'absolute', top:'-15px', right:'-15px'}}>
                                                                <Image style={{height:'20px', width:'20px'}} source={{uri: 'https://i.imgur.com/EL7Awvs.png'}}/>
                                                            </TouchableOpacity>
                                                            : ''
                                                        }
                                                    </StyledCard>
                                                    {/*<br/>*/}
                                                </div>
                                            );
                                        })
                                    )
                                }
                            </ScrollView>
                        </View>
                    </View>
        </BodyContainer>
        <NavBar navigation={navigation} selectedIcon="Home" admin={admin}/>
    </PhoneView>
  );
};

//all updated