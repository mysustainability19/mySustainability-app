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
        display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:'center', height:'100vh', width:"100%"
    },
    individualTile: {
        flex:0, width:'100%', borderRadius:10, padding:10, marginBottom:'5%'
    },
    meetingsColumn: {
        flexDirection:"column", justifyContent:"space-evenly", alignItems:"center", marginBottom:'5%'
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

export default function Leaderboard ({navigation}){
    const [authorised, set_authorised] = React.useState(false);

    React.useEffect(() => {

        getData('token')
        .then(token_value => {

            fetch(`https://mysustainability-api-123.herokuapp.com/auth_test/`, {method: 'GET', headers: {'Authorization': `Bearer ${String(token_value)}`}})
            .then(resp => resp.json())
            .then(response => {
                //console.log(response)
                if (!JSON.stringify(response).includes("logged_in") && !response['msg'].includes('expired')){
                    navigation.navigate('Login', { replace: true })
                
                }else{
                    authorised === false ? set_authorised(true) : ''
                }

            })
        })

    }, [authorised]);

    getData('admin')
    .then(value => {
        if (value === 'true'){
            setAdmin(true)
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
    const [admin, setAdmin] = React.useState(false);
    
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
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                        <Text style={[{fontSize:20, color:'#7d83ff', fontWeight:'bold', marginTop:'20px'}]}> mySustainability </Text>
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
                    <StyledCard style={{marginTop: isMobile === true ? '5%': '2%'}}>
                        <Text style={{fontSize:23, fontWeight:"bold"}}>Leaderboard: </Text>
                        <p/>
                        <ScrollView style={{display:"flex", flexDirection:'column', height:'45vh'}}>
                            {
                                leaderboard.map((user, i) => {
                                    return (
                                        <>  
                                            <p key={i+1}/>
                                            <Text key={i} style={userEmail == user['email'] ? {backgroundColor:'#7D83FF', padding:'20px', fontSize:20, borderRadius:'20px'} : {fontSize:20}}> {leaderboard.indexOf(user) + 1}. {user['name']} </Text>
                                            <p key={i+3}/>
                                        </>
                                    );
                                })
                            }
                        </ScrollView>
                    </StyledCard>
            </BodyContainer>
            <NavBar navigation={navigation} selectedIcon="Leaderboard" admin={admin}/>
        </PhoneView>
    );
};

//all updated