import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView, useWindowDimensions} from 'react-native';
import { Avatar } from 'react-native-paper';
import NavBar from './NavBar';
import { PhoneView, BodyContainer, StyledCard} from '../styles/GeneralStyles';
import { 
  TileHeading, RecommendationContainer, RecCard, RecCardText, MeetingCard,
  FriendTile
} from '../styles/HomeStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box'; 
  
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
        display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:'center', height:'100%', width:"100%"
    },
    individualTile: {
        flex:0, width:'100%', borderRadius:10, padding:10, marginBottom:'5%'
    },
    meetingsColumn: {
        flexDirection:"column", justifyContent:"space-evenly", alignItems:"center", marginTop:'5%', marginBottom:'5%', margin:"auto"
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
    LogOutButton: { 
        display:"flex", justifyContent:'center',alignSelf:'center',width:'95%', padding:20, borderRadius:10, backgroundColor:"#7D83FF", marginBottom:10,
        marginTop:10
    },

})

export default function Leaderboard ({navigation}){
    getData('token')
    .then(value => {
        if (value === "null"){
            navigation.navigate('Login', { replace: true })
        }else{
            return value
        }
    })

    function handleLogOut(e){
        storeData('token', null)
        storeData('user_id', null)
        navigation.navigate('Login', { replace: true })
    }

    const windowHeight = useWindowDimensions().height;
    const isMobile = windowHeight <= 700 ? true : false;
    const [info, setInfo] = React.useState({name:"", points:""});    
    const [leaderboard, setLeaderBoard] = React.useState([]); 
    const [userEmail, setUserEmail] = React.useState(""); 
    
    useEffect(() => {
        getData('user_id')
        .then(value => {
            if(value !== null){
                setUserEmail(value)
                fetch(`https://mysustainability-api-123.herokuapp.com/get_user_ranks/`, {method: 'GET'})
                .then(resp => resp.json())
                .then(finalResp => {
                    setLeaderBoard(finalResp['users'])
                })
            }
        })
    },[])

    return (
        <PhoneView>
            <BodyContainer>
                <ScrollBox style={{display:"flex", flexDirection:'column', margin:'auto' }}>
                    <StyledCard style={{margin:'auto'}}>
                        <Text style={{fontSize:23, fontWeight:"bold"}}>Leaderboard: </Text>
                        <br/>
                        {
                            leaderboard.map((user) => {
                                return (
                                    <>  {console.log(userEmail, user['email'])}
                                        <Text key={user['name']} style={userEmail == user['email'] ? {backgroundColor:'#7D83FF', padding:'20px', fontSize:20} : {fontSize:20}}> {leaderboard.indexOf(user) + 1}. {user['name']} </Text>
                                        <br/>
                                    </>
                                );
                            })
                        }
                    </StyledCard>
                </ScrollBox>
            </BodyContainer>
            <NavBar navigation={navigation} selectedIcon="Leaderboard"/>
        </PhoneView>
    );
};

//all updated