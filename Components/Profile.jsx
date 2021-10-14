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

})

export default function Profile ({navigation}){
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
    const isMobile = windowHeight <= 700 ? true : false;
    const [info, setInfo] = React.useState({name:"", points:"", badges:[]});  
    const [ranking, setRanking] = React.useState(0);  
    const [total_number_users, set_total] = React.useState(0);  
    const badges_catalogue = ['beginner', 'earth_lover', 'sustainability_ninja', 'elite']
    
    useEffect(() => {
        getData('user_id')
        .then(value => {
            if(value !== null){
                fetch(`https://mysustainability-api-123.herokuapp.com/get_user_info/?userEmail=${value}`, {method: 'GET'})
                .then(response => response.json())
                .then(value => {
                    setInfo({name:value['name'], points:value['points'], badges:value['badges']})
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
    },[])

    return (
        <View> </View>
        /*<PhoneView>
            <BodyContainer>
                <ScrollView style={{display:"flex", flexDirection:'column', }}>
                    <StyledCard>
                        <Text style={{fontSize:23, fontWeight:"bold"}}>Welcome, {info['name']} </Text>
                        <br/>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize:18, fontWeight:"bold"}}>Total points:</Text>
                            <Text style={{fontSize:18}}> {info['points']} </Text>
                        </View>
                        <br/>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize:18, fontWeight:"bold"}}>Your ranking is: </Text>
                            <Text style={{fontSize:18}}>{ranking + 1}/{total_number_users}</Text>
                        </View>
                        <br/>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize:18, fontWeight:"bold"}}>Badges: </Text>
                            {console.log(info['badges'])}
                            {   
                                info["badges"].map((badge) => {
                                    return (
                                        <Text style={{textAlign:'center', width:'min-content'}}>
                                            <Image source={require(`../icons/badges/${badge}.PNG`)} style={{width:'150px', height:'150px'}}/>
                                            {getCaptionforBadge(badge)}
                                        </Text>
                                    )
                                })
                            }
                            {
                                badges_catalogue.filter(badge => !info['badges'].includes(badge)).map((badge) => {
                                    return (
                                        <Text style={{textAlign:'center', width:'min-content'}}>
                                            <Image source={require(`../icons/badges/${badge}_unearnt.PNG`)} style={{width:'150px', height:'150px'}}/>
                                            {getCaptionforBadge(badge)}
                                        </Text>
                                    )
                                })
                            }
                        </View>
                        <br/>
                        <TouchableOpacity
                        type="submit"
                        onPress={(e) => handleLogOut(e)}
                        style={styles.LogOutButton}
                        >
                        <Text style={styles.buttonText}> Log Out </Text>
                        </TouchableOpacity>
                    </StyledCard>
                </ScrollView>
            </BodyContainer>
            <NavBar navigation={navigation} selectedIcon="Home"/>
                        </PhoneView>*/
    );
};

//all updated