import React, {useEffect} from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView, useWindowDimensions} from 'react-native';
import { Avatar } from 'react-native-paper';
import NavBar from './NavBar';
import Profile from './Profile';
import { PhoneView, BodyContainer, StyledCard} from '../styles/GeneralStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import ScrollBox from "react-responsive-scrollbox";

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

  

const styles = StyleSheet.create({
    flexContainer: {
        display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:'center', height:'100%', width:"100%"
    },
    individualTile: {
        flex:0, width:'100%', borderRadius:10, padding:10, marginBottom:'5%'
    },
    meetingsColumn: {
        flexDirection:"column", justifyContent:"space-evenly", alignItems:"center", marginTop:'0%', marginBottom:'5%'
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

export default function challengePage ({route, navigation}){
    const isFocused = useIsFocused();

    getData('token')
    .then(value => {
        if (value === null){
            navigation.navigate('Login', { replace: true })
        }
    })

    getData('admin')
    .then(value => {
        if (value === 'true'){
            setAdmin(true)
        }
    })



    const { replace, challengeID } = route.params;
    const windowHeight = useWindowDimensions().height;
    const isMobile = windowHeight <= 700 ? true : false;
    const [challenge, setChallenge] = React.useState([])
    const [progress, setProgress] = React.useState("")
    const [participation, setParticipation] = React.useState(0);
    const [admin, setAdmin] = React.useState(false);
    var completionMessage;

    useEffect(() => {
        fetch(`https://mysustainability-api-123.herokuapp.com/getChallengebyID?challengeID=${challengeID}`, {method: 'GET'})
        .then(resp => resp.json())
        .then(response => {
            console.log(response)
            setChallenge(response['challenges'][0])
            getData('user_id')
            .then(user_id => {
                if(user_id !== null){
                    fetch(`https://mysustainability-api-123.herokuapp.com/getChallengeProgress/?challengeID=${challengeID}&userEmail=${user_id}`, {method: 'GET'})
                    .then(progress => progress.json())
                    .then(progressJSON => {
                        setProgress(progressJSON['progressScore'])
                        fetch(`https://mysustainability-api-123.herokuapp.com/getChallengeParticipation/?challengeID=${challengeID}`)
                            .then(participationNumber => participationNumber.json())
                            .then(participationNumberJSON => {
                                console.log(participationNumberJSON)
                                setParticipation(participationNumberJSON['participation'])
                            })
                    })
                }
            })
        })
    }, [isFocused]);

    if (progress == '5'){
        completionMessage = ("50% completed")
    }else if(progress == '10'){
        completionMessage = "100% completed"
    }else if(progress == '0'){
        completionMessage = "0% completed"
    }

    return (
        <PhoneView>
            <BodyContainer style={{flex:1}}>
                <ScrollBox style={{height: "100vh", width: "90vw", margin: "auto", marginTop: "1vh", marginBottom:'12vh'}}>
                        <View style={{flexDirection:"row", justifyContent:"space-between",  flex:1}}>
                            {console.log(challenge)}
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
                        <View style={[styles.flexContainer, {flex:4, marginTop:'2vh', margin:'auto'}]}>
                            <View style={[styles.meetingsColumn, {width:'100%'}]}>
                                <StyledCard style={{marginTop:'0 !important'}}>
                                    <Text style={{fontWeight:'bold'}}>Challenge: {challenge['title']} </Text>
                                    <p/>
                                    <Text>{challenge['description']}</Text>
                                    <p/>
                                    <Text style={{fontWeight:'bold'}}>Number of participants: {participation} {participation === 1 ? 'user' : 'users'}</Text>
                                    <p/>
                                    <Text style={{fontWeight:'bold'}}>Points this challenge is worth: {challenge['points_worth']}</Text>
                                    <p/>
                                    <Text style={{fontWeight:'bold'}}>Relatedness to SDGs:</Text>
                                    <p/>
                                    {
                                        challenge.length === undefined ? 
                                        
                                        challenge['sdg'].map(element => {
                                            return (
                                                <View style={{display:'flex', flexDirection:'row', marginBottom:'5vh'}}> 
                                                    <Image source={{uri: element['image_url']}} style={{width:'100px', height:'100px', marginRight:'5%'}}/>
                                                    <Text style={{flex:1}}>{element['target']}</Text>
                                                </View>
                                            )
                                        }) : ''
                                    }
                                    <p/>
                                    <Text style={{fontWeight:'bold'}}>Your progress so far: {completionMessage}</Text>
                                    <p/>
                                    <TouchableOpacity
                                        style={{padding:'20px', backgroundColor:'#8a90fd', border:'2px solid', width:'100%', height:'fit-content', borderRadius:'10px', maxWidth:'200px'}}
                                        accessible={true}
                                        accessibilityLabel="button to report progress"
                                        onPress={() =>  navigation.navigate('reportProgress', { replace: true, challengeID: challengeID, points_worth: challenge['points_worth'], reportingQuestion: challenge['reportingQuestion'] })}>
                                            <Text style={{fontSize:18, textAlign:'center',}}>Report challenge progress</Text>
                                    </TouchableOpacity>
                                </StyledCard>
                            </View>
                        </View>
                    </ScrollBox>
            </BodyContainer>
            <NavBar navigation={navigation} selectedIcon="Home" admin={admin}/>
        </PhoneView>
    );
};

//all updated