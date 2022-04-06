import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView, useWindowDimensions, Button} from 'react-native';
import NavBar from './NavBar';
import { PhoneView, BodyContainer, StyledCard} from '../styles/GeneralStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import {globalDebug} from './consoleBlocking';
import Modal from 'modal-enhanced-react-native-web';
globalDebug(false,true);
  
async function getData(key) {
    return await AsyncStorage.getItem(key)
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
        color:"black", textAlign:"center", fontSize:18, fontWeight:'600'
    },
    LogOutButton: { 
        display:"flex", justifyContent:'center',alignSelf:'center',width:'50%', maxWidth: '250px', padding:20, borderRadius:10, backgroundColor:"#FFDC00", marginBottom:10,
        marginTop:10
    },
    test: {

    }

})

export default function Profile ({route, navigation}){

    const isFocused = useIsFocused();
    const [authorised, set_authorised] = React.useState(false);

    React.useEffect(() => {

        getData('token')
        .then(token_value => {

            fetch(`https://mysustainability-api-123.herokuapp.com/auth_test/`, {method: 'GET', headers: {'Authorization': `Bearer ${String(token_value)}`}})
            .then(resp => resp.json())
            .then(response => {
                //console.log(response['msg'])
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
        e.preventDefault()
        window.localStorage.clear();
        window.localStorage.removeItem('admin');
        navigation.navigate('Login', { replace: true })
    }

    


    function getCaptionforBadge(badge){

        if (badge === 'beginner'){
            return ""
        }

        if (badge === 'earth_lover'){
            return "requires 35 green XP"
        }

        if (badge === 'sustainability_ninja'){
            return "requires 55 green XP"
        }

        if (badge === 'elite'){
            return "requires 75 green XP"
        }

    }

    const windowHeight = useWindowDimensions().height;
    const windowWidth = useWindowDimensions().width;
    const isMobile = windowHeight <= 700 || windowWidth <= 900 ? true : false;
    const [info, setInfo] = React.useState({name:"", points:"", badges:[]});  
    const [ranking, setRanking] = React.useState(0);  
    const [total_number_users, set_total] = React.useState(0);  
    const badges_catalogue = ['beginner', 'earth_lover', 'sustainability_ninja', 'elite']
    const [unearnt_badges, set_unearnt_badges] = React.useState([])
    const [badges_updated, set_badges_updated] = React.useState(false)
    const [is_focused, set_is_focused] = React.useState(false)
    const [admin, setAdmin] = React.useState(false);
    const {newUser} = route.params;
    const [isVisible, setIsVisible] = React.useState(false);
    const [dummy_2, setDummy_2] = React.useState(0);
    if(String(newUser) === 'true' && isVisible === false && dummy_2 === 0) setIsVisible(true);

    function updateUserBadges(email, badge){
        fetch(`https://mysustainability-api-123.herokuapp.com/updateUserBadges/?userEmail=${email}&newBadge=${badge}`, {method: 'POST'})
            .then(response => response.json())
            .then(responseJSON => {
                responseJSON['message'] === 'user badges successfully updated' ? set_badges_updated(true) : ''
            })
    }
    
    useEffect(() => {
        getData('user_id')
        .then(value => {
            //console.log('user_id', value)
            if(value !== null){
                fetch(`https://mysustainability-api-123.herokuapp.com/get_user_info/?userEmail=${value}`, {method: 'GET'})
                .then(response => response.json())
                .then(value => {

                    if (value['points'] >= 35) updateUserBadges(value['email'], 'earth_lover')
                    if (value['points'] >= 55) updateUserBadges(value['email'], 'sustainability_ninja')
                    if (value['points'] >= 75) updateUserBadges(value['email'], 'elite')

                    set_unearnt_badges(badges_catalogue.filter(badge => !value['badges'].includes(badge)))
                    setInfo({email: value['email'], name:value['name'], points:value['points'], badges:value['badges']})

                    fetch(`https://mysustainability-api-123.herokuapp.com/get_user_ranks/`, {method: 'GET'})
                    .then(resp => resp.json())
                    .then(finalResp => {
                        const leaderboard_ranking = finalResp['users'].findIndex(o => o.email == value['email']);
                        setRanking(leaderboard_ranking);
                        set_total(finalResp['users'].length)
                    })
                })
            }
        })
    },[isFocused])

    

    return (
        <PhoneView nativeID="1">
            <BodyContainer nativeID="2">
                <View style={{flex:1,  marginBottom: isMobile === true ? '15vh': '0vh'}} nativeID="3">
                            <Modal
                                onRequestClose={() => {
                                    setDummy_2(1);
                                    setIsVisible(false);
                                }}
                                visible={isVisible}
                                style={{backgroundColor:'#f2f2f2',  maxWidth: '100%', margin: 0, top: 0, bottom: 0, left: 0, right: 0, display:'flex'}}
                            >
                                <View style={{alignItems: 'center', flex: 1, width:'60%', justifyContent: 'center', margin:'auto', textAlign:'center'}}>
                                <Text style={{fontSize:18}}> Welcome to mySustainability! {'\n'} {'\n'} You have earnt your first badge: The Beginner badge! {'\n'} {'\n'} Earn more badges and Green XP by completing challenges or the dynamic quiz. In no time, you will find yourself climbing the leaderboard ranks. </Text>
                                <Image source={require("../icons/badges/beginner.PNG")} style={{width:'200px', height:'200px', marginTop:'5%', marginBottom:'5%'}}/>
                                <TouchableOpacity
                                
                                    onPress={() => {
                                        setDummy_2(1);
                                        setIsVisible(false);                        
                                    }} 

                                    style={{backgroundColor:'#ffdc00', padding:'20px', borderRadius:'10px'}}
  
                                >
                                    <Text style={{fontWeight:'500', color:'black', fontSize:'19px'}}>Dismiss</Text>
                                </TouchableOpacity>
                                </View>
                            </Modal>
                    <ScrollView contentContainerStyle={{display:"flex", flexDirection:'column', height:'150vh'}} nativeID="4">
                        <StyledCard nativeID="5" style={{marginTop:'0'}}>
                            <Text style={{fontSize:23, fontWeight:"bold"}}>Welcome, {info['name']} </Text>
                            <p/>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontSize:18, fontWeight:"bold"}}>Total Green XP:</Text>
                                <Text style={{fontSize:18}}> {info['points']} </Text>
                            </View>
                            <p/>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontSize:18, fontWeight:"bold"}}>Your ranking is: </Text>
                                <Text style={{fontSize:18}}>{ranking + 1}/{total_number_users}</Text>
                            </View>
                            <p/>
                            <Text style={{fontSize:18, fontWeight:"bold"}}>Badges: </Text>
                            <View style={{flexDirection: isMobile === true ? 'column': 'row', justifyContent:'space-evenly', marginBottom:'1%'}}>
                                {   
                                    info['badges'].map((badge, i) => {
                                        return (
                                            <Text style={{textAlign:'center', width:'min-content'}} key={i}>
                                                <Image source={{ uri : "https://raw.githubusercontent.com/adamelmohamad/mySustainability-assets/main/badges/" + badge + ".PNG"}} style={{width:'150px', height:'150px'}}/>
                                                {/*<Image source={require(`../public/icons/badges/${badge}.PNG`)} style={{width:'150px', height:'150px'}}/>*/}
                                            </Text>
                                        )
                                    })
                                }
    
                                {   
                                    unearnt_badges.map((badge, i) => {
                                            return (
                                                <Text style={{textAlign:'center', width:'min-content'}} key={i}>
                                                    <Image source={{ uri: "https://raw.githubusercontent.com/adamelmohamad/mySustainability-assets/main/badges/" + badge + "_unearnt.PNG"}} style={{width:'150px', height:'150px'}}/>
                                                    {/*<Image source={require(`../public/icons/badges/${badge}_unearnt.PNG`)} style={{width:'150px', height:'150px'}}/>*/}
                                                    {getCaptionforBadge(badge)}
                                                </Text>
                                            )
                                    })
                                }
                            </View>
                            <p/>
                            <TouchableOpacity
                            type="submit"
                            onPress={(e) => handleLogOut(e)}
                            style={styles.LogOutButton}
                            >
                            <Text style={styles.buttonText}> Log Out </Text>
                            </TouchableOpacity>
                        </StyledCard>
                    </ScrollView>
                </View>
            </BodyContainer>
            <NavBar navigation={navigation} selectedIcon="Profile" admin={admin}/>
        </PhoneView>
    );
};

//all updated