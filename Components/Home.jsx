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
    p: {
        wordBreak: 'break-all',
        whiteSpace: 'normal',
    },
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
          if (response['msg'] === 'Token has expired' ){
            return
          }
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
        {console.log(challengeID)}
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
    const [challenges_sorted_by_sdg, set_challenges_sorted_by_sdg] = React.useState([ {'1': []}, {'2': []}, {'3': []}, {'4': []}, {'5':[]}, {'6':[]}, {'7':[]}, {'8':[]}, {'9':[]}, {'10':[]}, {'11':[]}, {'12':[]}, {'13':[]}, {'14':[]}, {'15':[]}, {'16':[]}, {'17':[]} ]);
    const [sorted_, setSorted] = React.useState([]);
    const [completed, set_completed] = React.useState([]);
    const sdg_names = ['No Poverty', 'Zero Hunger', 'Good Health and Well-Being', 'Quality Education', 'Gender Equality', 'Clean Water and Sanitation', 'Affordable and Clean Energy', 'Decent Work and Economic Growth', 'Industry, Innovation and Infrastructure', 'Reduce Inequalities', 'Sustainable Cities and Communities', 'Responsible Consumption and Production', 'Climate Action', 'Life below Water', 'Life on Land', 'Peace, Justice and Strong Institutions', 'Partnership for the Goals']
    const sdg_descriptions = ['', '', '', '', '', '','','', '', '', '','', '', '', '','', '', '', '','', '', '', '','', '', '', '','', '', '', '','', '', '', '',];


    //console.log("this", challenges_sorted_by_sdg[1])

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
        
        for (let i = 0; i < challengeList.length; i++){
            //console.log('line 157')
            getData('user_id')
            .then (token_value => {

                fetch(`https://mysustainability-api-123.herokuapp.com/getChallengeProgress/?challengeID=${i}&userEmail=${token_value}`, {method: 'GET'})
                .then(progress => progress.json())
                .then(progressJSON => {
                    //console.log(progressJSON['progressScore'])
                    if (progressJSON['progressScore'] === 10){
                        //console.log('entered')
                        set_completed([...completed, true])
                    }
                })      
            })
        }

    }, [challengeList]);


    useEffect(() => {
        
        fetch(`https://mysustainability-api-123.herokuapp.com/getChallenges`, {method: 'GET'})
        .then(resp => resp.json())
        .then(response => {
            setChallengeList(response['challenges'])
        })


    }, [refresh_challenges, isFocused]);

    useEffect(() => {

        for (let i = 1; i <= 17; i++){
            let temp = []
            for (let k = 0; k < challengeList.length; k++){
                //console.log(challengeList[k]['sdg'])
                let sdg_for_challenge = parseInt(challengeList[k]['sdg'][0]['sdg']);
                //console.log(sdg_for_challenge)
                if (sdg_for_challenge === i){
                    //console.log('entered')
                    temp.push(challengeList[k])
                }
            }
            //console.log(temp)

            challenges_sorted_by_sdg[i-1][`${i}`] = temp
        }
        //console.log(challenges_sorted_by_sdg)

        let sorted_ = [ [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [] ];

        for (let i = 0; i < challenges_sorted_by_sdg.length; i++){
            //console.log(challenges_sorted_by_sdg[i])
            for (let [key, value] of Object.entries(challenges_sorted_by_sdg[i])) {
                
                for (let k = 0; k < value.length; k++){
                    
                    sorted_[i].push(value[k])
                }
            }
        }

        setSorted(sorted_)

    }, [challengeList]);

  
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
                                style={[{height:65, width:65}]}
                                source={require('../public/icons/myprofile.png')}
                            />  
                        </TouchableOpacity>
                    </View>
                        <View style={[styles.flexContainer, {flex:4, margin:'auto',  marginTop:'0', }]}>
                            <View style={[styles.meetingsColumn, isMobile ? {marginBottom:'20%'} : '' ]}>

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

                                        
                                        
                                        sorted_.map((eachEntry)=> {

                                            if (eachEntry.length === 0) return                                                                                       
                               
                                            return (
                                                <div>
                                                    <div style={{display:'flex', flexDirection:'row', marginBottom:'5%', marginTop:'5%'}}>

                                                        <Image source={{uri: eachEntry[0]['sdg'][0]['image_url']}} style={[{width:'100px', height:'100px', marginRight:'5%'}]}/>
                                                        <p style={{fontSize:'120%', width:'60%'}}> SDG {eachEntry[0]['sdg'][0]['sdg']} - {sdg_names[parseInt(eachEntry[0]['sdg'][0]['sdg']) - 1]}: {sdg_descriptions[parseInt(eachEntry[0]['sdg'][0]['sdg']) - 1]}</p>

                                                    </div>
                                                    
                                                    
                                                    {
                                                        eachEntry.map((challenge, index)=> {
     
                                                            return (
                                                                <div style={{marginBottom:'3vh'}}>
                                                                    <StyledCard key={challenge['challengeID']} style={{marginTop:'0'}}>
                                                                        
                                                                            <TouchableOpacity onPress={() => openChallengePage(challenge['challengeID'])} >
                                                                                <Text style={{textAlign:'center', fontSize:25,fontWeight:'bold'}}>{challenge['title']}</Text>
                                                                            </TouchableOpacity>
                                                                            {completed[index] === true ? <Image style={{height:'20px', width:'20px', marginTop:'2.5%', display: 'block', marginLeft:'auto', marginRight: 'auto'}} source={{uri: 'https://cdn2.iconfinder.com/data/icons/greenline/512/check-512.png'}}/> : ''}
                                                                     
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
                                                    }
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