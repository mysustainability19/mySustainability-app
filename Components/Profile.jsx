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
import { useIsFocused } from "@react-navigation/native";
  
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
        color:"white", textAlign:"center", fontSize:18, fontWeight:'bold'
    },
    LogOutButton: { 
        display:"flex", justifyContent:'center',alignSelf:'center',width:'50%', maxWidth: '250px', padding:20, borderRadius:10, backgroundColor:"#7D83FF", marginBottom:10,
        marginTop:10
    },
    test: {

    }

})

export default function Profile ({navigation}){

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
                <View style={{flex:1 , marginBottom: isMobile === true ? '15vh': '0vh'}} nativeID="3">
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
                            <View style={{flexDirection: isMobile === true ? 'column': 'row', justifyContent:'space-evenly', marginBottom:'3%'}}>
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
            <NavBar navigation={navigation} selectedIcon="Home" admin={admin}/>
        </PhoneView>
    );
};

//all updated