import React, {useEffect} from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView, useWindowDimensions, Modal, Button} from 'react-native';
import { Avatar } from 'react-native-paper';
import NavBar from './NavBar';
import Profile from './Profile';
import { PhoneView, BodyContainer, StyledCard} from '../styles/GeneralStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  

const styles = StyleSheet.create({
    flexContainer: {
        display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:'center', height:'100%', width:"100%"
    },
    individualTile: {
        flex:0, width:'100%', borderRadius:10, padding:10, marginBottom:'5%'
    },
    meetingsColumn: {
        flexDirection:"column", justifyContent:"space-evenly", alignItems:"center", marginTop:'5%', marginBottom:'5%'
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

export default function reportProgress ({route, navigation}){

    getData('token')
    .then(value => {
        //console.log(value)
        if (value === null){
            navigation.navigate('Login', { replace: true })
        }
    })


    const { replace, challengeID, points_worth, reportingQuestion } = route.params;
    //console.log(route.params)
    const windowHeight = useWindowDimensions().height;
    const isMobile = windowHeight <= 700 ? true : false;
    const [selectedValue, setSelectedValue] = React.useState("1");
    const [isVisible, setIsVisible] = React.useState(false);

    function handleReporting(){
        const progressScore = selectedValue === "1" ? "5" : "10";
        getData('user_id')
            .then(value => {
                if(value !== null){
                    fetch(`https://mysustainability-api-123.herokuapp.com/updateChallengeProgress/?challengeID=${challengeID}&userEmail=${value}&progressScore=${progressScore}`, {method: 'POST'})
                    .then(response => {
                        if(response['status'] === 200){
                            fetch(`https://mysustainability-api-123.herokuapp.com/updatePoints/?points=${points_worth}&userEmail=${value}`, {method: 'POST'})
                            .then(response => response.json())
                            .then(finalResp => {
                                //console.log(finalResp)
                                if (finalResp['message'] === 'user stats successfully updated'){
                                    console.log(finalResp)
                                    navigation.navigate('challengePage', { replace: true, challengeID: challengeID })
                                }
                            })
                        }else{
                            setIsVisible(true);
                        }
                    })
                }
            })
    }

    return (
        <PhoneView>
            <BodyContainer>
                <ScrollView style={{display:"flex", flexDirection:'column', }}>
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
                    <View style={[styles.flexContainer, {flex:4, marginTop:'5%', margin:'auto'}]}>
                        <View style={styles.meetingsColumn}>
                            <Modal
                                onRequestClose={() => setIsVisible(false)}
                                visible={isVisible}
                            >
                                <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                                    <Text style={{fontSize:23, margin:'5%', textAlign:'center'}}> You cannot report challenge progress more than 3 times a day! </Text>
                                    <TouchableOpacity onPress={() =>  navigation.navigate('challengePage', { replace: true, challengeID: 0 })} style={{backgroundColor:"#7D83FF", padding:'20px', borderRadius: '10px'}}>
                                        <Text style={{fontSize:20}}> Dismiss </Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                            <StyledCard style={{marginTop:'0 !important'}}>
                                <br/>
                                <Text style={{}}>Report your challenge progress</Text>
                                <br/>
                                <Text style={{fontWeight:'bold'}}>{reportingQuestion}</Text>
                                <br/>
                                <Picker
                                    selectedValue={selectedValue}
                                    onValueChange={(value) =>
                                        setSelectedValue(value)
                                    }>
                                    <Picker.Item label="1" value="1" />
                                    <Picker.Item label="2" value="2" />
                                </Picker>
                                <br/>
                                <TouchableOpacity
                                    style={{padding:'3%',backgroundColor:'#7d83ff', border:'2px solid', width:'40%', height:'fit-content'}}
                                    accessible={true}
                                    accessibilityLabel="button to submit progress"
                                    onPress={() =>  handleReporting()}>
                                        <Text style={{fontSize:18, textAlign:'center'}}>Submit</Text>
                                </TouchableOpacity>        
                            </StyledCard>
                        </View>
                    </View>
                </ScrollView>
            </BodyContainer>
            <NavBar navigation={navigation} selectedIcon="Home"/>
        </PhoneView>
    );
};

//all updated