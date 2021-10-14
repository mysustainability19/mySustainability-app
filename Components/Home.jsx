import React, {useEffect} from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView, useWindowDimensions, Modal, Button} from 'react-native';
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
        flexDirection:"column", justifyContent:"space-evenly", alignItems:"center", marginTop:'0', marginBottom:'5%'
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

    const {newUser} = route.params;

    getData('token')
    .then(value => {
        if (value === null){
            navigation.navigate('Login', { replace: true })
        }
    })

    function openChallengePage(challengeID){
        console.log(challengeID)
        navigation.navigate('challengePage', { replace: true, challengeID: challengeID })
    }
    

    const windowHeight = useWindowDimensions().height;
    const isMobile = windowHeight <= 700 ? true : false;

    const [more, setMore] = React.useState(false);
    const [challengeList, setChallengeList] = React.useState([])
    //const [isVisible, setIsVisible] = React.useState(newUser === true ? true : false);
    const [isVisible, setIsVisible] = React.useState(true);

    const toggleMore = () => {
        if (more === true){
            setMore(false);
        } else {
            setMore(true);
        }
    }

    useEffect(() => {
        fetch(`https://mysustainability-api-123.herokuapp.com/getChallenges`, {method: 'GET'})
        .then(resp => resp.json())
        .then(response => {
            setChallengeList(response['challenges'])
        })
    }, []);

  return (
    <PhoneView>
        <BodyContainer>
            <ScrollBox style={{display:"flex", flexDirection:'column', height:'80vh'}}>
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
                <View style={[styles.flexContainer, {flex:4, marginTop:'2vh', margin:'auto'}]}>
                    <View style={styles.meetingsColumn}>

                        <Modal
                            onRequestClose={() => setIsVisible(false)}
                            visible={isVisible}
                        >
                            <View style={{alignItems: 'center', flex: 1, width:'60%', justifyContent: 'center', margin:'auto', textAlign:'center'}}>
                            <Text style={{fontSize:18}}> Welcome to mySustainability! You have earnt your first badge! Earn more badges and points by completing challenges, goals or the dynamic quiz. In no time, you will find yourself climbing the leaderboard ranks. </Text>
                            <Image source={require("../icons/badges/beginner.PNG")} style={{width:'200px', height:'200px'}}/>
                            <Button onPress={() => setIsVisible(false)} title={'Dismiss'} color="#7D83FF"/>
                            </View>
                        </Modal>


                        {
                            challengeList === [] ? (
                                <Text style = {{width:'auto', fontSize: 18, textAlign:'auto'}}> None yet!</Text>
                            ): (
                                challengeList.map((element, i)=> {
                                    console.log(element['challengeID']);
                                    return (
                                        <StyledCard key={i}>
                                            <TouchableOpacity onPress={(element) => openChallengePage(i)}>
                                                <Text style={{textAlign:'center', fontSize:25,fontWeight:'bold'}}>{element['title']}</Text>
                                            </TouchableOpacity>
                                        </StyledCard>

                                    );
                                })
                            )
                        }
                    </View>
                </View>
            </ScrollBox>
        </BodyContainer>
        <NavBar navigation={navigation} selectedIcon="Home"/>
    </PhoneView>
  );
};

//all updated